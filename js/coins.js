/**
 You are given a 2-d matrix where each cell represents number of coins in that cell. Assuming we start at matrix[0][0], and can only move right or down, find the maximum number of coins you can collect by the bottom right corner.

 For example, in this matrix

 0 3 1 1
 2 0 0 4
 1 5 3 1

 The most we can collect is 0 + 2 + 1 + 5 + 3 + 1 = 12 coins.

 * @param m
 * @param n
 * @param matrix
 * @param memo
 * @returns {number|*}
 */
function count_coins_memo(m, n, matrix, memo = {}) {
    const key = m + ',' + n;
    if (key in memo) return memo;
    if (m <= 0 || n <= 0) return 0;
    const curr = matrix[m - 1][n - 1];
    const left = count_coins_memo(m - 1, n, matrix);
    const right = count_coins_memo(m, n - 1, matrix);
    memo[key] = curr + Math.max(left, right);
    return memo[key]
}

/**
 * Same as above, only this one does not cache intermediate sub-trees
 * @param m
 * @param n
 * @param matrix
 * @returns {number|*}
 */
function count_coins_bruteforce(m, n, matrix) {
    if (m <= 0 || n <= 0) return 0;
    const curr = matrix[m - 1][n - 1];
    const left = count_coins_bruteforce(m - 1, n, matrix);
    const right = count_coins_bruteforce(m, n - 1, matrix);
    return curr + Math.max(left, right);
}

const matrix_empty = [[]]
const matrix_single = [[8]]

const matrix1 = [
    [1, 2, 1],
    [1, 1, 8],
    [1, 1, 8]
]

const matrix2 = [
    [0, 3, 1, 1],
    [2, 0, 0, 4],
    [1, 5, 3, 1]
]

const assert = require("assert");
test(count_coins_memo, matrix_empty, 0);
test(count_coins_memo, matrix_single, 8);
test(count_coins_memo, matrix1, 20);
test(count_coins_memo, matrix2, 12);

test(count_coins_bruteforce, matrix_empty, 0);
test(count_coins_bruteforce, matrix_single, 8);
test(count_coins_bruteforce, matrix1, 20);
test(count_coins_bruteforce, matrix2, 12);

function test(fn, matrix, expected) {
    assert.deepStrictEqual(fn(matrix.length, matrix[0].length, matrix), expected);
}