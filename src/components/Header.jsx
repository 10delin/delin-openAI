import styled from "styled-components";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  background-color: #3d3d3d;
  color: white;
  z-index: 3;
`;

export const Header = () => {
  return (
    <StyledWrapper>
      <h4>Header</h4>
    </StyledWrapper>
  );
};
