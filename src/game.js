import { randomInt } from './random'

export function makeGameBoard (size) {
  const mines = chooseRandomMinePositions(size)
  const board = []

  for (let row = 0; row < size; row++) {
    const boardRow = []
    for (let col = 0; col < size; col++) {
      const key = makePositionKey(row, col)
      boardRow.push({
        row,
        col,
        key,
        hasMine: mines.has(key),
        minesAroundCount: countMinesAround(mines, row, col),
        isHidden: true
      })
    }

    board.push(boardRow)
  }

  return board
}

function chooseRandomMinePositions (size) {
  const positions = new Set()
  while (positions.size < size) {
    positions.add(makePositionKey(randomInt(size), randomInt(size)))
  }

  return positions
}

const makePositionKey = (row, col) => `${row}__${col}`

function countMinesAround (mines, row, col) {
  let count = 0

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i === row && j === col) {
        continue
      }

      if (mines.has(makePositionKey(i, j))) {
        count += 1
      }
    }
  }

  return count
}

export function countRemainingUnhiddenCells (board) {
  const size = board.length
  let unhiddenCellsCount = 0

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j].isHidden && !board[i][j].hasMine) {
        unhiddenCellsCount += 1
      }
    }
  }

  return unhiddenCellsCount
}
