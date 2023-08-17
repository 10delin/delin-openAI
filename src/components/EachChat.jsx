import PropTypes from "prop-types";
import styled from "styled-components";
import IconApp from "../assets/iconApp.png";
import { Spinner } from "./Spinner";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 20px;
  padding: 15px;
  background-color: #242424
    ${({ $roleAI }) => $roleAI && `background-color: #353535;`};

  @media (max-width: 980px) {
    gap: 10px;
  }
`;

const StyledRole = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
  text-align: left;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
`;

const StyledContent = styled.div`
  width: 100%;
  text-align: left;
  transition: all 0.3s ease-in-out;
`;

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  transition: all 0.3s ease-in-out;

  @keyframes breathe {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }

  animation: ${({ $loading }) =>
    $loading ? `breathe 2s linear infinite` : `none`};

  @media (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
`;

export const EachChat = ({ chatEntry, loading }) => {
  return (
    <StyledWrapper $roleAI={chatEntry.role === "user"}>
      <StyledRole>
        {chatEntry.role === "user" ? (
          "You: "
        ) : (
          <StyledImage $loading={loading} src={IconApp} alt="icon" />
        )}
      </StyledRole>

      {loading ? (
        <Spinner />
      ) : (
        <StyledContent>{chatEntry.content}</StyledContent>
      )}
    </StyledWrapper>
  );
};

EachChat.propTypes = {
  chatEntry: PropTypes.shape({
    role: PropTypes.string,
    content: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
};
