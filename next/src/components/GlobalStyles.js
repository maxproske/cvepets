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
    font-family: Arial;
  }

  body {
    margin: 0;
    color: white;
    background-color: #00bcd4;
    background-image: url('/img/game/background/tile.png');
    background-repeat: repeat;
    background-position: 0 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    height: 100%;
  }
`
