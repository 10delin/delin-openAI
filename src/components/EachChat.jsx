import PropTypes from "prop-types";
import styled from "styled-components";
import IconApp from "../assets/iconApp.png";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 20px;
  padding: 15px;

  ${({ $roleAI }) => $roleAI && `background-color: #242424;`}
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

  &:hover {
    transform: scale(1.1);
  }
`;

export const EachChat = ({ chatEntry }) => {
  return (
    <StyledWrapper $roleAI={chatEntry.role === "assistant"}>
      <StyledRole>
        {chatEntry.role === "user" ? (
          "You: "
        ) : (
          <StyledImage src={IconApp} alt="icon" />
        )}
      </StyledRole>
      <StyledContent> {chatEntry.content}</StyledContent>
    </StyledWrapper>
  );
};

EachChat.propTypes = {
  chatEntry: PropTypes.shape({
    role: PropTypes.string,
    content: PropTypes.string,
  }),
};