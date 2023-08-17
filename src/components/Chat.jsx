import PropTypes from "prop-types";
import { EachChat } from "./EachChat";
import IconApp from "../assets/iconApp.png";

import {
  StyledWrapper,
  StyledContent,
  StyledImage,
  StyledText,
} from "../styles/Chat/StyledChat";

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
