import { useRef, useState } from "react";
import useLLM from "usellm";
import { SideNav } from "../components/SideNav";

export const Home = () => {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

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

  const saveDataInLocalStorage = () => {
    const previousChat = localStorage.getItem("chat");
    const chatArray = previousChat ? JSON.parse(previousChat) : [];
    const updatedChat = JSON.stringify([...chatArray, [...history]]);
    localStorage.setItem("chat", updatedChat);
  };

  const newChat = () => {
    saveDataInLocalStorage();
    setHistory([]);
    inputRef.current.value = "";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        gap: "5rem",
      }}
    >
      <SideNav setHistory={setHistory} />
      <div>
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
        <button onClick={newChat}>New Chat</button>
      </div>
    </div>
  );
};
