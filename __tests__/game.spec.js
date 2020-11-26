import { makeGameBoard, countRemainingUnhiddenCells } from '../src/game'
import { updateBoard } from '../src/update-board'
import { countMines } from './utils'

describe('The game board', () => {
  describe('generation', () => {
    let board

    beforeEach(() => {
      board = makeGameBoard(2)
    })

    it('has a given number of mines', () => {
      expect(countMines(board)).toBe(2)
    })

    it('has all non-mine cells unhidden', () => {
      expect(countRemainingUnhiddenCells(board)).toBe(2)
    })
  })

  describe('when a non-mine, non-zero mines around cell is unhidden', () => {
    let board

    beforeEach(() => {
      board = updateBoard(makeFakeBoard()).unhiddingCell(1, 1)
    })

    it('unhides the selected cell', () => {
      const { isHidden } = board[1][1]
      expect(isHidden).toBeFalsy()
    })

    it('keeps the rest of the cells hidden', () => {
      expect(countRemainingUnhiddenCells(board)).toBe(11)
    })
  })

  describe('when a non-mine, zero mines around cell is unhidden', () => {
    let board

    beforeEach(() => {
      board = updateBoard(makeFakeBoard()).unhiddingCell(0, 0)
      console.log(board)
    })

    it('unhides the selected cell', () => {
      const { isHidden } = board[0][0]
      expect(isHidden).toBeFalsy()
    })

    it('unhides all the trivial cells around', () => {
      const indices = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
        [2, 0],
        [2, 1]
      ]
      indices.forEach(([row, col]) => {
        const { isHidden } = board[row][col]
        console.log(`Mine at (${row}, ${col}) is hidden? ${isHidden}`)
        expect(isHidden).toBeFalsy()
      })
    })
  })
})

function makeFakeBoard () {
  return [
    [
      { row: 0, col: 0, hasMine: false, minesAroundCount: 0, isHidden: true },
      { row: 0, col: 1, hasMine: false, minesAroundCount: 1, isHidden: true },
      { row: 0, col: 2, hasMine: true, minesAroundCount: 0, isHidden: true },
      { row: 0, col: 3, hasMine: true, minesAroundCount: 0, isHidden: true }
    ],
    [
      { row: 1, col: 0, hasMine: false, minesAroundCount: 0, isHidden: true },
      { row: 1, col: 1, hasMine: false, minesAroundCount: 1, isHidden: true },
      { row: 1, col: 2, hasMine: false, minesAroundCount: 2, isHidden: true },
      { row: 1, col: 3, hasMine: false, minesAroundCount: 2, isHidden: true }
    ],
    [
      { row: 2, col: 0, hasMine: false, minesAroundCount: 1, isHidden: true },
      { row: 2, col: 1, hasMine: false, minesAroundCount: 2, isHidden: true },
      { row: 2, col: 2, hasMine: false, minesAroundCount: 2, isHidden: true },
      { row: 2, col: 3, hasMine: false, minesAroundCount: 1, isHidden: true }
    ],
    [
      { row: 3, col: 0, hasMine: false, minesAroundCount: 1, isHidden: true },
      { row: 3, col: 1, hasMine: true, minesAroundCount: 0, isHidden: true },
      { row: 3, col: 2, hasMine: true, minesAroundCount: 0, isHidden: true },
      { row: 3, col: 3, hasMine: false, minesAroundCount: 1, isHidden: true }
    ]
  ]
}
