import useLLM from "usellm";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Chat } from "./Chat";
import { useState } from "react";

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
      background: #ffffff;
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
  align-items: center;
  background-color: #353535;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px 15px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 25px;
  border: 1px solid #ffffff;
  font-size: 1rem;
  overflow-wrap: break-word;
  word-break: break-all;

  &:focus-within {
    border: 1px solid #ffac00;
  }
`;

const StyledInput = styled.input`
  position: relative;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: transparent;
  width: 85%;
  padding: 15px;
  border-radius: 25px;

  &::placeholder {
    color: #b3b3b3;
  }
`;

const StyledSendButton = styled.button`
  position: absolute;
  right: 25px;
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
  const [status, setStatus] = useState("idle");

  const placeHolderText =
    status === "streaming"
      ? "Espera a mi respuesta..."
      : "Introduce una petición aquí";

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
      setHistory([...newHistory, []]);
      setStatus("streaming");
      const { message } = await llm.chat({
        messages: newHistory,
        stream: true,
        onStream: ({ message }) => {
          setStatus("idle");
          setHistory([...newHistory, message]);
        },
      });
      setHistory([...newHistory, message]);
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong! " + error.message);
    }
  };

  return (
    <StyledWrapper onSubmit={handleClick}>
      <Chat history={history} loading={status === "streaming"} />
      <StyledWrapperForm>
        <InputContainer>
          <StyledInputWrapper>
            <StyledInput
              type="text"
              ref={inputRef}
              placeholder={placeHolderText}
              disabled={status === "streaming"}
            />
          </StyledInputWrapper>
          <StyledSendButton onClick={handleClick}>➡</StyledSendButton>
        </InputContainer>
        <button onClick={saveDataInLocalStorage}>💾</button>
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
