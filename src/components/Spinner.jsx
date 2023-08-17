import PropTypes from "prop-types";

import {
  StyledWrapper,
  StyledClipLoader,
} from "../styles/Spinner/StyledSpinner";

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
