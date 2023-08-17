import PropTypes from "prop-types";
import IconApp from "../assets/iconApp.png";
import { Spinner } from "./Spinner";
import {
  StyledWrapper,
  StyledContent,
  StyledImage,
  StyledRole,
} from "../styles/EachChat/StyledEachChat";

export const EachChat = ({ chatEntry, loading }) => {
  return (
    <StyledWrapper $roleAI={chatEntry.role === "user"}>
      <StyledRole>
        {chatEntry.role === "user" ? (
          "You: "
        ) : (
          <StyledImage $loading={loading} src={IconApp} alt="icon" />
        )}
      </StyledRole>

      {loading ? (
        <Spinner />
      ) : (
        <StyledContent>{chatEntry.content}</StyledContent>
      )}
    </StyledWrapper>
  );
};

EachChat.propTypes = {
  chatEntry: PropTypes.shape({
    role: PropTypes.string,
    content: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
};
