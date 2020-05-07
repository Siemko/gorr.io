import "reset-css";
import {createGlobalStyle} from "styled-components";
import {openSans} from "./fonts";

const GlobalStyles = createGlobalStyle`
  ${openSans};

  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

export default GlobalStyles;
