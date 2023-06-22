import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import CommentContext from "./contexts/CommentContext";
import "./index.css";
import Comments from "./routes/Comments";
import EmailConfirmation from "./routes/EmailConfirmation";
import ForgotPassword from "./routes/ForgotPassword";
import Profile from "./routes/Profile";
import ResetPassword from "./routes/ResetPassword";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Welcome from "./routes/Welcome";

function App() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate("/comments");
    else navigate("/");
  }, [loggedIn]);

  return (
    <div className="bg-light-500 dark:bg-dark-500">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/comments"
          element={
            <CommentContext>
              <Comments />
            </CommentContext>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/emailConfirmation" element={<EmailConfirmation />} />
      </Routes>
    </div>
  );
}

export default App;
