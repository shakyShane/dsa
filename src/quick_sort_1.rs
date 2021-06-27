///
/// This implementation is based on the first example
/// on wikipedia https://en.wikipedia.org/wiki/Quicksort
///
fn quicksort(a: &mut [usize], lo: usize, hi: usize) {
    if lo < hi {
        let pivot = partition(a, lo, hi);

        // this check is to prevent overflows on negative numbers
        if pivot > 0 {
            quicksort(a, lo, pivot - 1);
        }
        quicksort(a, pivot + 1, hi);
    }
}

fn partition(a: &mut [usize], lo: usize, hi: usize) -> usize {
    let pivot = a[hi];
    let mut i = lo;
    for j in lo..=hi {
        if a[j] < pivot {
            swap(a, i, j);
            i += 1;
        }
    }
    swap(a, i, hi);
    i
}

fn swap(a: &mut [usize], lo: usize, hi: usize) {
    a.swap(lo, hi);
}

#[test]
fn test_quick_sort_1() {
    let mut items: Vec<usize> = vec![10, 9, 5, 3, 20, 18];
    let len = items.len();
    quicksort(&mut items, 0, len - 1);
    assert_eq!(items, &[3, 5, 9, 10, 18, 20])
}
