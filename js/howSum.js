/**
 * Give a target number + an array of integers
 * return a way to combine the numbers of the array
 * to create the target sum.
 *
 * @param target
 * @param numbers
 * @return {Array<number>}
 */
function howSum(target, numbers) {
    if (target < 0) return null;
    if (target === 0) return [];
    for (let num of numbers) {
        const remainder = target - num;
        const res = howSum(remainder, numbers);
        if (res !== null) {
            return [...res, num];
        }
    }
    return null
}

const assert = require("assert");

console.time("brute-force")
assert.deepStrictEqual(howSum(-1, [1, 2]), null);
assert.deepStrictEqual(howSum(0, [1, 2]), []);
assert.deepStrictEqual(howSum(2, [1]), [1, 1]);
assert.deepStrictEqual(howSum(3, [1]), [1, 1, 1]);
assert.deepStrictEqual(howSum(3, [1, 2]), [1, 1, 1]);
howSum(300, [1, 2])
console.timeEnd("brute-force")

/**
 * Adding memoization
 * @param target
 * @param numbers
 * @param memo
 * @returns {number[] | null}
 */
function howSumMemo(target, numbers, memo = {}) {
    if (target in memo) return memo[target];
    if (target < 0) return null;
    if (target === 0) return [];
    for (let num of numbers) {
        const remainder = target - num;
        const res = howSum(remainder, numbers);
        if (res !== null) {
            memo[target] = [...res, num];
            return memo[target];
        }
    }
    memo[target] = null;
    return null
}

console.time('memo');
assert.deepStrictEqual(howSumMemo(-1, [1, 2]), null);
assert.deepStrictEqual(howSumMemo(0, [1, 2]), []);
assert.deepStrictEqual(howSumMemo(2, [1]), [1, 1]);
assert.deepStrictEqual(howSumMemo(3, [1]), [1, 1, 1]);
assert.deepStrictEqual(howSumMemo(3, [1, 2]), [1, 1, 1]);
howSumMemo(300, [1, 2])
console.timeEnd('memo');