import { useRef, useState } from "react";
import { SideNav } from "../components/SideNav";
import styled from "styled-components";
import { ChatContainer } from "../components/ChatContainer";
import { Header } from "../components/Header";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  color: white;
  margin-top: 70px;
  height: calc(100vh - 75px);
`;

export const Home = () => {
  const [history, setHistory] = useState([]);
  const [storageItem, setStorageItem] = useState([]);
  const inputRef = useRef(null);

  return (
    <>
      <Header />
      <StyledWrapper>
        <SideNav
          setHistory={setHistory}
          setStorageItem={setStorageItem}
          storageItem={storageItem}
          inputRef={inputRef}
        />
        <ChatContainer
          inputRef={inputRef}
          history={history}
          setHistory={setHistory}
          setStorageItem={setStorageItem}
        />
      </StyledWrapper>
    </>
  );
};
