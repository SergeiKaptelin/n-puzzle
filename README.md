# n-puzzle
N-puzzle solver in JavaScript using A* algorithm with manhattan distance, linear conflict and misplaced tiles heuristic [All task](/assets/task/npuzzle.pdf) ([intra pdf](https://cdn.intra.42.fr/pdf/pdf/103/npuzzle.pdf))

## Install:
 ```sh
 make
 ```
 
## Usage:
####If you execute in terminal:
```sh
./npuzzle -f filename -h (manh | lin | misp)
```

Arguments:
```sh
-f, --filename: path to npuzzle field file
-h, --heuristic: heuristic functions, could be:
   manh - manhattan distance
   lin  - linear conflicts
   misp - misplaced tiles
```
   
E.g.
```sh
./npuzzle -f ./puzzle_fields/3-1-s.txt -h manh
```

####If you execute in browser:
```sh
npm start
```

Project will running at http://localhost:8080/

## Examples:
In terminal:
![Example1](/assets/examples/example-1.jpg)

In browser:
![Example2](/assets/examples/example-2.jpg)