import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { SignUpPage } from "./pages/SignUpPage.jsx";
import { SignInPage } from "./pages/SignInPage.jsx";

export const AppRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes navigate={(to) => navigate(to)}>
      <Route path="/" element={<Home />} />
      <Route
        path="/sign-in/*"
        element={<SignInPage routing="path" path="/sign-in/" />}
      />
      <Route
        path="/sign-up/*"
        element={<SignUpPage routing="path" path="/sign-up/" />}
      />
    </Routes>
  );
};
