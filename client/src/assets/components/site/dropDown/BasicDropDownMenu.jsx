import { Link } from "react-router";
import useUserStore from "../../../storage/useUserStore";
import "./BasicDropDownMenu.css";

const MenuDropDown = ({ onLogOut, onClose }) => {
  const user = useUserStore((state) => state.user);
  const { firstName, lastName, email } = user.user;
  return (
    <div className="basicDropDownMenu">
      <section className="basicDropDownMenuListElement">{email}</section>
      <Link
        onClick={onClose}
        className="basicDropDownMenuElement"
        to={`/users/${user?.user.id}`}
      >
        user details
      </Link>
      <div className="basicDropDownMenuElement" onClick={onLogOut}>
        logout
      </div>
    </div>
  );
};

export default MenuDropDown;
