import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import Board from '../../components/Board'
import { ButtonGrid, Button, PageWrapper, HeaderText } from './style'
import styled from 'styled-components'
import { GiDeliveryDrone } from 'react-icons/gi'
import { IoIosHome } from 'react-icons/io'
import { FiPackage } from 'react-icons/fi'
import { isEqual, parsePosition } from '../../utils/parsers'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { FaRoute, FaFlagCheckered } from 'react-icons/fa'
import { VscClearAll } from 'react-icons/vsc'
import { BiPaint } from 'react-icons/bi'

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
`

const Instructions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const InstructionText = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

export function Home() {
  const [origin, setOrigin] = useState<number[]>([])
  const [pickupObject, setPickupObject] = useState<number[]>([])
  const [destination, setDestination] = useState<number[]>([])

  const handleSquareClick = (row: number, col: number) => {
    if (origin.length === 0) {
      setOrigin([row, col])
      return
    }
    if (pickupObject.length === 0 && !isEqual([row, col], origin)) {
      setPickupObject([row, col])
      return
    }
    if (
      destination.length === 0 &&
      !isEqual([row, col], origin) &&
      !isEqual([row, col], pickupObject)
    ) {
      setDestination([row, col])
    }
  }

  const getSquareType = (row: number, col: number): string => {
    if (isEqual([row, col], origin)) {
      return 'origin'
    } else if (isEqual([row, col], pickupObject)) {
      return 'pickup'
    } else if (isEqual([row, col], destination)) {
      return 'destination'
    }
    return ''
  }

  const clearRoute = () => {
    setOrigin([])
    setPickupObject([])
    setDestination([])
  }

  const routeFullfilled = origin.length > 0 && pickupObject.length > 0 && destination.length > 0

  return (
    <PageWrapper>
      <Navbar />
      <HeaderText>
        {routeFullfilled ? (
          <>
            <FaFlagCheckered style={{ marginRight: '8px' }} /> Have a nice trip!
          </>
        ) : (
          <>
            <FaRoute style={{ marginRight: '8px' }} /> Provide your delivery route
          </>
        )}
      </HeaderText>

      {origin.length === 0 && (
        <InstructionText>
          <BsFillInfoCircleFill style={{ marginRight: '4px' }} /> Pick a <strong>origin</strong>,{' '}
          <strong>pickup</strong> and <strong>destination</strong> in the board.
        </InstructionText>
      )}

      <ContentWrapper>
        <Instructions>
          {origin.length > 0 && (
            <InstructionText>
              <GiDeliveryDrone size='25px' /> Origin: <strong>{parsePosition(origin)}</strong>
            </InstructionText>
          )}
          {pickupObject.length > 0 && (
            <InstructionText>
              <FiPackage size='25px' /> Pickup: <strong>{parsePosition(pickupObject)}</strong>
            </InstructionText>
          )}
          {destination.length > 0 && (
            <InstructionText>
              <IoIosHome size='25px' /> Destination: <strong>{parsePosition(destination)}</strong>
            </InstructionText>
          )}
        </Instructions>
      </ContentWrapper>

      <Board
        onClickSquare={handleSquareClick}
        getSelectedType={getSquareType}
        allSelected={routeFullfilled}
      />

      <ButtonGrid>
        <Button onClick={clearRoute} disabled={!routeFullfilled}>
          <VscClearAll style={{ marginRight: '8px' }} />
          Clear delivery route
        </Button>
        <Button disabled>
          <BiPaint style={{ marginRight: '4px' }} /> Change board theme
        </Button>
      </ButtonGrid>
    </PageWrapper>
  )
}
