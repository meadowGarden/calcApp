import { Link } from "react-router";
import useUserStore from "../../../storage/useUserStore";
import "./BasicDropDownMenu.css";
import { forwardRef } from "react";

const MenuDropDown = forwardRef(({ onLogOut, onClose }, ref) => {
  const user = useUserStore((state) => state.user);
  const { firstName, lastName, email } = user.user;

  return (
    <div ref={ref} className="basicDropDownMenu">
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
});

export default MenuDropDown;
