import React, { useState } from 'react'
import { BoardContainer, ChessboardSquare } from './style'

const Board: React.FC = () => {
  const [clickedSquares, setClickedSquares] = useState<number[][]>([])

  const handleSquareClick = (row: number, col: number) => {
    const isAlreadyClicked = clickedSquares.some(
      ([clickedRow, clickedCol]) => clickedRow === row && clickedCol === col,
    )

    if (isAlreadyClicked) {
      const updatedSquares = clickedSquares.filter(
        ([clickedRow, clickedCol]) => clickedRow !== row || clickedCol !== col,
      )
      setClickedSquares(updatedSquares)
    } else {
      const newSquare = [row, col]
      setClickedSquares([...clickedSquares, newSquare])
    }
  }

  const clearClickedSquares = () => {
    setClickedSquares([])
  }

  const renderBoard = (): JSX.Element[] => {
    const boardSize = 8
    const board: JSX.Element[] = []

    const lightSquareColor = '#ff5686'
    const darkSquareColor = '#303030'

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const isEvenRow = row % 2 === 0
        const isEvenCol = col % 2 === 0
        const squareColor = isEvenRow
          ? isEvenCol
            ? lightSquareColor
            : darkSquareColor
          : isEvenCol
          ? darkSquareColor
          : lightSquareColor

        const isSquareClicked = clickedSquares.some(
          ([clickedRow, clickedCol]) => clickedRow === row && clickedCol === col,
        )
        const rowInitial = String.fromCharCode(65 + row)
        const colInitial = col + 1

        board.push(
          <ChessboardSquare
            key={`${row}-${col}`}
            squareColor={squareColor}
            onClick={() => handleSquareClick(row, col)}
          >
            {isSquareClicked && <div>OK</div>}
            <span>{`${rowInitial}${colInitial}`}</span>
          </ChessboardSquare>,
        )
      }
    }

    return board
  }

  return (
    <>
      <BoardContainer>{renderBoard()}</BoardContainer>

      <button onClick={clearClickedSquares}>Clear</button>
    </>
  )
}

export default Board
