import { Link } from "react-router-dom";
import { BookmarkIcon, HomeIcon, MenuIcon } from "../icons";
import "../styles/Header.css";

const Header = () => {
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
          <MenuIcon />
          <p>Menu</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
