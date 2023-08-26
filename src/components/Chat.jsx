import PropTypes from "prop-types";
import { EachChat } from "./EachChat";
import IconApp from "../assets/iconApp.png";
import { DEFAULT_CHAT_ENTRY, DEFAULT_CHAT_LINKS } from "../utils/model";

import {
  StyledWrapper,
  StyledContent,
  StyledImage,
  StyledText,
} from "../styles/Chat/StyledChat";

export const Chat = ({ history, loading, setDefaultInput }) => {
  const handleInput = (e) => {
    setDefaultInput(e.target.innerText);
  };

  return (
    <StyledWrapper>
      {history?.map((chatEntry, index) => (
        <EachChat
          key={index}
          chatEntry={chatEntry}
          loading={loading && index === history.length - 1}
        />
      ))}
      {history.length === 0 ? (
        <StyledContent>
          <StyledImage src={IconApp} alt="icon" />
          <StyledText>
            <p>{DEFAULT_CHAT_ENTRY}</p>
            {DEFAULT_CHAT_LINKS.map((link, index) => (
              <p key={index}>
                <a onClick={handleInput}>{link}</a>
              </p>
            ))}
          </StyledText>
        </StyledContent>
      ) : null}
    </StyledWrapper>
  );
};

Chat.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  loading: PropTypes.bool.isRequired,
  setDefaultInput: PropTypes.func.isRequired,
};
