import PropTypes from "prop-types";
import styled from "styled-components";
import { useWindowSize } from "../hooks/useWindowSize";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 24px;
  gap: 1rem;
  padding: 5px 10px;

  ${({ $isActive }) => $isActive && `background-color: #ffac00;`}
`;

const StyledButton = styled.button`
  height: 5px;
  width: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-weight: 600;

  &:hover {
    border: none;
  }

  &:active {
    background-color: transparent;
  }

  &:focus {
    outline: none;
    border: none;
  }

  ${({ $isActive }) => $isActive && `color: #000000;`}
`;

const StyledText = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  @media (max-width: 980px) {
    font-size: 16px;
  }
`;

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
