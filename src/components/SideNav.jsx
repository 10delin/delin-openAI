import PropTypes from "prop-types";
import { styled } from "styled-components";
import { Button } from "./Button";
import { useEffect, useState } from "react";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 50%;
`;

export const SideNav = ({ setHistory }) => {
  const dataStorage = JSON.parse(localStorage?.getItem("chat"));
  const [storageItem, setStorageItem] = useState(dataStorage);
  const [activeIndex, setActiveIndex] = useState(false);
  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };

  //   useEffect(() => {
  //     const dataStorage = JSON.parse(localStorage?.getItem("chat"));
  //     setStorageItem(dataStorage);
  //   }, [storageItem]);

  return (
    <StyledWrapper>
      {dataStorage?.map((chatEntry, index) => (
        <Button
          key={index}
          index={index}
          setHistory={setHistory}
          setStorageItem={setStorageItem}
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
};
