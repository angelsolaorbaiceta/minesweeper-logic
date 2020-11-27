export function updateBoard (board) {
  return {
    unhidingCell (row, col) {
      return unhideCell(board, row, col)
    }
  }
}

function unhideCell (board, row, col) {
  if (board[row][col].hasMine) {
    return {
      board,
      isGameOver: true,
      isGameWon: false
    }
  }

  const updatedBoard = makeBoardCopy(board)
  updatedBoard[row] = board[row].map((cell, index) =>
    index === col ? { ...cell, isHidden: false } : cell
  )

  if (updatedBoard[row][col].minesAroundCount === 0) {
    unhideTrivialCellsInPlace(updatedBoard, row, col)
  }

  return {
    board: updatedBoard,
    isGameOver: false,
    isGameWon: isGameWon(updatedBoard)
  }
}

function unhideTrivialCellsInPlace (board, row, col) {
  const rowIndices = [row - 1, row, row + 1].filter(
    (i) => i >= 0 && i < board.length
  )
  const colIndices = [col - 1, col, col + 1].filter(
    (i) => i >= 0 && i < board.length
  )

  rowIndices.forEach((i) => {
    colIndices.forEach((j) => {
      const cell = board[i][j]

      if (cell.isHidden) {
        board[i][j] = { ...cell, isHidden: false }

        if (cell.minesAroundCount === 0) {
          unhideTrivialCellsInPlace(board, i, j)
        }
      }
    })
  })
}

function makeBoardCopy (board) {
  const boardCopy = []

  board.forEach((row) => {
    const rowCopy = row.map((cell) => ({ ...cell }))
    boardCopy.push(rowCopy)
  })

  return boardCopy
}

function isGameWon (board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = board[i][j]

      if (!cell.hasMine && cell.isHidden) {
        return false
      }
    }
  }

  return true
}
