import styled from 'styled-components'

export const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  box-sizing: border-box;
  outline: 1px solid #333;
`

export const ChessboardSquare = styled.div<{ squareColor: string }>`
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.squareColor};

  :hover {
    cursor: pointer;
    border: 1px solid #fffafa;
  }
`
