# Cat Unix Utility Clone

A Node.js implementation of the Unix `cat` command line utility. This tool allows you to concatenate and display file contents with optional line numbering.

## Prerequisites

- Node.js (version 14.x or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd cat-cli
```

2. Make the script executable:
```bash
chmod +x cccat.js
```

3. Create an alias (for Bash users):

Add the following line to your `~/.bashrc` file:
```bash
alias cccat="node /full/path/to/cccat.js"
```

Then reload your bash configuration:
```bash
source ~/.bashrc
```

## Usage

The utility supports the following operations:

### Basic File Reading
Display contents of a single file:
```bash
cccat file.txt
```

### Reading from Standard Input
Read from standard input when no file is specified or when `-` is provided:
```bash
echo "Hello World" | cccat
# or
cccat -
```

### Concatenating Multiple Files
Display contents of multiple files in sequence:
```bash
cccat file1.txt file2.txt file3.txt
```

### Line Numbering Options

Number all lines (including blank lines):
```bash
cccat -n file.txt
```

Number only non-blank lines:
```bash
cccat -b file.txt
```

### Combining Options
You can combine files and options in any order:
```bash
cccat -n file1.txt file2.txt
cccat file1.txt -b file2.txt
```

### Example Output

Basic file content:
```bash
$ cccat test.txt
This is line 1
This is line 2
This is line 3
```

With line numbers (-n):
```bash
$ cccat -n test.txt
1 This is line 1
2 This is line 2
3 This is line 3
```

With non-blank line numbers (-b):
```bash
$ cccat -b test.txt
1 This is line 1

2 This is line 2
3 This is line 3
```



