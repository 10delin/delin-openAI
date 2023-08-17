import PropTypes from "prop-types";
import { useWindowSize } from "../hooks/useWindowSize";
import {
  StyledWrapper,
  StyledText,
  StyledButton,
} from "../styles/PastChat/StyledPastChat";

export const PastChat = ({
  setHistory,
  index,
  text,
  isActive,
  handleButtonClick,
  setSideNavVisible,
}) => {
  const { width } = useWindowSize();

  const loadChatFromLocalStorage = (index) => {
    const chat = localStorage.getItem("chat");
    const chatArray = chat ? JSON.parse(chat) : [];
    setHistory(chatArray[index]);
    handleButtonClick(index);
    if (width < 980) setSideNavVisible(false);
  };

  const deleteChat = () => {
    const chat = localStorage.getItem("chat");
    const chatArray = chat ? JSON.parse(chat) : [];
    const updatedChatArray = chatArray.filter((_, idx) => idx !== index);
    const updatedChat = JSON.stringify(updatedChatArray);
    localStorage.setItem("chat", updatedChat);
    window.location.reload();
  };

  return (
    <StyledWrapper
      onClick={() => loadChatFromLocalStorage(index)}
      $isActive={isActive}
    >
      💬
      <StyledText>{text}</StyledText>
      <StyledButton onClick={deleteChat} $isActive={isActive}>
        🗑
      </StyledButton>
    </StyledWrapper>
  );
};

PastChat.propTypes = {
  setHistory: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  setSideNavVisible: PropTypes.func.isRequired,
};
