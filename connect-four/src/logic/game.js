export const checkWinner = (board, numRows, numCols, indexRow, indexCol, turn) => {
    const directions = [
        [0, 1], // Horizontal
        [1, 0], // Vertical
        [1, 1], // Diagonal hacia abajo
        [-1, 1], // Diagonal hacia arriba
      ];
     
      for (const [nextRow, nextCol] of directions) {
        let count = 1
        let row = indexRow
        let col = indexCol
  
        //Movimiento hacia "delante"
        while (
          count < 4 && //Solution not found yet
          row + nextRow >= 0 && row + nextRow < numRows && //Correct Position in Board
          col + nextCol >= 0 && col + nextCol < numCols &&
          board[row+nextRow][col+nextCol] === turn  //Check Player have inserted there
        ) {
          count++
          row+=nextRow
          col+=nextCol
        }
  
        //Movimiento hacia "atrás"
        row = indexRow
        col = indexCol
        while (
          count < 4 && //Check if solution found
          row - nextRow >= 0 && row - nextRow < numRows && //Correct Position in Board
          col - nextCol >= 0 && col - nextCol < numCols &&
          board[row-nextRow][col-nextCol] === turn  //Check Player have inserted there
        ) {
          count++
          row-=nextRow
          col-=nextCol
        }
  
        if (count >= 4) return true;
      }

      return false;
}


export const checkFullBoard = (boardToCheck) => {
    return boardToCheck.every((row) => row.every((col) => col !== null))
}