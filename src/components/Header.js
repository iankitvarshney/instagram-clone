import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../utils/userSlice";
import {
  BookmarkIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  UserIcon,
} from "../icons";
import "../styles/Header.css";

const auth = getAuth(app);

const Header = () => {
  const username = useSelector((store) => store.user.username);

  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="logo-container">
        <h1>Instagram</h1>
      </div>
      <div className="nav-items">
        <Link to={"/"}>
          <div className="nav-item">
            <HomeIcon />
            <p>Home</p>
          </div>
        </Link>
        <Link to={"/saved"}>
          <div className="nav-item">
            <BookmarkIcon />
            <p>Saved</p>
          </div>
        </Link>
        <div className="nav-item">
          <UserIcon />
          <p>{username ? username : "Profile"}</p>
        </div>
        {username ? (
          <div
            className="nav-item"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  dispatch(updateUsername(""));
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            <LogoutIcon />
            <p>Logout</p>
          </div>
        ) : (
          <Link to={"/login"}>
            <div className="nav-item">
              <LoginIcon />
              <p>Login</p>
            </div>
          </Link>
        )}
        {/* <div className="nav-item">
          <MenuIcon />
          <p>Menu</p>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
