import PropTypes from "prop-types";
import { useState } from "react";
import { PastChat } from "./PastChat";
import { useWindowSize } from "../hooks/useWindowSize";
import { useUser } from "@clerk/clerk-react";

import {
  StyledWrapper,
  StyledContent,
  StyledButtonChat,
  StyledHistoryContent,
  StyledTitle,
  StyledChatsContent,
} from "../styles/SideNav/StyledSideNav";

export const SideNav = ({
  setHistory,
  inputRef,
  setStorageItem,
  storageItem,
  sideNavVisible,
  setSideNavVisible,
}) => {
  const dataStorage = JSON.parse(localStorage?.getItem("chat"));
  const [activeIndex, setActiveIndex] = useState(false);
  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };
  const data = dataStorage ? dataStorage : storageItem;
  const { width } = useWindowSize();
  const { user } = useUser();

  const newChat = () => {
    setStorageItem([]);
    setHistory([]);
    setActiveIndex(false);
    inputRef.current.value = "";

    if (width < 980) setSideNavVisible(false);
  };
  const filteredContent = data?.filter(
    (chatEntry) => chatEntry[0]?.userId === user?.id
  );

  return (
    <StyledWrapper $sideNavVisible={sideNavVisible}>
      <StyledContent>
        <StyledButtonChat onClick={newChat}>➕Nuevo Chat</StyledButtonChat>
        <StyledHistoryContent>
          <StyledTitle>Historial Chats</StyledTitle>
          <StyledChatsContent>
            {filteredContent?.map((chatEntry, index) => (
              <PastChat
                key={index}
                index={index}
                setHistory={setHistory}
                text={`${chatEntry[0]?.content}`}
                handleButtonClick={handleButtonClick}
                isActive={activeIndex === index}
                setSideNavVisible={setSideNavVisible}
              ></PastChat>
            ))}
          </StyledChatsContent>
        </StyledHistoryContent>
      </StyledContent>
    </StyledWrapper>
  );
};

SideNav.propTypes = {
  setHistory: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
  setStorageItem: PropTypes.func.isRequired,
  storageItem: PropTypes.array.isRequired,
  sideNavVisible: PropTypes.bool.isRequired,
  setSideNavVisible: PropTypes.func.isRequired,
};
