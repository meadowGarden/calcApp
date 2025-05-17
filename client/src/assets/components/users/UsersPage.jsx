import { useEffect, useState } from "react";
import useUserStore from "../../storage/useUserStore";
import PageContainer from "../site/PageContainer";
import axios from "axios";
import UserListElement from "./UserListElement";
import AddButton from "../buttons/AddButton";
import "./UsersPage.css";

const UsersPage = () => {
  const currentUser = useUserStore((state) => state.user);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => fetchUsers(), []);

  const usersToDisplay = users.map((user) => (
    <div key={user.id}>
      <UserListElement user={user} />
    </div>
  ));

  return (
    <PageContainer>
      <div className="usersPage">
        <AddButton onClick={() => console.log("add user")} label={"add user"} />
          
        <div>{usersToDisplay}</div>
      </div>
    </PageContainer>
  );
};

export default UsersPage;
