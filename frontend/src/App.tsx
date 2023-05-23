import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { GlobalStyle } from './styles/globalStyle'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  )
}

export default App
