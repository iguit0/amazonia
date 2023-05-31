import { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import Board from '../../components/Board'
import {
  ButtonGrid,
  Button,
  PageWrapper,
  HeaderText,
  InstructionText,
  ContentWrapper,
  Instructions,
} from './style'
import { GiDeliveryDrone } from 'react-icons/gi'
import { IoIosHome } from 'react-icons/io'
import { FiPackage } from 'react-icons/fi'
import { VscClearAll } from 'react-icons/vsc'
import { BiPaint } from 'react-icons/bi'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { FaRoute, FaFlagCheckered } from 'react-icons/fa'
import { isEqual, parsePosition } from '../../utils/parsers'

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

  const isRouteFulfilled = origin.length > 0 && pickupObject.length > 0 && destination.length > 0

  return (
    <PageWrapper>
      <Navbar />
      <HeaderText>
        {isRouteFulfilled ? (
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
        allSelected={isRouteFulfilled}
      />

      <ButtonGrid>
        <Button onClick={clearRoute} disabled={!isRouteFulfilled}>
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
