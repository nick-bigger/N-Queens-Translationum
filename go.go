package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

var result = [][]string{}

func main() {
	n_input := os.Args[1]
	n, err := strconv.Atoi(n_input)
	if err != nil {
		fmt.Println("n must be a valid 64-bit Integer")
		os.Exit(2)
	}

	// Initialize empty board
	board := make([][]string, n)
	for i := range board {
		board[i] = make([]string, n)
		for j := 0; j < n; j++ {
			board[i][j] = "."
		}
	}

	Solve(n, 0, board)
	fmt.Println(result)
}

// Solve uses backtracking to recursively try every position for
// every Queen. Backtracking occurs when a played move is invalid,
// returning to the last move and then attempting the next position.
func Solve(n int, row int, board [][]string) {
	if row == n {
		// Base case, we've placed valid Queens in all rows
		res := []string{}
		for _, row := range board {
			s := strings.Join(row, "")
			res = append(res, s)
		}
		result = append(result, res)
		return
	} else {
		// Given current board, attempt to place valid Queen in row
		for col := 0; col < n; col++ {
			board[col][row] = "Q"
			if BoardIsValid(board) {
				Solve(n, row+1, board)
			}
			board[col][row] = "."
		}
	}
}

// BoardIsValid checks that the number of conflicts, or Queens under attack,
// on the given board is 0.
func BoardIsValid(board [][]string) bool {
	return Conflicts(board) == 0
}

// Conflicts checks how many Queens are in any given row, column, diagonal
// and reverse diagonal. It does this using frequency tables with the idea
// that conflicting Queens in a row, column, or diagonal form a complete
// graph, where each edge is a conflict. We can therefore use the formula
// (N * (N-1)) / 2 to count the number of edges (conflicts) in each direction.
func Conflicts(board [][]string) int {
	n := len(board)

	row_freq := make([]int, n)
	col_freq := make([]int, n)
	diag_freq := make([]int, n*2)
	diag2_freq := make([]int, n*2)

	for row := 0; row < n; row++ {
		for col := 0; col < n; col++ {
			if board[row][col] == "Q" {
				row_freq[row] += 1
				col_freq[col] += 1
				diag_freq[row+col] += 1
				diag2_freq[n-row+col] += 1
			}
		}
	}

	num_conflicts := 0
	for i := 0; i < n*2; i++ {
		if i < n {
			num_queens_row := row_freq[i]
			num_queens_col := col_freq[i]
			num_conflicts += (num_queens_row * (num_queens_row - 1) / 2)
			num_conflicts += (num_queens_col * (num_queens_col - 1) / 2)
		}
		num_queens_diag := diag_freq[i]
		num_queens_diag2 := diag2_freq[i]
		num_conflicts += (num_queens_diag * (num_queens_diag - 1) / 2)
		num_conflicts += (num_queens_diag2 * (num_queens_diag2 - 1) / 2)
	}
	return num_conflicts
}
