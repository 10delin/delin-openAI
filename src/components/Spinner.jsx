import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const StyledClipLoader = styled(ClipLoader)`
  border-color: rgb(255 255 255) rgb(255 255 255) transparent !important;
`;

export const Spinner = () => {
  return (
    <StyledWrapper>
      <StyledClipLoader />
    </StyledWrapper>
  );
};

Spinner.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};
