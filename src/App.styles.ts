import styled from 'styled-components/macro';

export const LoadingWrapper = styled.div`
  position: relative;
  width: calc(100vw - 16px);
  height: calc(100vh - 16px);

  @keyframes glow {
    0% {
      opacity: 1;
    }

    to {
      opacity: 0.1;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 240px;
    height: 122px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    animation: glow 2s ease-in-out infinite alternate;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
`;
