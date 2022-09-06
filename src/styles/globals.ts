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

  .card {
    border-radius: 5px;
    border: thin solid ${colors.gray};
    padding: 2rem;
    position: relative;
    text-align: center;
  }

  /* ****** Grid ****** */
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-evenly;
  }

  .col-1 {
    width: 8.333333333333333%;
  }

  .col-2 {
    width: 16.66666666666667%;
  }

  .col-3 {
    width: 23%;
  }

  .col-4 {
    width: 31%;
  }

  .col-5 {
    width: 41.66666666666667%;
  }

  .col-6 {
    width: 48%;
  }

  .col-7 {
    width: 58.33333333333333%;
  }

  .col-8 {
    width: 66.66666666666667%;
  }

  .col-9 {
    width: 75%;
  }

  .col-10 {
    width: 83.33333333333333%;
  }

  .col-11 {
    width: 91.66666666666667%;
  }

  .col-12 {
    width: 100%;
  }

  @media screen and (min-width: ${breakPoints.sm}) {
    .col-sm-1 {
      width: 8.333333333333333%;
    }

    .col-sm-2 {
      width: 16.66666666666667%;
    }

    .col-sm-3 {
      width: 23%;
    }

    .col-sm-4 {
      width: 31%;
    }

    .col-sm-5 {
      width: 41.66666666666667%;
    }

    .col-sm-6 {
      width: 48%;
    }

    .col-sm-7 {
      width: 58.33333333333333%;
    }

    .col-sm-8 {
      width: 66.66666666666667%;
    }

    .col-sm-9 {
      width: 75%;
    }

    .col-sm-10 {
      width: 83.33333333333333%;
    }

    .col-sm-11 {
      width: 91.66666666666667%;
    }

    .col-sm-12 {
      width: 100%;
    }
  }

  @media screen and (min-width: ${breakPoints.md}) {
    .col-md-1 {
      width: 8.333333333333333%;
    }

    .col-md-2 {
      width: 16.66666666666667%;
    }

    .col-md-3 {
      width: 23%;
    }

    .col-md-4 {
      width: 31%;
    }

    .col-md-5 {
      width: 41.66666666666667%;
    }

    .col-md-6 {
      width: 48%;
    }

    .col-md-7 {
      width: 58.33333333333333%;
    }

    .col-md-8 {
      width: 66.66666666666667%;
    }

    .col-md-9 {
      width: 75%;
    }

    .col-md-10 {
      width: 83.33333333333333%;
    }

    .col-md-11 {
      width: 91.66666666666667%;
    }

    .col-md-12 {
      width: 100%;
    }
  }

  @media screen and (min-width: ${breakPoints.lg}) {
    .col-lg-1 {
      width: 8.333333333333333%;
    }

    .col-lg-2 {
      width: 16.66666666666667%;
    }

    .col-lg-3 {
      width: 23%;
    }

    .col-lg-4 {
      width: 31%;
    }

    .col-lg-5 {
      width: 41.66666666666667%;
    }

    .col-lg-6 {
      width: 48%;
    }

    .col-lg-7 {
      width: 58.33333333333333%;
    }

    .col-lg-8 {
      width: 66.66666666666667%;
    }

    .col-lg-9 {
      width: 75%;
    }

    .col-lg-10 {
      width: 83.33333333333333%;
    }

    .col-lg-11 {
      width: 91.66666666666667%;
    }

    .col-lg-12 {
      width: 100%;
    }
  }

  @media screen and (min-width: ${breakPoints.xl}) {
    .col-xl-1 {
      width: 8.333333333333333%;
    }

    .col-xl-2 {
      width: 16.66666666666667%;
    }

    .col-xl-3 {
      width: 23%;
    }

    .col-xl-4 {
      width: 31%;
    }

    .col-xl-5 {
      width: 41.66666666666667%;
    }

    .col-xl-6 {
      width: 48%;
    }

    .col-xl-7 {
      width: 58.33333333333333%;
    }

    .col-xl-8 {
      width: 66.66666666666667%;
    }

    .col-xl-9 {
      width: 75%;
    }

    .col-xl-10 {
      width: 83.33333333333333%;
    }

    .col-xl-11 {
      width: 91.66666666666667%;
    }

    .col-xl-12 {
      width: 100%;
    }
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
    justify-content: center;
    text-align: center;
    text-decoration: none;
  }

  @media (min-width: ${breakPoints.md}) {
    .logo {
      font-size: 2rem;
    }
  }
`;
