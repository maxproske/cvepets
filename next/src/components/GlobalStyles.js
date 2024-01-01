import { createGlobalStyle } from 'styled-components'
import { Normalize } from './Normalize'

export const GlobalStyles = createGlobalStyle`
  ${Normalize}

  * {
    /* Include padding and border in all elements' total width and height. */
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
    font-family: Roboto, Arial, sans-serif;
  }

  body {
    margin: 0;
    color: white;
    background-color: #00bcd4;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`
