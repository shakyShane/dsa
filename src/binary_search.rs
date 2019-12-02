///
/// Perform a binary search on a sorted list
///
/// For the given input:
/// [1, 2, 3, 4, 5]
///
/// searching for 'k', 2 in this case.
///
/// steps
/// l=0, h=4, m=2, curr = '3'
/// l=0, h=2, m=2, curr = '3'
///
pub fn binary_search(k: i32, items: &Vec<i32>) -> Option<i32> {
    println!("k={}, items={:?}", k, items);
    let mut l: i32 = 0;
    let mut h: i32 = items.len() as i32 - 1;

    while l <= h {
        let m = (((h + l) / 2) as f64).floor() as i32;
        if let Some(curr) = items.get(m as usize) {
            println!("l={}, m={}, h={}, curr={}", l, m, h, curr);
            if *curr == k { return Some(m) }
            if *curr > k { h = m - 1 }
            if *curr < k { l = m + 1 }
        }
    }

    None
}

#[test]
fn test_binary_search() {
    let items = vec![1, 2, 3, 4, 5];
    assert_eq!(Some(0), binary_search(1, &items));
    assert_eq!(Some(1), binary_search(2, &items));
    assert_eq!(Some(2), binary_search(3, &items));
    assert_eq!(Some(3), binary_search(4, &items));
    assert_eq!(Some(4), binary_search(5, &items));
    assert_eq!(None, binary_search(0, &items));
    assert_eq!(None, binary_search(90, &items));
    assert_eq!(None, binary_search(9000000, &items));

    let items = vec![2, 4, 6, 80, 90, 120, 180, 900, 2000, 4000, 5000, 60000];
    assert_eq!(None, binary_search(1, &items));
}
