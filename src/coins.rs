use std::cmp::Ordering;

fn count_matrix(matrix: &[Vec<usize>]) -> usize {
    let rows = matrix.len();
    let cols = if rows > 0 { matrix[0].len() } else { 0 };
    return coins(rows, cols, matrix);
}

fn coins(m: usize, n: usize, matrix: &[Vec<usize>]) -> usize {
    if m <= 0 || n <= 0 {
        return 0;
    }
    let curr = matrix[m - 1][n - 1];
    let left = coins(m - 1, n, matrix);
    let right = coins(m, n - 1, matrix);
    return curr + std::cmp::max(left, right);
}

#[test]
fn test_coins() {
    let matrix: Vec<Vec<usize>> = vec![vec![0, 3, 1, 1], vec![2, 0, 0, 4], vec![1, 5, 3, 1]];
    let matrix_empty: Vec<Vec<usize>> = vec![vec![]];
    let matrix_single: Vec<Vec<usize>> = vec![vec![8]];
    assert_eq!(coins(3, 4, &matrix), 12);
    assert_eq!(coins(0, 0, &matrix_empty), 0);
    assert_eq!(coins(1, 1, &matrix_single), 8);
}
