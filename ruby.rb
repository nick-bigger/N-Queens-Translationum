# Public: Uses backtracking to recursively try every position for every
#         Queen. Backtracking occurs when a played move is invalid,
#         returning to the last move and then attempting the next position.
#         
#
# n - The length and width of the board, and number of queens to place.
# row - The row we're currently looking at, used when backtracking.
# board - The board, updated as we place and remove Queens.
# result - An array of valid solutions as strings.
#
# Returns a list of strings of valid Queen placements for board size n.
def solve(n, row, board, result)
    if row == n
		# Base case, we've placed valid Queens in all rows
        result.append(board.map(&:join))
    else
		# Given current board, attempt to place valid Queen in row
        (0...n).each do |col|
            board[col][row] = "Q"
            solve(n, row+1, board, result) if board_is_valid?(board)
            board[col][row] = "."
        end
    end
end


# Public: Returns if the board is valid, i.e. all Queens have valid
#         placements.
#         
#
# board - The board, as a 2D array, to check.
def board_is_valid?(board)
    conflicts(board) == 0
end


# Public: Checks how many conflicting Queens there are on the board. It does this
#         using frequency tables with the idea that conflicting Queens in a row,
#         column, or diagonal form a complete graph, where each edge is a conflict.
#         We can therefore use the formula (N * (N-1)) / 2 to count the number of
#         edges (conflicts) in each direction.
#         
#
# board - The board, as a 2D array, to check.
#
# Examples
#
#   conflicts([
#       ["Q",".",".","Q"],
#       [".",".",".","."],
#       [".",".",".","."],
#       [".",".",".","."]
#   ])
#   # => 2
#
# Returns the number of conflicts on the board.
def conflicts(board)
    n = board.length()

    row_freq = [0] * n
    col_freq = [0] * n
    diag_freq = [0] * (n * 2)
    diag2_freq = [0] * (n * 2)

    (0...n).each do |row|
        (0...n).each do |col|
            if board[row][col] == "Q"
                row_freq[row] += 1
                col_freq[col] += 1
                diag_freq[row+col] += 1
                diag2_freq[n-row+col] += 1
            end
        end
    end

    num_conflicts = 0
    (0...n*2).each do |i|
        if i < n
            num_queens_row = row_freq[i]
            num_queens_col = col_freq[i]
            num_conflicts += (num_queens_row * (num_queens_row - 1) / 2)
            num_conflicts += (num_queens_col * (num_queens_col - 1) / 2)
        end

        num_queens_diag = diag_freq[i]
        num_queens_diag2 = diag2_freq[i]
        num_conflicts += (num_queens_diag * (num_queens_diag - 1) / 2)
        num_conflicts += (num_queens_diag2 * (num_queens_diag2 - 1) / 2)
    end

    num_conflicts
end


n_input = ARGV[0]

begin
    n = Integer(n_input)
rescue ArgumentError
    puts "n must be a valid number"
else
    # Initialize empty board
    board = Array.new(n) { Array.new(n) { "." } }

    result = []
    solve(n, 0, board, result)
    print result
end
