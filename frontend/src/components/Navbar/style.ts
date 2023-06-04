import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`

export const UserCredentials = styled.div`
  display: flex;
  margin-left: 50px;
  align-items: center;
`

export const PartnerImg = styled.img`
  filter: brightness(0) invert(1);
  cursor: pointer;
`

export const Wrapper = styled.header`
  background-color: transparent;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 4rem;

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
