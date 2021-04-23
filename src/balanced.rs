// O(n)
fn balanced(input: &str) -> bool {
    let mut stack: Vec<char> = vec![];
    for c in input.chars() {
        match c {
            '(' => stack.push('('),
            ')' => match stack.pop() {
                Some('(') => {}
                _ => return false,
            },
            _ => {}
        }
    }
    stack.len() == 0
}

#[test]
fn test_balanced() {
    assert_eq!(balanced("(())"), true);
    assert_eq!(balanced("((()"), false);
    assert_eq!(balanced(")(())"), false);
    assert_eq!(balanced("))))"), false);
    assert_eq!(balanced("(()))("), false);
}
