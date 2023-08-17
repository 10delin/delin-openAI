import { SignUp, useUser } from "@clerk/clerk-react";
import { IsLoaded } from "../components/Isloaded";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  height: calc(100vh - 75px);
`;
export const SignUpPage = () => {
  const user = useUser();
  return (
    <StyledWrapper>
      {!user.isLoaded && <IsLoaded isLoaded={user.isLoaded} />}
      <SignUp />
    </StyledWrapper>
  );
};
