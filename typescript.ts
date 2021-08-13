var myArgs = process.argv.slice(2);

var n_input: string = myArgs[0];
var n: number = parseInt(n_input);

var result: string[][] = [];
var board: string[][] = Array(n).fill(".").map(_ => Array(n).fill("."));

solve(n, 0, board, result);
console.log(result);

function solve(n: number, row: number, board: string[][], result: string[][]): void {
    if (row == n) {
        result.push(board.map(row => row.join("")));
    } else {
        for (let col: number = 0; col < n; col++) {
            board[row][col] = "Q";
            if (board_is_valid(board)) {
                solve(n, row+1, board, result);
            }
            board[row][col] = ".";
        }
    }
}

function board_is_valid(board: string[][]): boolean {
    return conflicts(board) == 0;
}

function conflicts(board: string[][]): number {
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
