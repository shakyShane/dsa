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
function binary_search(k, items) {
    let l =  0;
    let h = items.length - 1;

    while (l <= h) {
        const m = Math.floor((h + l) / 2);
        const curr = items[m];
        if (curr === k) return m;
        if (curr > k) h = m - 1;
        if (curr < k) l = m + 1;
    }
    return null;
}

const items = [1, 2, 3, 4, 5];
assert(binary_search(1, items), 0);
assert(binary_search(2, items), 1);
assert(binary_search(3, items), 2);
assert(binary_search(4, items), 3);
assert(binary_search(5, items), 4);
assert(binary_search(0, items), null);
assert(binary_search(6, items), null);
assert(binary_search(6, items), null);

function assert(l, r) {
    if (l !== r) throw new Error(`${l} !== ${r}`);
}
