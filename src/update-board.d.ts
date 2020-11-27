import { GameBoard } from './game'

export type UpdatedBoardResult = {
  readonly board: GameBoard
  readonly isGameOver: boolean
  readonly isGameWon: boolean
}

export type UnhiddeCellFn = (row: number, col: number) => UpdatedBoardResult

export function updateBoard(board: GameBoard): { unhidingCell: UnhiddeCellFn }
