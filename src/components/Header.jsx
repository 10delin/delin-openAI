import styled from "styled-components";
import iconApp from "../assets/iconApp.png";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background-color: transparent;
  color: white;
  z-index: 3;
`;

const StyledTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
  margin: 0;
  padding: 20px;
`;

const StyledImg = styled.img`
  width: 60px;
  height: 55px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Header = () => {
  return (
    <StyledWrapper>
      <StyledTitle>Delin OpenAI</StyledTitle>
      <StyledImg
        src={iconApp}
        alt="icon"
        onClick={() => window.location.reload()}
      />
      <StyledTitle>Profile</StyledTitle>
    </StyledWrapper>
  );
};
