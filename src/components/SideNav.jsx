import PropTypes from "prop-types";
import { styled } from "styled-components";
import { Button } from "./Button";
import { useState } from "react";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
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
      <button onClick={newChat}>New Chat</button>
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
    </StyledWrapper>
  );
};

SideNav.propTypes = {
  setHistory: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
  setStorageItem: PropTypes.func.isRequired,
  storageItem: PropTypes.array.isRequired,
};
