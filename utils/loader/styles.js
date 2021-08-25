import styled, { keyframes } from "styled-components";

const blink = keyframes`
0% {
    opacity: .2;
}

20% {
    opacity: 1;
}

100% {
    opacity: .2;
}

`;

export const Animation = styled.div`
  text-align: center;

  span {
    color: brown;
    display: inline-block;
    margin-left: 4px;
    margin-right: 4px;
    font-size: 80px;
    line-height: 0.1;
    animation-name: ${blink};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
