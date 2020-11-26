export function countMines (board) {
  let minesCount = 0

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      minesCount += board[i][j].hasMine ? 1 : 0
    }
  }

  return minesCount
}
