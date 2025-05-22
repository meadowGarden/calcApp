import "./UserListElement.css";
import "../site/CommonStyles.css";
import { roleDictServerClient } from "../../../services/utils";

const UserListElement = ({ user, setCurrentUser, showUpdateModal }) => {
  const { firstName, lastName, email, role } = user;

  return (
    <div
      onClick={() => {
        setCurrentUser(user);
        showUpdateModal();
      }}
      className="userListElement"
    >
      <span className="listElementText">{firstName}</span>
      <span className="listElementText">{lastName}</span>
      <span className="listElementText">{email}</span>
      <span className="listElementText">{roleDictServerClient[role]}</span>
    </div>
  );
};

export default UserListElement;
