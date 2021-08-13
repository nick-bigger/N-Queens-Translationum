import sys
from typing import List


def main(n: str):
    try:
        n = int(n)
    except Exception:
        print("n must be a valid number")

	# Initialize empty board
    board = [["." for _ in range(n)] for _ in range(n)]

    result = []
    solve(n, 0, board, result)
    print(result)


def solve(n: int, row: int, board: List[List[str]], result: List[str]):
    """Solve uses backtracking to recursively try every position for
    every Queen.
    
    Note:
        Backtracking occurs when a played move is invalid, returning to
        the last move and then attempting the next position in the row.

    Args:
      n: The size of the board.
      row: The row that we are currently looking at.
      board: The board, updated as we place and remove Queens.
      result: The result list of valid boards with n Queens placed.
    """

    if row == n:
		# Base case, we've placed valid Queens in all rows
        result.append(["".join(row) for row in board])
    else:
		# Given current board, attempt to place valid Queen in row
        for col in range(n):
            board[col][row] = "Q"
            if board_is_valid(board):
                solve(n, row+1, board, result)
            board[col][row] = "."


def board_is_valid(board: List[List[str]]) -> bool:
    """Checks that the number of conflicts, or Queens under attack, on
    the given board is 0.

    Args:
      board: The board, updated as we place and remove Queens.
    """

    return conflicts(board) == 0


def conflicts(board: List[List[str]]) -> int:
    """Checks how many Queens are in any given row, column, diagonal and
    reverse diagonal. 
    
    Note:
        It does this using frequency tables with the idea
        that conflicting Queens in a row, column, or diagonal form a complete
        graph, where each edge is a conflict. We can therefore use the formula
        (N * (N-1)) / 2 to count the number of edges (conflicts) in each direction.

    Args:
      board: The board, updated as we place and remove Queens.
    """
    
    n = len(board)

    row_freq = [0] * n
    col_freq = [0] * n
    diag_freq = [0] * (n * 2)
    diag2_freq = [0] * (n * 2)

    for row in range(n):
        for col in range(n):
            if board[row][col] == "Q":
                row_freq[row] += 1
                col_freq[col] += 1
                diag_freq[row+col] += 1
                diag2_freq[n-row+col] += 1

    num_conflicts = 0
    for i in range(n*2):
        if i < n:
            num_queens_row = row_freq[i]
            num_queens_col = col_freq[i]
            num_conflicts += (num_queens_row * (num_queens_row - 1) / 2)
            num_conflicts += (num_queens_col * (num_queens_col - 1) / 2)

        num_queens_diag = diag_freq[i]
        num_queens_diag2 = diag2_freq[i]
        num_conflicts += (num_queens_diag * (num_queens_diag - 1) / 2)
        num_conflicts += (num_queens_diag2 * (num_queens_diag2 - 1) / 2)

    return num_conflicts


if __name__ == "__main__":
    main(sys.argv[1])
