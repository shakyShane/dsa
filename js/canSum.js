/**
 * Give a target number + an array of integers, can the target be made
 * from the numbers in the array - any number can be used more than once.
 *
 * @param target
 * @param numbers
 * @return boolean
 */
function canSum(target, numbers) {
    if (target < 0) return false;
    if (target === 0) return true;
    for (let num of numbers) {
        if (canSum(target - num, numbers)) {
            return true;
        }
    }
    return false;
}

console.time('brute-force')
console.assert(canSum(-1, [1, 2]) === false, "-1 : [1, 2]")
console.assert(canSum(0, [1, 2]) === true, "0 : [1, 2]")
console.assert(canSum(20, []) === false, "20 : []")
console.assert(canSum(4, [1, 2]) === true, "4 : [1, 2]")
console.assert(canSum(2000, [1, 2, 4, 5]) === true, "2000 : [1, 2, 3, 4]")
console.timeEnd('brute-force')

/**
 * Give a target number + an array of integers, can the target be made
 * from the numbers in the array - any number can be used more than once.
 *
 * @param target
 * @param numbers
 * @param memo
 * @return boolean
 */
function canSumMemo(target, numbers, memo = {}) {
    if (target in memo) return memo[target];
    if (target < 0) return false;
    if (target === 0) return true;
    for (let num of numbers) {
        const remainder = target - num;
        if (canSumMemo(remainder, numbers, memo) === true) {
            memo[target] = true;
            return true;
        }
    }
    memo[target] = false
    return false;
}

console.time('memo')
console.assert(canSumMemo(-1, [1, 2]) === false, "-1 : [1, 2]")
console.assert(canSumMemo(0, [1, 2]) === true, "0 : [1, 2]")
console.assert(canSumMemo(20, []) === false, "20 : []")
console.assert(canSumMemo(4, [1, 2]) === true, "4 : [1, 2]")
console.assert(canSumMemo(2000, [1, 2, 4, 5]) === true, "2000 : [1, 2, 3, 4]")
console.timeEnd('memo')
