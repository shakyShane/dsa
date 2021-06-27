/**
 * This implementation is based on the first example
 * on wikipedia https://en.wikipedia.org/wiki/Quicksort
 * @param {number[]} A
 * @param {number} lo
 * @param {number} hi
 */
function quicksort(A, lo, hi) {
    if (lo < hi) {
        const p = partition(A, lo, hi);
        quicksort(A, lo, p - 1)
        quicksort(A, p + 1, hi)
    }
}

/**
 * @param A
 * @param {number} lo
 * @param {number} hi
 * @returns {*}
 */
function partition(A, lo, hi) {
    let pivot = A[hi];
    let i = lo;
    // move between lo & hi
    for (let j = lo; j <= hi; j += 1) {
        if (A[j] < pivot) {
            swap(A, i, j);
            i += 1;
        }
    }
    swap(A, i, hi);
    return i;
}

function swap(A, i, j) {
    if (i === j) return; // do nothing if the indexes are equal
    const first = A[i];
    A[i] = A[j];
    A[j] = first;
}

const assert = require("assert");
const items  = [10, 9, 5, 3, 20, 18];
const sorted = [3, 5, 9, 10, 18, 20];
quicksort(items, 0, items.length-1);
assert.deepStrictEqual(items, sorted);
