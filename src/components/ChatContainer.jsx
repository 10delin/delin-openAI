import useLLM from "usellm";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Chat } from "./Chat";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";

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
  margin-top: 0;
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

  ${({ $loading }) =>
    $loading &&
    `animation:pulse 1s infinite;
     border: 1px solid #ffac00;
    `}

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 230, 0, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 172, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 172, 0, 0);
    }
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
    ${({ $loading }) => ($loading ? `color: #e99d0f; : ` : `color: #b3b3b3;`)}
  }
`;

const StyledSendButton = styled.button`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  outline: none;
  background-color: #353535;
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
  const { user } = useUser();

  const placeHolderText =
    status === "streaming"
      ? "Espera a mi respuesta..."
      : "Introduce una petición aquí";

  const handleClick = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value;
    if (!userMessage) return;

    userMessage && (inputRef.current.value = "");

    console.log(user?.primaryEmailAddress.emailAddress);

    try {
      const messageId = uuidv4();
      const newHistory = [
        ...history,
        {
          user: user?.primaryEmailAddress.emailAddress,
          userId: user?.id,
          id: messageId,
          role: "user",
          content: userMessage,
        },
      ];
      setHistory([...newHistory, []]);
      setStatus("streaming");
      const { message } = await llm.chat({
        messages: newHistory,
        stream: true,
        onStream: ({ message }) => {
          setStatus("idle");
          updateHistoryAndSave([...newHistory, message]);
        },
      });
      updateHistoryAndSave([...newHistory, message]);
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong! " + error.message);
    }
  };

  const updateHistoryAndSave = (newHistory) => {
    setHistory(newHistory);
    saveDataInLocalStorage(newHistory);
  };

  const saveDataInLocalStorage = (chatData) => {
    const previousChat = localStorage.getItem("chat");
    const chatArray = previousChat ? JSON.parse(previousChat) : [];

    const newChatArray = chatArray.map((item) => {
      if (item.length > 0 && item[0].id === chatData[0].id) {
        return chatData;
      }
      return item;
    });

    if (!newChatArray.some((item) => item[0].id === chatData[0].id)) {
      newChatArray.push(chatData);
    }

    const updatedChat = JSON.stringify(newChatArray);
    setStorageItem(updatedChat);
    localStorage.setItem("chat", updatedChat);
  };

  return (
    <StyledWrapper onSubmit={handleClick}>
      <Chat history={history} loading={status === "streaming"} />
      <StyledWrapperForm>
        <InputContainer>
          <StyledInputWrapper $loading={status === "streaming"}>
            <StyledInput
              type="text"
              ref={inputRef}
              placeholder={placeHolderText}
              disabled={status === "streaming"}
              $loading={status === "streaming"}
            />
          </StyledInputWrapper>
          <StyledSendButton onClick={handleClick}>➡</StyledSendButton>
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
