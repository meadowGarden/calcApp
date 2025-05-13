import { Link, useNavigate } from "react-router";
import "./Navbar.css";
import useTokenStore from "../../storage/useTokenStore";
import axios from "axios";

const Navbar = () => {
  const token = useTokenStore((state) => state.token);
  const isLoggedIn = token !== null;
  const removeToken = useTokenStore((state) => state.removeToken);
  const navigate = useNavigate();

  const onLogOut = () => {
    axios
      .post("http://localhost:8080/api/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        removeToken();
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

      <Link className="nbStandardElement" to="/test">
        test
      </Link>

      <Link className="nbStandardElement" to="/register">
        register
      </Link>

      <section className="nbStandardElement">
        {token === null ? (
          <Link className="nbStandardElement" to="/login">
            login
          </Link>
        ) : (
          <div onClick={onLogOut} className="nbStandardElement">
            logout
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;
