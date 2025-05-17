import { Link, useNavigate } from "react-router";
import "./Navbar.css";
import axios from "axios";
import useUserStore from "../../storage/useUserStore";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = user !== null;
  const logOut = useUserStore((state) => state.removeUser);
  const navigate = useNavigate();

  const onLogOut = () => {
    axios
      .post("http://localhost:8080/api/auth/logout", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        logOut();
        navigate("/");
      })
      .catch();
  };

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

      <Link className="nbStandardElement" to="/test">
        test
      </Link>

      <Link className="nbStandardElement" to="/register">
        register
      </Link>

      <section className="nbStandardElement">
        {/* {user === null || user?.token === null ? ( */}
        {user === null ? (
          <Link className="nbStandardElement" to="/login">
            login
          </Link>
        ) : (
          <div onClick={onLogOut} className="nbStandardElement">
            logout
          </div>
        )}
      </section>

      <section className="nbStandardElement">
        <span className="nbStandardElement">
          {user?.user.firstName} {user?.user.lastName}
        </span>
      </section>
    </div>
  );
};

export default Navbar;
