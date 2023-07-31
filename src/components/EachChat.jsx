import PropTypes from "prop-types";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  border-radius: 20px;
  padding: 15px;

  ${({ $roleAI }) => $roleAI && `background-color: #242424;`}
`;

const StyledRole = styled.div``;

const StyledContent = styled.div``;

export const EachChat = ({ chatEntry }) => {
  return (
    <StyledWrapper $roleAI={chatEntry.role === "assistant"}>
      <StyledRole>{chatEntry.role === "user" ? "You: " : "AI: "}</StyledRole>
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
