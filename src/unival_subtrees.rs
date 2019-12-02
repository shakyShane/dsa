#[derive(Debug)]
struct Node {
    value: String,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}

impl Node {
    pub fn new(value: impl Into<String>, left: Option<Box<Node>>, right: Option<Box<Node>>) -> Node {
        Node { value: value.into(), left, right }
    }
}

///
/// "A unival tree (which stands for “universal value”) is a tree where all nodes have the same value."
///
/// So, the following tree has '3' unival subtrees, all being the leafs (a, a, A)
///
///     a
///    / \
///   a   a
///      / \
///     a   a
///          \
///           A
///
/// But this one has 3, 1 for each leaf and 1 for the whole tree
///
///    a
///   / \
///  a   a
///
/// And this one only has 2, 1 for each leaf - but the overall tree
/// does not qualify
///
///    a
///   / \
///  b   c
///
fn count_unival_subtrees(root: &Option<Box<Node>>) -> (usize, bool) {
    root.as_ref().map_or((0, true), |root| {
        let (left_count, is_left) = count_unival_subtrees(&root.left);
        let (right_count, is_right) = count_unival_subtrees(&root.right);
        let total = right_count + left_count;

        if is_left && is_right {
            if let Some(node) = &root.left {
                if node.value != root.value {
                    return (total, false);
                }
            }
            if let Some(node) = &root.right {
                if node.value != root.value {
                    return (total, false);
                }
            }
            return (total + 1, true);
        }

        (total, false)
    })
}

#[test]
fn test_count_unival_subtrees() {
    let root = Node::new("a",
        Some(Box::new(Node::new("a", None, None))),
        Some(Box::new(Node::new("a",
            Some(Box::new(Node::new("a", None, None))),
            Some(Box::new(Node::new("a", None,
                Some(Box::new(Node::new("A", None, None))))))))
        ),
    );

    let (count, _) = count_unival_subtrees(&Some(Box::new(root)));

    assert_eq!(count, 3);
}
