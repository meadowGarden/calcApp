import "./UserListElement.css";
import "../site/CommonStyles.css";

const UserListElement = ({ user }) => {
  const { firstName, lastName, email, role } = user;

  return (
    <div className="userListElement">
      <span className="listElementText">{firstName}</span>
      <span className="listElementText">{lastName}</span>
      <span className="listElementText">{email}</span>
      <span className="listElementText">{role}</span>
    </div>
  );
};

export default UserListElement;
