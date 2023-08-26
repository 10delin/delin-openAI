import useLLM from "usellm";
import PropTypes from "prop-types";
import { Chat } from "./Chat";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import {
  StyledWrapper,
  StyledWrapperForm,
  StyledInput,
  StyledInputWrapper,
  StyledSendButton,
  InputContainer,
} from "../styles/ChatContainer/StyledChatContainer";
import { saveDataInLocalStorage } from "../utils/saveDataInLocalStorage";

export const ChatContainer = ({
  history,
  setHistory,
  inputRef,
  setStorageItem,
}) => {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const [status, setStatus] = useState("idle");
  const [defaultInput, setDefaultInput] = useState("");
  const { user } = useUser();

  const placeHolderText =
    status === "streaming"
      ? "Espera a mi respuesta..."
      : "Introduce una petición aquí";

  const sendChat = async (userMessage) => {
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

  const handleClick = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value;
    if (!userMessage) return;
    userMessage && (inputRef.current.value = "");
    sendChat(userMessage);
  };

  const updateHistoryAndSave = (newHistory) => {
    setHistory(newHistory);
    saveDataInLocalStorage(newHistory, setStorageItem);
  };

  useEffect(() => {
    if (defaultInput) {
      sendChat(defaultInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultInput]);

  return (
    <StyledWrapper onSubmit={handleClick}>
      <Chat
        history={history}
        loading={status === "streaming"}
        setDefaultInput={setDefaultInput}
      />
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
