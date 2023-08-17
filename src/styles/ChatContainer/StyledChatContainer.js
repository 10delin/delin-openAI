import styled from "styled-components";

export const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  background-color: #353535;
  color: white;
  border-radius: 20px;
  margin: 25px;
  margin-top: 0;
  overflow-y: scroll;

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
export const StyledWrapperForm = styled.form`
  position: sticky;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #353535;
`;

export const InputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px 15px;
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 25px;
  border: 1px solid #ffffff;
  font-size: 1rem;
  overflow-wrap: break-word;
  word-break: break-all;

  &:focus-within {
    border: 1px solid #ffac00;
  }

  ${({ $loading }) =>
    $loading &&
    `animation:pulse 1s infinite;
     border: 1px solid #ffac00;
    `}

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 230, 0, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 172, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 172, 0, 0);
    }
  }
`;

export const StyledInput = styled.input`
  position: relative;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: transparent;
  width: 85%;
  padding: 15px;
  border-radius: 25px;

  &::placeholder {
    ${({ $loading }) => ($loading ? `color: #e99d0f; : ` : `color: #b3b3b3;`)}
  }
`;

export const StyledSendButton = styled.button`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  outline: none;
  background-color: #353535;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  padding: none;
  cursor: pointer;
`;
