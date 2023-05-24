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
      <HeaderText>Select your route</HeaderText>

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
        <Button onClick={clearRoute}>Clear route</Button>
        <Button disabled>Change board theme</Button>
      </ButtonGrid>
    </PageWrapper>
  )
}
