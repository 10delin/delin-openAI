import PropTypes from "prop-types";
import { styled } from "styled-components";
import { Button } from "./Button";
import { useState } from "react";

const StyledWrapper = styled.div`
  position: relative;
  width: 30%;
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
  gap: 1rem;
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

const StyledButtonChat = styled.button`
  position: relative;
  border: 2px solid #f5f5f5;
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
        <StyledButtonChat onClick={newChat}>New Chat</StyledButtonChat>
        {data?.map((chatEntry, index) => (
          <Button
            key={index}
            index={index}
            setHistory={setHistory}
            text={`chat : ${chatEntry[0]?.content}`}
            handleButtonClick={handleButtonClick}
            isActive={activeIndex === index}
          ></Button>
        ))}
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
