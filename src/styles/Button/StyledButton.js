import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#ffac00" : "black")};
  border: 2px solid #474747;
`;
