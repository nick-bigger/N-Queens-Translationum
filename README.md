# N-Queens Translationum

This is my solution to the N-Queens problem in seven different languages (and possibly more as I continue to add to this project). It is an exercise I decided to do as I learned Go and Rust, but is also an interesting look at how to accomplish the same problem in different languages.

NOTE: None of these are perfect, I am aware that [there are more efficient ways to solve the N-Queens problem](https://leetcode.com/problems/n-queens/discuss/19810/Fast-short-and-easy-to-understand-python-solution-11-lines-76ms). I'm also not an expert at any of these languages (especially Go and Rust)!

## Installation

- [Install Go](https://golang.org/doc/install)
- [Install Java](https://java.com/en/download/help/download_options.html)
- [Install Node](https://nodejs.org/en/download/)
- [Install Python3](https://www.python.org/downloads/)
- [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [Install Rust](https://www.rust-lang.org/tools/install)
- [Install TS-Node](https://www.npmjs.com/package/ts-node)

## Usage

```zsh
# Go
go run go.go <N>
```

```zsh
# Java
javac java.java
java java <N>
```

```zsh
# JavaScript
node javascript.js <N>
```

```zsh
# Python3
python3 python.py <N>
```

```zsh
# Ruby
ruby ruby.rb <N>
```

```zsh
# Rust
cargo build
cargo run <N>
```

```zsh
# TypeScript
ts-node typescript.ts <N>
```

## Psuedocode

``` text
get the value of N from Command Line Args

create empty list of results
create empty N x N board

solve(row) starting at first row

print the result list


solve(row):
    if N valid Queens have been placed
		add this board to the result list
    else
        for each square in this row
            place a queen at this position
            if this board is valid
                solve(the next row)
            remove the queen from this position


board_is_valid():
    yes if the number of conflicts() is 0


conflicts():
    count the number of row conflicts
    count the number of column conflicts
    count the number of diagonal conflicts
    count the number of reverse diagonal conflicts
```
