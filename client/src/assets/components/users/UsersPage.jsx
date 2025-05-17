import { useEffect, useState } from "react";
import useUserStore from "../../storage/useUserStore";
import PageContainer from "../site/PageContainer";
import axios from "axios";
import UserListElement from "./UserListElement";
import AddButton from "../buttons/AddButton";
import "./UsersPage.css";
import UsersPaginationPanel from "./UsersPaginationPanel";

const defaultPaginatioSettings = {
  pageNumber: 0,
  numberOfItems: 20,
  sortBy: "lastName",
  sortAsc: true,
  firstNameContains: "",
  lastNameContains: "",
};

const UsersPage = () => {
  const currentUser = useUserStore((state) => state.user);
  const [users, setUsers] = useState([]);
  const [paginationSetting, setPaginationSettings] = useState(
    defaultPaginatioSettings
  );

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/users", {
        params: paginationSetting,
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      })
      .then((res) => setUsers(res.data.content))
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

        <UsersPaginationPanel />

        <div>{usersToDisplay}</div>
      </div>
    </PageContainer>
  );
};

export default UsersPage;
