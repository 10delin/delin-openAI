import { styled } from "styled-components";

export const StyledWrapper = styled.div`
  position: relative;
  box-sizing: border-box;

  ${({ $sideNavVisible }) =>
    $sideNavVisible
      ? `
      visibility: visible;
      width: 25%;
      transform: translate3d(0, 0, 0);
      transition: transform 0.3s ease-in-out;
      `
      : `
      transform: translate3d(-100%, 0, 0);
      width: 0;
      visibility: hidden;
      transition: transform 0.3s ease-in-out;
      `}

  @media (max-width: 980px) {
    position: fixed;
    top: 70px;
    left: 0;
    height: 100vh;
    z-index: 1;
    background-color: #1e1e1e;

    ${({ $sideNavVisible }) =>
      $sideNavVisible
        ? `
        width: 100%;
        `
        : `
        width: 0;
        `}
  }
`;

export const StyledContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1rem;
  padding-top: 0;
  gap: 3rem;
  z-index: 2;
  scrollbar-width: none;
  overflow-y: scroll;
  height: calc(100vh - 110px);
  width: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 5px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #ffffff;
    }
  }

  @media (max-width: 980px) {
    left: 5px;
    padding: 30px 0;
  }
`;

export const StyledHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2rem;
  padding: 5px 10px;
`;

export const StyledChatsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  padding: 0;

  @media (max-width: 980px) {
    font-size: 16px;
  }
`;

export const StyledButtonChat = styled.button`
  position: relative;
  border: 2px solid #3d3d3d;
`;
