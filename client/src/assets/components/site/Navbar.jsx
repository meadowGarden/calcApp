import { Link, useNavigate } from "react-router";
import "./Navbar.css";
import axios from "axios";
import useUserStore from "../../storage/useUserStore";
import BasicDropDownMenu from "./dropDown/BasicDropDownMenu.jsx";
import { useRef, useState } from "react";
import useOutsideDetector from "../../hooks/useOutsideDetector.jsx";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = user !== null;
  const logOut = useUserStore((state) => state.removeUser);
  const navigate = useNavigate();
  const [isDropDownMenuVisible, setIsDropDownMenuVisible] = useState(false);
  const usersMenu = useRef(null);

  const onLogOut = () => {
    axios
      .post(`${import.meta.env.VITE_BACK_END}/auth/logout`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        logOut();
        setIsDropDownMenuVisible(false);
        navigate("/");
      })
      .catch();
  };

  const onMenuClose = (setVisibility) => {
    setIsDropDownMenuVisible(false);
  };

  const toggleDropDownMenuVisibility = () =>
    setIsDropDownMenuVisible(!isDropDownMenuVisible);

  useOutsideDetector(usersMenu, () => setIsDropDownMenuVisible(false));

  const currentUserFullName = `${user?.user.firstName} ${user?.user.lastName}`;

  return (
    <div className="navbar">
      <Link className="nbHomeElement" to="/">
        home
      </Link>

      {isLoggedIn && (
        <Link className="nbStandardElement" to="/materials">
          materials
        </Link>
      )}
      {isLoggedIn && (
        <Link className="nbStandardElement" to="/bom">
          bills of materials
        </Link>
      )}

      {user?.user.role === "ADMIN" && (
        <Link className="nbStandardElement" to="/users">
          users
        </Link>
      )}

      {user === null && (
        <Link className="nbStandardElement" to="/register">
          register
        </Link>
      )}

      {user !== null ? (
        <div className="nbUserContainer" ref={usersMenu}>
          <button
            className="nbStandardElement"
            onClick={toggleDropDownMenuVisibility}
          >
            {currentUserFullName}
          </button>
          {isDropDownMenuVisible && (
            <BasicDropDownMenu onLogOut={onLogOut} onClose={onMenuClose} />
          )}
        </div>
      ) : (
        <Link className="nbStandardElement" to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
