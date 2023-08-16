import PropTypes from "prop-types";
import styled from "styled-components";
import { EachChat } from "./EachChat";
import IconApp from "../assets/iconApp.png";

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

const StyledContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 20px;
  padding: 15px;
  background-color: #242424;
  font-weight: 400;

  @media (max-width: 980px) {
    gap: 5px;
    padding: 10px;
  }
`;

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledText = styled.div`
  width: 100%;
  text-align: left;
  transition: all 0.3s ease-in-out;
  font-weight: 400;

  a {
    color: #ffac00;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
  }

  p {
    margin: 0;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const Chat = ({ history, loading }) => {
  const defaultChatEntry =
    "<p> Soy Delin OpenAI, tu colaborador creativo y útil. Tengo algunas limitaciones y no siempre acertaré, pero tus comentarios me ayudarán a mejorar. ¿No tienes claro por dónde empezar? Puedes probar lo siguiente: </p>" +
    "\n\n- <a>Pregúntame sobre el significado de la vida.</a>" +
    "\n- <a>Pregúntame sobre la inteligencia artificial.</a>" +
    "\n- <a>Pregúntame sobre el futuro.</a>";
  return (
    <StyledWrapper>
      {history?.map((chatEntry, index) => (
        <EachChat
          key={index}
          chatEntry={chatEntry}
          loading={loading && index === history.length - 1}
        />
      ))}
      {history.length === 0 ? (
        <StyledContent>
          <StyledImage src={IconApp} alt="icon" />
          <StyledText dangerouslySetInnerHTML={{ __html: defaultChatEntry }} />
        </StyledContent>
      ) : null}
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
  loading: PropTypes.bool.isRequired,
};
