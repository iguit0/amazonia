import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Epilogue', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 0;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`
