import React, { memo } from 'react'
import { BoardContainer, ChessboardSquare } from './style'
import { GiDeliveryDrone } from 'react-icons/gi'
import { FiPackage } from 'react-icons/fi'
import { IoIosHome } from 'react-icons/io'
import { parsePosition } from '../../utils/parsers'

type BoardProps = {
  onClickSquare: (row: number, col: number) => void
  getSelectedType: (row: number, col: number) => string
  allSelected: boolean
}

const Board: React.FC<BoardProps> = ({ allSelected, getSelectedType, onClickSquare }) => {
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

        board.push(
          <ChessboardSquare
            key={`${row}-${col}`}
            data-testid='chessboard-square'
            squareColor={squareColor}
            onClick={() => onClickSquare(row, col)}
            disabled={allSelected}
          >
            {getSelectedType(row, col) === 'origin' && (
              <GiDeliveryDrone
                data-testid='drone-icon'
                size='28px'
                color={squareColor === '#303030' ? 'white' : 'black'}
              />
            )}

            {getSelectedType(row, col) === 'pickup' && (
              <FiPackage
                data-testid='package-icon'
                size='28px'
                color={squareColor === '#303030' ? 'white' : 'black'}
              />
            )}

            {getSelectedType(row, col) === 'destination' && (
              <IoIosHome
                data-testid='home-icon'
                size='28px'
                color={squareColor === '#303030' ? 'white' : 'black'}
              />
            )}

            {!allSelected && getSelectedType(row, col) === '' ? (
              <span style={{ fontSize: '14px', opacity: '60%', color: 'whitesmoke' }}>
                {parsePosition([row, col])}
              </span>
            ) : null}
          </ChessboardSquare>,
        )
      }
    }

    return board
  }

  return <BoardContainer>{renderBoard()}</BoardContainer>
}

export default memo(Board)
