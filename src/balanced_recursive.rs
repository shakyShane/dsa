use std::str::Chars;

fn balanced_recursive(input: &str) -> bool {
    expect(None, &mut input.chars())
}

fn expect(end: Option<char>, input: &mut Chars) -> bool {
    loop {
        let c = input.next();
        let good = match c {
            Some('(') => expect(Some(')'), input),
            Some('[') => expect(Some(']'), input),
            Some('{') => expect(Some('}'), input),
            Some(')') | Some(']') | Some('}') | None => {
                return end == c;
            }
            _ => true, // any other char
        };
        if !good {
            return false;
        }
    }
}

#[test]
fn test_balanced_recursive() {
    assert_eq!(balanced_recursive("[]"), true);
    assert_eq!(balanced_recursive("["), false);
    assert_eq!(balanced_recursive("(())"), true);
    assert_eq!(balanced_recursive("((()"), false);
    assert_eq!(balanced_recursive(")(())"), false);
    assert_eq!(balanced_recursive("))))"), false);
    assert_eq!(balanced_recursive("(()))("), false);
    assert_eq!(balanced_recursive("([])"), true);
    assert_eq!(balanced_recursive("([[[]]])"), true);
    assert_eq!(balanced_recursive("([[[00]])"), false);
    assert_eq!(balanced_recursive("([[[{0}]]])"), true);
}
