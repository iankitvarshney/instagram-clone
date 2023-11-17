import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../utils/userSlice";
import "../styles/SigninPage.css";

const auth = getAuth(app);

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [singinDisabled, setSigninDisabled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((store) => store.user.username);

  const signInUser = () => {
    setSigninDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        setSigninDisabled(false);
        dispatch(updateUsername(response.user.displayName));
        navigate("/");
      })
      .catch((error) => {
        setSigninDisabled(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="signin-page">
      <h1>Instagram</h1>
      {/* <h3>Sign in to see photos and videos from your friends.</h3> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInUser();
        }}
      >
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
        <button type="submit" disabled={singinDisabled}>
          Sign in
        </button>
      </form>

      <div>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
