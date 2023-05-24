import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; */

  background-color: #b1bfd8;
  background-image: linear-gradient(315deg, #b1bfd8 0%, #6782b4 74%);
`

export const HeaderText = styled.h1`
  font-size: 2rem;
`

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem 1rem;
`

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`
