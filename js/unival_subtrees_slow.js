/**
 *
 * This is a 'slow' implementation with a time complexity of O(n^2)
 * which happens because the algorithm will visit the same nodes many
 * times.
 *
 *     a
 *    / \
 *   a   a
 *      / \
 *     a   a
 *          \
 *           A
 */
const nodes = [
    {
        value: 'a',
        left: {
            value: 'a'
        },
        right: {
            value: 'a',
            right: {
                value: 'a',
                right: {
                    value: 'A'
                }
            },
            left: {
                value: 'a',
            }
        }
    }
];

function is_unival(root, value) {
    if (!root) return true;
    if (root.value === value) {
        return is_unival(root.left, value) && is_unival(root.right, value);
    }
    return false;
}

function count_unival_subtrees(root) {
    if (!root) {
        return 0;
    }
    const left  = count_unival_subtrees(root.left);
    const right = count_unival_subtrees(root.right);
    if (is_unival(root, root.value)) {
        return left + right + 1;
    }
    return left + right
}

assert(count_unival_subtrees(nodes[0]), 3);

const nodes2 = [
    {
        value: 'a',
        left: {
            value: 'c'
        },
        right: {
            value: 'b',
            left: {value: 'b'},
            right: {
                value: 'b',
                right: {value: 'b'}
            }
        }
    }
];

assert(count_unival_subtrees(nodes2[0]), 5);

function assert(l, r) {
    if (l !== r) throw new Error(`${l} !== ${r}`);
}
