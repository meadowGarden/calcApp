import { useEffect, useState } from "react";
import useUserStore from "../../storage/useUserStore";
import PageContainer from "../site/PageContainer";
import axios from "axios";
import UserListElement from "./UserListElement";
import AddButton from "../buttons/AddButton";
import "./UsersPage.css";
import UsersPaginationPanel from "./UsersPaginationPanel";
import DataModal from "../site/DataModal.jsx";
import UserCard from "./UserCard.jsx";

const defaultPaginatioSettings = {
  firstNameContains: "",
  lastNameContains: "",
  pageNumber: 1,
  numberOfItems: 20,
  sortBy: "lastName",
  sortAsc: true,
};

const UsersPage = () => {
  const loggedUser = useUserStore((state) => state.user);
  const [currentUser, setCurrentUser] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [paginationSettings, setPaginationSettings] = useState(
    defaultPaginatioSettings
  );
  const [roles, setRoles] = useState([]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/users", {
        params: paginationSettings,
        headers: { Authorization: `Bearer ${loggedUser?.token}` },
      })
      .then((res) => setUsers(res.data.content))
      .catch((error) => console.log(error));
  };
  useEffect(() => fetchUsers(), [paginationSettings]);

  const fetchRoles = () => {
    axios
      .get("http://localhost:8080/api/users/roles", {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      })
      .then((res) => setRoles(res.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => fetchRoles(), []);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const usersToDisplay = users.map((user) => (
    <div key={user.id}>
      <UserListElement
        user={user}
        setCurrentUser={setCurrentUser}
        showUpdateModal={handleShowUpdateModal}
      />
    </div>
  ));

  const createUser = (data) => {
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    axios
      .post("http://localhost:8080/api/users", newUser, {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      })
      .then((res) => fetchUsers())
      .catch((error) => console.log(error));
  };

  return (
    <PageContainer>
      <div className="usersPage">
        <AddButton onClick={() => handleShowAddModal()} label={"add user"} />

        <UsersPaginationPanel setPaginationSettings={setPaginationSettings} />

        <div>{usersToDisplay}</div>
      </div>

      <DataModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        title={"add user"}
      >
        <UserCard
          onSuccessTitle="create"
          onSubmit={createUser}
          rolesList={roles}
        />
      </DataModal>

      <DataModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        title={"update user"}
      >
        <UserCard
          user={currentUser}
          onSuccessTitle="update"
          onSubmit={() => console.log("update")}
          rolesList={roles}
        />
      </DataModal>
    </PageContainer>
  );
};

export default UsersPage;
