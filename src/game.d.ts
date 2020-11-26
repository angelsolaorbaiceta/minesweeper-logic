export type BoardCell = {
  row: number
  col: number
  key: string
  hasMine: boolean
  minesAroundCount: number
  isHidden: boolean
}

export type GameBoard = BoardCell[][]

/**
 * Creates the game borad of the given size (size x size square board)
 * with size randomly placed mines.
 *
 * @param size number of rows, columns and mines
 */
export function makeGameBoard(size: number): GameBoard

/**
 * Counts the number of cells without mine that haven't been uncovered.
 *
 * @param board
 */
export function countRemainingUnhiddenCells(board: GameBoard): number
