import { Container, PartnerImg, UserCredentials, Wrapper } from './style'
import ProjectLogo from '../../assets/images/amazonia_logo.png'
import PartnerLogo from '../../assets/images/partner_logo.png'

export function Navbar() {
  const isDesktopView = window.innerWidth >= 768

  return (
    <Wrapper>
      <Container>
        <img src={ProjectLogo} alt='Amazonia logo' width={120} />
        {isDesktopView && (
          <UserCredentials>
            <PartnerImg
              src={PartnerLogo}
              alt='Partner logo'
              width={120}
              onClick={() => window.open('https://ateliware.com/', '_blank', 'noopener noreferrer')}
            />
          </UserCredentials>
        )}
      </Container>
    </Wrapper>
  )
}
