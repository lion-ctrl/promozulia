import css from "styled-jsx/css";
import { breakPoints, colors, fluidFontSizes, fonts } from "./variables";
import { addOpacity } from "./utils";

export default css.global`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap");

  /* ! ****** Reset ****** */
  html {
    box-sizing: border-box;
    font-family: ${fonts.font1};
    font-size: 16px;
    scroll-behavior: smooth;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body {
    color: ${colors.color3};
    margin: 0;
    overflow-x: hidden;
  }

  a {
    color: ${colors.color2};
    transition: all 0.5s ease-out;
    text-decoration: none;
  }

  a:hover {
    opacity: 0.75;
  }

  h1 {
    margin: 0;
    font-size: ${fluidFontSizes.h1};
  }

  h2 {
    margin: 0;
    font-size: ${fluidFontSizes.h2};
  }

  h3 {
    margin: 0;
    font-size: ${fluidFontSizes.h3};
  }

  h4 {
    margin: 0;
    font-size: ${fluidFontSizes.h4};
  }

  h5 {
    margin: 0;
    font-size: ${fluidFontSizes.h5};
  }

  h6 {
    margin: 0;
    font-size: ${fluidFontSizes.h6};
  }

  img,
  svg {
    max-width: 100%;
    height: auto;
  }

  p {
    font-size: ${fluidFontSizes.p};
    font-weight: 400;
    line-height: 1.2;
  }

  blockquote {
    margin: 0;
  }

  @media (min-width: ${breakPoints.md}) {
    body {
      padding-bottom: 0;
    }
  }

  /* ! ****** Animations ****** */

  .fade-in-down {
    animation: fade-in-down-automatic-animation 1s ease-in-out forwards;
  }

  .fade-out-down {
    animation: fade-out-down-automatic-animation 1s ease-in-out forwards;
  }

  /* *** fade-in-down-automatic-animation *** */
  @keyframes fade-in-down-automatic-animation {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  /* *** fade-out-down-automatic-animation *** */
  @keyframes fade-out-down-automatic-animation {
    from {
      opacity: 1;
      transform: translateY(0%);
    }
    to {
      opacity: 0;
      transform: translateY(50%);
    }
  }

  /* ! ****** components ****** */
  /* --- banner --- */
  .banner {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .banner > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    justify-content: center;
  }

  /* --- button --- */
  .button {
    background-color: ${colors.color1};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: ${colors.white};
    font-family: ${fonts.font1};
    font-weight: bold;
    outline: none;
    padding: 1rem;
    transition: all 0.5s ease-in-out;
  }

  .button:hover {
    background-color: ${addOpacity({ color: colors.color1, opacity: 0.8 })};
    opacity: 1;
  }

  /* --- card --- */
  .card {
    border-radius: 5px;
    border: thin solid ${colors.gray};
    padding: 2rem;
    position: relative;
    text-align: center;
  }

  /* ****** Utilities ****** */
  .box-shadow {
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%),
      0 5px 12px 4px rgb(0 0 0 / 9%);
  }

  .container {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    width: 90%;
  }

  .reverse {
    flex-direction: row-reverse;
  }

  @media (min-width: ${breakPoints.md}) {
    .md-reverse {
      flex-direction: row-reverse !important;
    }
  }

  /* ! ****** Site Styles ****** */
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${colors.gray};
  }

  .logo {
    align-items: center;
    color: ${colors.white};
    display: flex;
    font-size: 1rem;
    font-weight: bold;
    height: 3.75rem;
    justify-content: center;
    position: relative;
    text-align: center;
    text-decoration: none;
    width: 9.375rem;
  }

  @media (min-width: ${breakPoints.md}) {
    .logo {
      font-size: 2rem;
      height: 4.375rem;
    }
  }
`;
