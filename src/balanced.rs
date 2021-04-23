// O(n)
fn balanced(input: &str) -> bool {
    let mut stack: Vec<Char> = vec![];
    enum Char {
        Paren,
        Square,
        Brace,
    }
    for c in input.chars() {
        match c {
            '(' => stack.push(Char::Paren),
            '[' => stack.push(Char::Square),
            '{' => stack.push(Char::Brace),
            ')' | ']' | '}' => match (c, stack.pop()) {
                (')', Some(Char::Paren)) => {}
                (']', Some(Char::Square)) => {}
                ('}', Some(Char::Brace)) => {}
                (_, _) => return false,
            },
            _ => {}
        }
    }
    stack.len() == 0
}

#[test]
fn test_balanced() {
    assert_eq!(balanced("[]"), true);
    assert_eq!(balanced("["), false);
    assert_eq!(balanced("(())"), true);
    assert_eq!(balanced("((()"), false);
    assert_eq!(balanced(")(())"), false);
    assert_eq!(balanced("))))"), false);
    assert_eq!(balanced("(()))("), false);
    assert_eq!(balanced("([])"), true);
    assert_eq!(balanced("([[[]]])"), true);
    assert_eq!(balanced("([[[00]])"), false);
    assert_eq!(balanced("([[[{0}]]])"), true);
}
