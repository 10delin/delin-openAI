import PropTypes from "prop-types";
import styled from "styled-components";
import { EachChat } from "./EachChat";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background-color: #353535;
  color: white;
  border-radius: 20px;
  white-space: pre-wrap;
  margin: 25px;
`;

export const Chat = ({ history }) => {
  return (
    <StyledWrapper>
      {history?.map((chatEntry, index) => (
        <EachChat key={index} chatEntry={chatEntry} />
      ))}
    </StyledWrapper>
  );
};

Chat.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};
