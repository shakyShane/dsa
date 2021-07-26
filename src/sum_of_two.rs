use std::collections::HashSet;

///
/// A basic brute-force approach where at worst we'd iterate
/// through arr2 once for every item in arr2. This means
/// this is O(n*m)
///
fn sum_of_two_bruteforce(arr1: &[usize], arr2: &[usize], value: usize) -> bool {
    for num1 in arr1 {
        let compliment = value - num1;
        for num2 in arr2 {
            if *num2 == compliment {
                return true;
            }
        }
    }
    false
}

#[test]
fn test_sum_of_two_bruteforce() {
    assert_eq!(sum_of_two_bruteforce(&[], &[], 10), false);
    assert_eq!(sum_of_two_bruteforce(&[10], &[], 10), false);
    assert_eq!(sum_of_two_bruteforce(&[], &[10], 10), false);
    assert_eq!(sum_of_two_bruteforce(&[1], &[9], 10), true);
    assert_eq!(sum_of_two_bruteforce(&[1, 2, 3], &[4, 5, 6, 7], 10), true);
}

///
/// A faster approach would be to the calculate every compliment
/// first for `arr1` into a data structure that has fast insert + lookup.
///
/// Then, we can iterate through arr2 until we find the compliment, which
/// at worst may not yield a result, meaning that whole this is O(n+m) which
/// is much better than the brute-force approach.
///
fn sum_of_two(arr1: &[usize], arr2: &[usize], value: usize) -> bool {
    let mut compliments: HashSet<usize> = HashSet::new();
    for num1 in arr1 {
        compliments.insert(value - num1);
    }
    for num2 in arr2 {
        if compliments.contains(num2) {
            return true;
        }
    }
    false
}

#[test]
fn test_sum_of_two() {
    assert_eq!(sum_of_two(&[], &[], 10), false);
    assert_eq!(sum_of_two(&[10], &[], 10), false);
    assert_eq!(sum_of_two(&[], &[10], 10), false);
    assert_eq!(sum_of_two(&[1], &[9], 10), true);
    assert_eq!(sum_of_two(&[1, 2, 3], &[4, 5, 6, 7], 10), true);
}

///
/// A functional approach to the same problem
///
fn sum_of_two_functional(arr1: &[usize], arr2: &[usize], value: usize) -> bool {
    let set: HashSet<_> = arr1.iter().map(|num1| value - num1).collect();
    arr2.iter().any(|num2| set.contains(num2))
}

#[test]
fn test_sum_of_two_functional() {
    assert_eq!(sum_of_two_functional(&[], &[], 10), false);
    assert_eq!(sum_of_two_functional(&[10], &[], 10), false);
    assert_eq!(sum_of_two_functional(&[], &[10], 10), false);
    assert_eq!(sum_of_two_functional(&[1], &[9], 10), true);
    assert_eq!(sum_of_two_functional(&[1, 2, 3], &[4, 5, 6, 7], 10), true);
}
