import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledClipLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const IsLoaded = ({ isLoaded }) => {
  return (
    <>
      {!isLoaded && (
        <StyledClipLoader>
          <ClipLoader color="white" />
        </StyledClipLoader>
      )}
    </>
  );
};

IsLoaded.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};
