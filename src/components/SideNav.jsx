import PropTypes from "prop-types";
import { styled } from "styled-components";
import { useState } from "react";
import { PastChat } from "./PastChat";

const StyledWrapper = styled.div`
  position: relative;
  width: 25%;
`;

const StyledContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1rem;
  padding-top: 0;
  gap: 3rem;
  z-index: 2;
  scrollbar-width: none;
  overflow-y: scroll;
  height: calc(100vh - 110px);
  width: 100%;

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

const StyledHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
`;

const StyledChatsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

const StyledButtonChat = styled.button`
  position: relative;
  border: 1px solid #3d3d3d;
`;

export const SideNav = ({
  setHistory,
  inputRef,
  setStorageItem,
  storageItem,
}) => {
  const dataStorage = JSON.parse(localStorage?.getItem("chat"));
  const [activeIndex, setActiveIndex] = useState(false);
  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };
  const data = dataStorage ? dataStorage : storageItem;

  const newChat = () => {
    setStorageItem([]);
    setHistory([]);
    setActiveIndex(false);
    inputRef.current.value = "";
  };

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledButtonChat onClick={newChat}>➕Nuevo Chat</StyledButtonChat>
        <StyledHistoryContent>
          <StyledTitle>Historial Chats</StyledTitle>
          <StyledChatsContent>
            {data?.map((chatEntry, index) => (
              <PastChat
                key={index}
                index={index}
                setHistory={setHistory}
                text={`${chatEntry[0]?.content}`}
                handleButtonClick={handleButtonClick}
                isActive={activeIndex === index}
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
};
