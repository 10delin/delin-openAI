import styled from "styled-components";

export const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 24px;
  gap: 1rem;
  padding: 5px 10px;

  ${({ $isActive }) => $isActive && `background-color: #ffac00;`}
`;

export const StyledButton = styled.button`
  height: 5px;
  width: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-weight: 600;

  &:hover {
    border: none;
  }

  &:active {
    background-color: transparent;
  }

  &:focus {
    outline: none;
    border: none;
  }

  ${({ $isActive }) => $isActive && `color: #000000;`}
`;

export const StyledText = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  @media (max-width: 980px) {
    font-size: 16px;
  }
`;
