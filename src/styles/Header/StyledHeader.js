import styled from "styled-components";

export const StyledWrapper = styled.div`
  position: absolute;
  top: 5px;
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

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

export const StyledTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
  margin: 0;
  padding: 15px;
`;

export const StyledImg = styled.img`
  width: 60px;
  height: 55px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledButton = styled.button`
  height: 5px;
  width: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background-color: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 2px solid transparent;
    background-color: #535353;
  }

  &:active {
    background-color: transparent;
  }
`;

export const StyledContentUser = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 20px;
`;
