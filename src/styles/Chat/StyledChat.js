import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background-color: #353535;
  color: white;
  border-radius: 20px;
  white-space: pre-wrap;
  margin: 25px;
`;

export const StyledContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 20px;
  padding: 15px;
  background-color: #242424;
  font-weight: 400;

  @media (max-width: 980px) {
    gap: 5px;
    padding: 10px;
  }
`;

export const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledText = styled.div`
  width: 100%;
  text-align: left;
  transition: all 0.3s ease-in-out;
  font-weight: 400;

  a {
    color: #ffac00;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }

  p:first-child {
    margin-bottom: 30px;
  }

  a:hover {
    text-decoration: underline;
  }
`;
