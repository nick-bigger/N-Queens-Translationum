var myArgs = process.argv.slice(2);

var n_input = myArgs[0];
var n = parseInt(n_input);

var result = [];
// Initialize empty board.
var board = Array(n).fill(".").map(_ => Array(n).fill("."));

solve(n, 0, board, result);
console.log(result);


/**
 * Finds all valid boards with N Queens placed.
 * 
 * Uses backtracking to recursively try every position for every
 * Queen. Backtracking occurs when a played move is invalid,
 * returning to the last move and then attempting the next position.
 *
 * @param {number} n The length and width of the board, and number of queens
 *                   to place.
 * @param {number} row The index of the row we're currently looking at, used
 *                     when backtracking.
 * @param {string[][]} board The board, updated as we place and remove Queens.
 * @param {string[][]} result An array of valid solutions as strings.
 *
 * @return {string[][]} A list of strings of valid Queen placements for 
 *                      board size n.
 */
function solve(n, row, board, result) {
    if (row == n) {
        // Base case, we've placed valid Queens in all rows
        result.push(board.map(row => row.join("")));
    } else {
        // Given current board, attempt to place valid Queen in row
        for (let col = 0; col < n; col++) {
            board[row][col] = "Q";
            if (board_is_valid(board)) {
                solve(n, row+1, board, result);
            }
            board[row][col] = ".";
        }
    }
}


/**
 * Returns if the board is valid, i.e. all Queens have valid
 * placements.
 *
 * @param {string[][]} board The board, as a 2D array, to check.
 *
 * @return {boolean} If this board is valid or not.
 */
function board_is_valid(board) {
    return conflicts(board) == 0;
}


/**
 * Checks how many conflicting Queens there are on the board. 
 *
 * This is accomplished using frequency tables with the idea that conflicting
 * Queens in a row, column, or diagonal form a complete graph, where each edge
 * is a conflict. We can therefore use the formula (N * (N-1)) / 2 to count
 * the number of edges (conflicts) in each direction.
 *
 * @param {string[][]} board The board, as a 2D array, to check.
 *
 * @return {number} The number of conflicts on the board.
 */
function conflicts(board) {
    var n = board.length;

    var row_freq = Array(n).fill(0);
    var col_freq = Array(n).fill(0);
    var diag_freq = Array(n*2).fill(0);
    var diag2_freq = Array(n*2).fill(0);

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (board[row][col] == "Q") {
                row_freq[row] += 1
                col_freq[col] += 1
                diag_freq[row+col] += 1
                diag2_freq[n-row+col] += 1
            }
        }
    }

    var num_conflicts = 0;
    for (let i = 0; i < n*2; i++) {
        if (i < n) {
            num_conflicts += (row_freq[i] * (row_freq[i] - 1) / 2);
            num_conflicts += (col_freq[i] * (col_freq[i] - 1) / 2);
        }
        num_conflicts += (diag_freq[i] * (diag_freq[i] - 1) / 2);
        num_conflicts += (diag2_freq[i] * (diag2_freq[i] - 1) / 2);
    }

    return num_conflicts;
}
