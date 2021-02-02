#[derive(Debug, PartialEq)]
struct Node {
    value: String,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}

impl Node {
    pub fn new(value: impl Into<String>, left: Option<Box<Node>>, right: Option<Box<Node>>) -> Node {
        Node { value: value.into(), left, right }
    }
    ///
    /// Serialize a binary tree.
    ///
    /// Note: this does NOT account for any data sanitization
    ///
    ///     1
    ///    / \
    ///   2   3
    ///      / \
    ///     4   5
    ///
    /// gives the following string: `1 2 # # 3 4 # # 5 # #`
    ///
    pub fn serialize(root: &Option<Box<Node>>) -> String {
        root.as_ref().map_or(format!("#"), |root| {
            format!("{} {} {}", root.value, Node::serialize(&root.left), Node::serialize(&root.right))
        })
    }
}

struct Tree {
    items: Box<dyn Iterator<Item=String>>,
}

impl Tree {
    ///
    /// Deserialize a binary tree.
    ///
    /// Note: this does NOT account for any data sanitization
    ///
    /// Given: 1 2 # # 3 4 # # 5 # #
    /// Output:
    ///
    ///     1
    ///    / \
    ///   2   3
    ///      / \
    ///     4   5
    ///
    pub fn deserialize(&mut self) -> Option<Box<Node>> {
        let curr = self.items.next()?;
        if curr.as_str() == "#" { return None }
        let n = Node::new(curr, self.deserialize(), self.deserialize());
        return Some(Box::new(n));
    }
    ///
    /// Takes the string input and creates an iterator to be consumed
    /// internally on calls to `deserialize`
    ///
    pub fn from_str(input: impl Into<String>) -> Tree {
        let string  = input.into();
        let segments = string.split(" ")
            .map(|x| x.to_string())
            .collect::<Vec<String>>();
        Tree { items: Box::new(segments.into_iter() ) }
    }
}

#[test]
fn test_deserialize() {
    let n = Tree::from_str("1 2 # # 3 4 # # 5 # #").deserialize();
    assert_eq!(n.unwrap().left, Some(Box::new(Node::new("2", None,None))));
}
#[test]
fn test_serialize_deserialize() {
    let root = Node::new("1",
        Some(Box::new(Node::new("2", None, None))),
        Some(Box::new(Node::new("3",
            Some(Box::new(Node::new("4", None, None))),
            Some(Box::new(Node::new("5", None, None))),
        )))
    );
    assert_eq!("1 2 # # 3 4 # # 5 # #", Node::serialize(&Some(Box::new(root))))
}
