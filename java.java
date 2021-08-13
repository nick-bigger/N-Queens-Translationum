import java.util.ArrayList;
import java.util.Arrays;


class java {
    public static void main(String[] args) {
        int n = Integer.parseInt(args[0]);

        String[][] board = new String[n][n];
        for (String[] row: board)
            Arrays.fill(row, ".");

        ArrayList<String[]> result = new ArrayList<String[]>();
        
        solve(n, 0, board, result);
        for (String[] res : result) {
            System.out.println(Arrays.toString(res));
        }
    }

    public static void solve(int n, int row, String[][] board, ArrayList<String[]> result) {
        if (n == row) {
            String[] res = new String[n];
            for (int i=0; i<n; i++) {
                res[i] = String.join("", board[i]);
            }
            result.add(res);
        } else {
            for (int col=0; col < n; col++) {
                board[row][col] = "Q";
                if (board_is_valid(board)) {
                    solve(n, row+1, board, result);
                }
                board[row][col] = ".";
            }
        }
    }

    public static boolean board_is_valid(String[][] board) {
        return conflicts(board) == 0;
    }

    public static int conflicts(String[][] board) {
        int n = board.length;

        int[] row_freq = new int[n];
        int[] col_freq = new int[n];
        int[] diag_freq = new int[n*2];
        int[] diag2_freq = new int[n*2];

        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (board[row][col] == "Q") {
                    row_freq[row] += 1;
                    col_freq[col] += 1;
                    diag_freq[row+col] += 1;
                    diag2_freq[n-row+col] += 1;
                }
            }
        }

        int num_conflicts = 0;
        for (int i = 0; i < n*2; i++) {
            if (i < n) {
                num_conflicts += (row_freq[i] * (row_freq[i] - 1) / 2);
                num_conflicts += (col_freq[i] * (col_freq[i] - 1) / 2);
            }

            num_conflicts += (diag_freq[i] * (diag_freq[i] - 1) / 2);
            num_conflicts += (diag2_freq[i] * (diag2_freq[i] - 1) / 2);
        }

        return num_conflicts;
    }
}
