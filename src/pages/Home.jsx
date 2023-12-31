import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SideNav } from "../components/SideNav";
import styled from "styled-components";
import { ChatContainer } from "../components/ChatContainer";
import { Header } from "../components/Header";
import { useWindowSize } from "../hooks/useWindowSize";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

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
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const inputRef = useRef(null);

  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  const { width } = useWindowSize();

  useLayoutEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    if (width > 980) return setSideNavVisible(true);
    return setSideNavVisible(false);
  }, [width]);

  return (
    <>
      <Header setSideNavVisible={setSideNavVisible} />
      <StyledWrapper>
        <SideNav
          setHistory={setHistory}
          setStorageItem={setStorageItem}
          storageItem={storageItem}
          inputRef={inputRef}
          sideNavVisible={sideNavVisible}
          setSideNavVisible={setSideNavVisible}
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
