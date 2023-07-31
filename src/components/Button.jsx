import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#ffac00" : "black")};
  border: 2px solid #474747;
`;

export const Button = ({
  setHistory,
  index,
  text,
  isActive,
  handleButtonClick,
}) => {
  const loadChatFromLocalStorage = (index) => {
    const chat = localStorage.getItem("chat");
    const chatArray = chat ? JSON.parse(chat) : [];
    setHistory(chatArray[index]);
    handleButtonClick(index);
  };

  const deleteChat = () => {
    const chat = localStorage.getItem("chat");
    const chatArray = chat ? JSON.parse(chat) : [];
    const updatedChatArray = chatArray.filter((_, idx) => idx !== index);
    const updatedChat = JSON.stringify(updatedChatArray);
    localStorage.setItem("chat", updatedChat);
    // setStorageItem[updatedChat];
    window.location.reload();
  };

  return (
    <StyledButton
      onClick={() => loadChatFromLocalStorage(index)}
      isActive={isActive}
    >
      {text} <br />{" "}
      <button onClick={deleteChat} style={{ color: "white" }}>
        Delete
      </button>
    </StyledButton>
  );
};

Button.propTypes = {
  setHistory: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};
