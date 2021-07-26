/**
 * A basic brute-force approach where at worst we'd iterate
 * through `arr2` once for every item in `arr1`. This is O(n*m)
 *
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} value
 * @return {boolean}
 */
function sumOfTwoBruteforce(arr1, arr2, value) {
    for (let num1 of arr1) {
        const compliment = value - num1;
        for (let num2 of arr2) {
            if (num2 === compliment) {
                return true;
            }
        }
    }
    return false
}

const assert = require("assert");

console.time("brute-force O(n*m)")
assert.deepStrictEqual(sumOfTwoBruteforce([], [], 10), false);
assert.deepStrictEqual(sumOfTwoBruteforce([10], [], 10), false);
assert.deepStrictEqual(sumOfTwoBruteforce([], [10], 10), false);
assert.deepStrictEqual(sumOfTwoBruteforce([1], [9], 10), true);
assert.deepStrictEqual(sumOfTwoBruteforce([1, 2, 3], [4, 5, 6, 7], 10), true);
console.timeEnd("brute-force O(n*m)")

/**
 * A faster approach would be to the calculate every compliment
 * first for `arr1` into a data structure that has fast insert + lookup.
 *
 * Then, we can iterate through arr2 until we find the compliment, which
 * at worst may not yield a result, meaning that whole this is O(n+m) which
 * is much better than the brute-force approach.
 *
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} value
 * @return {boolean}
 */
function sumOfTwo(arr1, arr2, value) {
    const compliments = new Set();
    for (let num1 of arr1) {
        compliments.add(value-num1);
    }
    for (let num2 of arr2) {
        if (compliments.has(num2)) {
            return true;
        }
    }
    return false
}

console.time("faster O(n+m)")
assert.deepStrictEqual(sumOfTwo([], [], 10), false);
assert.deepStrictEqual(sumOfTwo([10], [], 10), false);
assert.deepStrictEqual(sumOfTwo([], [10], 10), false);
assert.deepStrictEqual(sumOfTwo([1], [9], 10), true);
assert.deepStrictEqual(sumOfTwo([1, 2, 3], [4, 5, 6, 7], 10), true);
console.timeEnd("faster O(n+m)")

/**
 * A functional approach to the same problem.
 *
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} value
 * @return {boolean}
 */
function sumOfTwoFunctional(arr1, arr2, value) {
    const compliments = new Set(arr1.map(num1 => value - num1));
    return arr2.some(num2 => compliments.has(num2));
}

console.time("faster O(n+m)")
assert.deepStrictEqual(sumOfTwoFunctional([], [], 10), false);
assert.deepStrictEqual(sumOfTwoFunctional([10], [], 10), false);
assert.deepStrictEqual(sumOfTwoFunctional([], [10], 10), false);
assert.deepStrictEqual(sumOfTwoFunctional([1], [9], 10), true);
assert.deepStrictEqual(sumOfTwoFunctional([1, 2, 3], [4, 5, 6, 7], 10), true);
console.timeEnd("faster O(n+m)")