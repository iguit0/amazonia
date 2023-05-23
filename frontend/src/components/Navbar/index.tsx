import React from 'react'
import { Container, UserCredentials, Wrapper } from './style'
import ProjectLogo from '../../assets/images/amazonia_logo.png'
import PartnerLogo from '../../assets/images/partner_logo.png'

export function Navbar() {
  return (
    <Wrapper>
      <Container>
        <img src={ProjectLogo} alt='Amazonia logo' width={120} />
        <UserCredentials>
          <img
            src={PartnerLogo}
            alt='Partner logo'
            width={120}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </UserCredentials>
      </Container>
    </Wrapper>
  )
}
