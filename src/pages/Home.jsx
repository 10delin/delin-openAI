import { useRef, useState } from "react";
import useLLM from "usellm";
import { SideNav } from "../components/SideNav";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin: 0;
  color: white;
`;

export const Home = () => {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const [history, setHistory] = useState([]);
  const [storageItem, setStorageItem] = useState([]);
  const inputRef = useRef(null);

  const saveDataInLocalStorage = () => {
    const previousChat = localStorage.getItem("chat");
    const chatArray = previousChat ? JSON.parse(previousChat) : [];
    const updatedChat = JSON.stringify([...chatArray, [...history]]);
    setStorageItem(updatedChat);
    localStorage.setItem("chat", updatedChat);
  };

  const handleClick = async () => {
    const userMessage = inputRef.current?.value;
    if (!userMessage) return;

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
    <StyledWrapper>
      <SideNav
        setHistory={setHistory}
        setStorageItem={setStorageItem}
        storageItem={storageItem}
        inputRef={inputRef}
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h1>Chat with AI</h1>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>chat</button>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {history?.map((chatEntry, index) => (
            <div key={index}>
              {chatEntry.role === "user" ? "You: " : "AI: "}
              {chatEntry.content}
            </div>
          ))}
        </div>
        <button onClick={saveDataInLocalStorage}>Save Chat</button>
      </div>
    </StyledWrapper>
  );
};
