import React from 'react'
import Board from '../../components/Board'
import { PageWrapper } from './style'
import { Navbar } from '../../components/Navbar'

export function Home() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Board />
      </PageWrapper>
    </>
  )
}
