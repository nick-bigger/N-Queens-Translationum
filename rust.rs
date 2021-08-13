use std::env;


fn main() {
    let args: Vec<String> = env::args().collect();
    match args.len() {
        1 => {
            println!("n must be passed 'cargo run <n>'");
        },
        _ => {
            let n: usize = match args[1].parse() {
                Ok(n) => {
                    n
                },
                Err(_) => {
                    eprintln!("n must be a valid 64-bit Integer");
                    return;
                },
            };
            
            // Initialize empty board
            let mut board = vec![vec!["."; n as usize]; n as usize];
            let mut result: Vec<Vec<String>> = Vec::new();

            solve(n, 0, &mut board, &mut result);

            println!("{:?}", result);
        }
    };
}

/// Uses backtracking to recursively try every position for every
/// Queen. Backtracking occurs when a played move is invalid,
/// returning to the last move and then attempting the next position.
fn solve(n: usize, row: usize, board: &mut Vec<Vec<&str>>, result: &mut Vec<Vec<String>>) {
    if row == n {
        // Base case, we've placed valid Queens in all rows
        let mut res: Vec<String> = Vec::new();
        for row in board {
            res.push(row.join(""));
        }
        result.push(res);
        return
    } else {
        // Given current board, attempt to place valid Queen in row
        for col in 0..n {
            board[row][col] = "Q";
            if board_is_valid(board) {
                solve(n, row+1, board, result);
            }
            board[row][col] = ".";
        }
    }
}

/// BoardIsValid checks that the number of conflicts, or Queens under attack,
/// on the given board is 0.
fn board_is_valid(board: &Vec<Vec<&str>>) -> bool {
    return conflicts(board) == 0;
}

/// Checks how many Queens are in any given row, column, diagonal and reverse
/// diagonal. It does this using frequency tables with the idea that
/// conflicting Queens in a row, column, or diagonal form a complete graph,
/// where each edge is a conflict. We can therefore use the formula
/// (N * (N-1)) / 2 to count the number of edges (conflicts) in each direction.
fn conflicts(board: &Vec<Vec<&str>>) -> i64 {
	let n = board.len();

	let mut row_freq = vec![0; n as usize];
	let mut col_freq = vec![0; n as usize];
	let mut diag_freq = vec![0; n*2 as usize];
	let mut diag2_freq = vec![0; n*2 as usize];

	for row in 0..n {
		for col in 0..n {
			if board[row][col] == "Q" {
				row_freq[row] += 1;
				col_freq[col] += 1;
				diag_freq[row+col] += 1;
				diag2_freq[n-row+col] += 1;
			}
		}
	}

	let mut num_conflicts = 0;
	for i in 0..n*2 {
		if i < n {
			let num_queens_row = row_freq[i];
			let num_queens_col = col_freq[i];
			num_conflicts += num_queens_row * (num_queens_row - 1) / 2;
			num_conflicts += num_queens_col * (num_queens_col - 1) / 2;
		}
		let num_queens_diag = diag_freq[i];
		let num_queens_diag2 = diag2_freq[i];
		num_conflicts += num_queens_diag * (num_queens_diag - 1) / 2;
		num_conflicts += num_queens_diag2 * (num_queens_diag2 - 1) / 2;
	}
	return num_conflicts
}
