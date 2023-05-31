import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Board from '.'

describe('Board Component', () => {
  const mockOnClickSquare = jest.fn()
  const mockGetSelectedType = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it.only('should render the chessboard with correct number of squares and icons', async () => {
    // Mock implementation of getSelectedType
    mockGetSelectedType.mockImplementation((row, col) => {
      if (row === 0 && col === 0) {
        return 'origin'
      } else if (row === 1 && col === 1) {
        return 'pickup'
      } else if (row === 2 && col === 2) {
        return 'destination'
      } else {
        return ''
      }
    })

    const { getAllByTestId, findByTestId } = render(
      <Board
        onClickSquare={mockOnClickSquare}
        getSelectedType={mockGetSelectedType}
        allSelected={false}
      />,
    )

    // Verify the number of squares rendered
    const squares = getAllByTestId('chessboard-square')
    expect(squares.length).toBe(64)

    // Verify the presence of specific icons
    const droneIcon = await findByTestId('drone-icon')
    const packageIcon = await findByTestId('package-icon')
    const homeIcon = await findByTestId('home-icon')

    expect(droneIcon).toBeInTheDocument()
    expect(packageIcon).toBeInTheDocument()
    expect(homeIcon).toBeInTheDocument()
  })

  it('should handle square click correctly', () => {
    const { getAllByTestId } = render(
      <Board
        onClickSquare={mockOnClickSquare}
        getSelectedType={mockGetSelectedType}
        allSelected={false}
      />,
    )

    const squares = getAllByTestId('chessboard-square')

    // Simulate a click on a square
    fireEvent.click(squares[0])

    // Verify that the onClickSquare function is called with the correct row and column
    expect(mockOnClickSquare).toHaveBeenCalledWith(0, 0)
  })

  it('should disable squares when allSelected is true', () => {
    const { getAllByTestId } = render(
      <Board
        onClickSquare={mockOnClickSquare}
        getSelectedType={mockGetSelectedType}
        allSelected={true}
      />,
    )

    const squares = getAllByTestId('chessboard-square')

    // Verify that all squares are disabled
    squares.forEach((square) => {
      expect(square).toBeDisabled()
    })
  })
})
