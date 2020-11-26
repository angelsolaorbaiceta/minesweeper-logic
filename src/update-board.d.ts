import { GameBoard } from './game'

export type UnhiddeCellFn = (row: number, col: number) => GameBoard

export function updateBoard(board: GameBoard): { unhiddingCell: UnhiddeCellFn }
