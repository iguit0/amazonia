import styled from 'styled-components'

export const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  outline: 1px solid #333;
`

export const ChessboardSquare = styled.div<{ squareColor: string; disabled: boolean }>`
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.squareColor};
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    border: 2px solid #fffafa;
  }
`
