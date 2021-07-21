/**
 * Give a target number + an array of integers, can the target be made
 * from the numbers in the array? return the shortest valid array
 *
 * @param target
 * @param numbers
 * @return {number[]|null}
 */
function bestSum(target, numbers) {
    if (target < 0) return null;
    if (target === 0) return [];
    /**
     * @type {number[] | null}
     */
    let best = null;
    for (let num of numbers) {
        const remainder = target - num;
        const res = bestSum(remainder, numbers);
        if (res !== null) {
            const next = [...res, num];
            if (!best || next.length < best.length) {
                best = next;
            }
        }
    }
    return best
}

const assert = require("assert");

console.time("brute-force")
assert.deepStrictEqual(bestSum(-1, [1, 2]), null);
assert.deepStrictEqual(bestSum(0, [1, 2]), []);
assert.deepStrictEqual(bestSum(2, [1]), [1, 1]);
assert.deepStrictEqual(bestSum(3, [1]), [1, 1, 1]);
assert.deepStrictEqual(bestSum(3, [1, 2]), [2, 1]);
console.timeEnd("brute-force")

function bestSumMemo(target, numbers, memo = {}) {
    if (target in memo) return memo[target];
    if (target < 0) return null;
    if (target === 0) return [];
    /**
     * @type {number[] | null}
     */
    let best = null;
    for (let num of numbers) {
        const remainder = target - num;
        const res = bestSumMemo(remainder, numbers, memo);
        if (res !== null) {
            const next = [...res, num];
            if (!best || next.length < best.length) {
                best = next;
            }
        }
    }
    memo[target] = best;
    return memo[target]
}

console.time("memo")
assert.deepStrictEqual(bestSumMemo(-1, [1, 2]), null);
assert.deepStrictEqual(bestSumMemo(0, [1, 2]), []);
assert.deepStrictEqual(bestSumMemo(2, [1]), [1, 1]);
assert.deepStrictEqual(bestSumMemo(3, [1]), [1, 1, 1]);
assert.deepStrictEqual(bestSumMemo(3, [1, 2]), [2, 1]);
assert.deepStrictEqual(bestSumMemo(3000, [1]).length, 3000);
console.timeEnd("memo")