import { useState } from "react"

import { Cell } from './components/Cell.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { checkWinner, checkFullBoard } from './logic/game.js' 
import { saveGameToStorage, resetGameStorage} from "./logic/storage/index.js"

const Turns = {
  PlayerA: 'red_circle',
  PlayerB: 'yellow_circle'
}


function App() {
  const numRows = 6
  const numCols = 7

  // Create an empty game board
  const initialBoard = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null))

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return initialBoard
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? Turns.PlayerA
  })

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    return winnerFromStorage ?? null 
  })

  const [hoveredColumn, setHoveredColumn] = useState(null);

  const updateBoard = (indexRow, indexCol) => {
    if (winner !== null) return;

    if (board[0][indexCol] !== null) { 
      return;
    }

    for (let row=numRows-1; row>=0; row--) {
      if(board[row][indexCol] === null) {
        indexRow = row
        break
      } 
    }

    const newBoard = [... board]
    newBoard[indexRow][indexCol] = turn
    setBoard(newBoard)

    const gameWinner = checkWinner(board, numRows, numCols, indexRow, indexCol, turn)
    let newWinner = null
    if(gameWinner) {
      setWinner(turn)
      newWinner = turn
    }
    if(checkFullBoard(newBoard)) setWinner(false)
   
    const newTurn = turn === Turns.PlayerA ? Turns.PlayerB : Turns.PlayerA
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
      winner: newWinner
    })
    
  }

  const columnHoverBoard = (indexCol) => {
    let indexRow = -1;
    for (let row=numRows-1; row>=0; row--) {
      if(board[row][indexCol] === null) {
        indexRow = row
        break
      } 
    }

    if (indexRow === -1) return;

    setHoveredColumn(indexRow + "-" + indexCol)
  }

  const resetGame = () => {
    setBoard(Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null)))
    setTurn(Turns.PlayerA)
    setWinner(null)

    resetGameStorage()
  }

  const classNamePlayerATurn = `turn ${turn === Turns.PlayerA ? 'player_to_act' : ''}`
  const classNamePlayerBTurn = `turn ${turn === Turns.PlayerB ? 'player_to_act' : ''}`

  return (
    <main className='board'>
      <h1 className='title'>Connect 4</h1>
      <section className="player_turn">
        <div className={classNamePlayerATurn + " player-a"}>
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" className="red_circle" />
          </svg>
        </div>
        <div className={classNamePlayerBTurn + " player-b"}>
        <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" className="yellow_circle" />
          </svg>
        </div>
      </section>
      <section className='game'>
        <table className='game__table'>
          <tbody>
            {
            board.map((row, rowIndex) => {
              return(
                <tr key={rowIndex} className="game_row">
                  {row.map((cell, colIndex) => {                    
                    return (
                      <Cell 
                        updateBoard={updateBoard}
                        indexRow = {rowIndex}
                        indexCol = {colIndex}
                        playerTurn = {turn}
                        columnHoverBoard={columnHoverBoard}
                        hovered = {hoveredColumn}
                        >
                        {board[rowIndex][colIndex]}
                      </Cell>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className="buttons">
        <button onClick={resetGame}>Reiniciar el juego</button>
      </section>

      <WinnerModal onClose={resetGame} winner={winner} />
    </main>
  )
}

export default App
