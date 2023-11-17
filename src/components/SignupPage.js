import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { updateUsername } from "../utils/userSlice";
import "../styles/SignupPage.css";

const auth = getAuth(app);

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [singupDisabled, setSignupDisabled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpUser = () => {
    setSignupDisabled(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        setSignupDisabled(false);
        const user = response.user;
        await updateProfile(user, {
          displayName: username,
        });
        dispatch(updateUsername(username));
        navigate("/");
      })
      .catch((error) => {
        setSignupDisabled(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="signup-page">
      <h1>Instagram</h1>
      <h3>Sign up to see photos and videos from your friends.</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpUser();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="error-message">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <button type="submit" disabled={singupDisabled}>
          Sign up
        </button>
      </form>

      <div>
        <p>
          Have an account? <Link to={"/login"}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
