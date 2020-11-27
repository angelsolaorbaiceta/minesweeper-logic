# Minesweeper Game Logic

A small package including the minesweeper game logic.
The minesweeper game is a fantastic exercise to learn a new Frontend framework, such as Vue, React, Svelte or Angular.

## Installation

Using _yarn_:

```bash
yarn add minesweeper-logic
```

or _npm_:

```bash
npm i minesweeper-logic
```

## Usage

Use the `makeGameBoard` function to generate a `size` by `size` game board with `size` randomly placed mines:

```ts
import { makeGameBoard } from 'minesweeper-logic'

const gameBoard = makeGameBoard(10)
```

The game board is a bidimensional array where each element represents a cell:

```ts
type BoardCell = {
  row: number
  col: number
  key: string
  hasMine: boolean
  minesAroundCount: number
  isHidden: boolean
}
```

When a cell needs to be uncovered, use the `updateBoard` function.
This function returns a new updated board together with some game stats:

```ts
type UpdatedBoardResult = {
  readonly board: GameBoard
  readonly isGameOver: boolean
  readonly isGameWon: boolean
}
```

In your code:

```ts
import { updateBoard } from 'minesweeper-logic'

const { isGameOver, isGameWon, board } = updateBoard(board).unhidingCell(2, 4)
```
