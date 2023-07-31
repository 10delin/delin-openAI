import useLLM from "usellm";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Chat } from "./Chat";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  background-color: #353535;
  color: white;
  border-radius: 20px;
  margin: 25px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 5px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #ffac00;
    }
  }
`;
const StyledWrapperForm = styled.form`
  position: sticky;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px;
  padding-bottom: 30px;
  background-color: #353535;
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  border: 1px solid white;
  outline: none;
  font-size: 1rem;

  &:focus {
    border: 1px solid #ffac00;
  }

  &::placeholder {
    color: #b3b3b3;
  }
`;

const StyledSendButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  outline: none;
  background-color: #3b3b3b;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  padding: none;
  cursor: pointer;
`;

export const ChatContainer = ({
  history,
  setHistory,
  inputRef,
  setStorageItem,
}) => {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });

  const saveDataInLocalStorage = (e) => {
    e.preventDefault();

    const previousChat = localStorage.getItem("chat");
    const chatArray = previousChat ? JSON.parse(previousChat) : [];
    const updatedChat = JSON.stringify([...chatArray, [...history]]);
    setStorageItem(updatedChat);
    localStorage.setItem("chat", updatedChat);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value;
    if (!userMessage) return;
    userMessage && (inputRef.current.value = "");
    try {
      const newHistory = [...history, { role: "user", content: userMessage }];
      setHistory(newHistory);
      const { message } = await llm.chat({
        messages: newHistory,
        stream: true,
        onStream: ({ message }) => setHistory([...newHistory, message]),
      });
      setHistory([...newHistory, message]);
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong! " + error.message);
    }
  };

  return (
    <StyledWrapper onSubmit={handleClick}>
      <Chat history={history} />
      <StyledWrapperForm>
        <InputContainer>
          <StyledInput
            type="text"
            ref={inputRef}
            placeholder="Introduce una petición aquí"
          />
          <StyledSendButton onClick={handleClick}>➡</StyledSendButton>
          <button onClick={saveDataInLocalStorage}>💾</button>
        </InputContainer>
      </StyledWrapperForm>
    </StyledWrapper>
  );
};

ChatContainer.propTypes = {
  history: PropTypes.array.isRequired,
  setHistory: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
  setStorageItem: PropTypes.func.isRequired,
};
