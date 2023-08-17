import iconApp from "../assets/iconApp.png";
import PropTypes from "prop-types";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  StyledWrapper,
  StyledButtonWrapper,
  StyledButton,
  StyledTitle,
  StyledImg,
  StyledContentUser,
} from "../styles/Header/StyledHeader";

export const Header = ({ setSideNavVisible }) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavVisible((prev) => !prev);
  };

  return (
    <StyledWrapper>
      <StyledButtonWrapper>
        <StyledButton onClick={toggleSideNav}> ☰ </StyledButton>
        <StyledTitle>Delin OpenAI</StyledTitle>
      </StyledButtonWrapper>
      <StyledImg
        src={iconApp}
        alt="icon"
        onClick={() => window.location.reload()}
      />
      <StyledContentUser>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button onClick={() => navigate("/sign-in")}>Sign In</button>
        )}
      </StyledContentUser>
    </StyledWrapper>
  );
};

Header.propTypes = {
  setSideNavVisible: PropTypes.func.isRequired,
};
