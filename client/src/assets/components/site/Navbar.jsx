import { Link } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="nbHomeElement" to="/">
        home
      </Link>
      <Link className="nbStandardElement" to="/materials">
        materials
      </Link>
      <Link className="nbStandardElement" to="/bom">
        bills of materials
      </Link>
    </div>
  );
};

export default Navbar;
