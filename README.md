# n-puzzle
N-puzzle solver in JavaScript using A* algorithm with manhattan distance, linear conflict and misplaced tiles heuristic [All task](/assets/task/npuzzle.pdf) ([intra pdf](https://cdn.intra.42.fr/pdf/pdf/103/npuzzle.pdf))

[Online demo](https://sergeikaptelin.github.io/n-puzzle/)

## Install:
 ```sh
 make
 ```
 
## Usage:
#### If you execute in terminal:
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

#### If you execute in browser:
```sh
npm start
```

Project will running at http://localhost:8080/

## Examples:
In terminal:
<p align="center">
  <img src="https://preview.ibb.co/iLA4WL/example-1.jpg"/>
</p>

In browser:
<p align="center">
  <img src="https://preview.ibb.co/iXaGd0/example-2.jpg"/>
</p>

## A* algorithm
The [A* search](https://en.wikipedia.org/wiki/A*_search_algorithm), as the name suggests, is a search algorithm, its purpose to intelligently search the space state (set of all board configurations) and find a path from the initial configuration to the goal configuration. The intelligence of the search is given by how many states it visits: the fewer the number of states visited, the more intelligent it is and the sooner it will provide a solution. To navigate through the space state, we model the problem as a graph. In this manner, we consider that state B is a child of state A if B is obtained by moving the empty tile in some valid direction in A. In this sense, a node on the graph can have at most four children, one for each possible direction.

<p align="center">
  <img src="https://image.ibb.co/mMDuy0/sliding-tiles-puzzle-7-opt-preview.jpg"/>
</p>

The A* search is informed as it uses environment knowledge to select the next step to continue the search. This knowledge is represented by a numeric value associated with every state (s) and known as f(s), hence in general:

```sh
f(s) = g(s) + h(s)
```

where g(s) is the cost of reaching state s from the initial state, and h(s) is the estimated cost of reaching the goal state from the current state or configuration. This relation is depicted in the following figure.

<p align="center">
  <img src="https://image.ibb.co/cQ855f/sliding-tiles-puzzle-8-opt.jpg"/>
</p>

To guide the search through the immense space state we use heuristics. A heuristic is the way by which we adhere our empirical and specific environment knowledge to the rational agent, in this case the A* search. The information provided by the heuristic is supposed to help find a feasible, short path to the goal configuration.

### Misplaced tiles heuristic
The misplaced tiles heuristic returns the number of tiles that are misplaced; that is, in an incorrect position when compared to the goal configuration. It’s admissible as the number returned does not overestimate the minimum number of moves required to get to the goal state. You have to move every misplaced tile once at least to be able to take them to their goal position; hence, it is admissible.

<p align="center">
  <img src="https://image.ibb.co/d9TNkf/sliding-tiles-puzzle-9-opt.jpg"/>
</p>

### Manhattan distance
The Manhattan distance or block distance is defined as the sum of the absolute difference of their corresponding coordinates; that is:

```sh
MD = |x1 − x2| + |y1 − y2|
```

considering points A = (x1, y1) and B = (x2, y2).

It is admissible since for each tile it returns the minimum number of steps that will be required to move that tile into its goal position.

### Linear conflict heuristic
The linear conflict heuristic provides information on these necessary moves. Two tiles tj and tk are said to be in a linear conflict if: tj and tk are in the same line; the goal positions of tj and tk are both in that line; tj is to the right of tk; and the goal position of tj is to the left of the goal position of tk.

<p align="center">
  <img src="https://image.ibb.co/nKY2J0/sliding-tiles-puzzle-14-opt.jpg"/>
</p>

In the left board, tiles 3 and 1 are located in their corresponding row but in an incorrect order. To get them to their goal positions we must move one of them down and then up again; these moves are not considered in the Manhattan distance heuristic. Important note: a tile cannot appear related to more than one conflict as solving a conflict may involve the resolution of other conflicts in the same row or column. Therefore, if tile 1 is related to tile 3 in a conflict then it cannot be related to a conflict with tile 2 as this may become an overestimation of the shortest path to a goal state and could make our heuristic non-admissible.