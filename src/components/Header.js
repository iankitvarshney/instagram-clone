import { BookmarkIcon, HomeIcon, MenuIcon } from "../icons";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <h1>Instagram</h1>
      </div>
      <div className="nav-items">
        <div className="nav-item">
          <HomeIcon />
          <p>Home</p>
        </div>
        <div className="nav-item">
          <BookmarkIcon />
          <p>Saved</p>
        </div>
        <div className="nav-item">
          <MenuIcon />
          <p>Menu</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
