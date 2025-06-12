import { Link, useNavigate } from "react-router";
import "./Navbar.css";
import axios from "axios";
import useUserStore from "../../storage/useUserStore";
import BasicDropDownMenu from "./dropDown/BasicDropDownMenu.jsx";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = user !== null;
  const logOut = useUserStore((state) => state.removeUser);
  const navigate = useNavigate();

  const onLogOut = () => {
    axios
      .post(`${import.meta.env.VITE_BACK_END}/auth/logout`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        logOut();
        navigate("/");
      })
      .catch();
  };

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

      <section className="nbStandardElement">
        {user === null ? (
          <Link className="nbStandardElement" to="/login">
            login
          </Link>
        ) : (
          <span onClick={onLogOut} className="nbStandardElement">
            logout
          </span>
        )}
      </section>

      {user !== null && (
        <Link className="nbStandardElement" to={`/users/${user?.user.id}`}>
          {currentUserFullName}
        </Link>
      )}

      {user !== null && (
        <span onClick={onLogOut} className="nbStandardElement">
          logout
        </span>
      )}

      {user !== null && <BasicDropDownMenu />}
    </div>
  );
};

export default Navbar;
