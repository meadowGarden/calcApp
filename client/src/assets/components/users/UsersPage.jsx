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
import DeletionZone from "../site/DeletionZone.jsx";
import AppToast from "../site/AppToast.jsx";

const defaultPaginatioSettings = {
  firstNameContains: "",
  lastNameContains: "",
  pageNumber: 1,
  numberOfItems: 20,
  sortBy: "email",
  sortAsc: true,
};

const UsersPage = () => {
  const loggedUser = useUserStore((state) => state.user);
  const [currentUser, setCurrentUser] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [paginationSettings, setPaginationSettings] = useState(
    defaultPaginatioSettings
  );
  const [roles, setRoles] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({});

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/users", {
        params: paginationSettings,
        headers: { Authorization: `Bearer ${loggedUser?.token}` },
      })
      .then((res) => {
        setUsers(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setToastInfo({
          title: "failure",
          message: "could not fetch users",
          status: "failure",
          delay: 3000,
        });
        showToast();
      });
  };
  useEffect(() => fetchUsers(), [paginationSettings]);

  const fetchRoles = () => {
    axios
      .get("http://localhost:8080/api/users/roles", {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      })
      .then((res) => setRoles(res.data))
      .catch(() => {
        setToastInfo({
          title: "failure",
          message: "could not fetch roles",
          status: "failure",
          delay: 3000,
        });
        showToast();
      });
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

  const toggleShowToast = () => setShowToast(!showToast);

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
      .then((res) => {
        fetchUsers();
        setToastInfo({
          title: "success",
          message: "user has been created",
          status: "success",
          delay: 3000,
        });
        toggleShowToast();
        setShowAddModal(false);
      })
      .catch((error) => {
        switch (error.status) {
          case 409:
            {
              setToastInfo({
                title: "failure",
                message: "user already exists",
                status: "failure",
                delay: 3000,
              });
              toggleShowToast();
            }
            break;
        }
      });
  };

  const updateUser = (data) => {
    const updatedUser = {
      ...currentUser,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    };

    axios
      .put(`http://localhost:8080/api/users/${currentUser.id}`, updatedUser, {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      })
      .then(() => {
        fetchUsers();
        setShowUpdateModal(false);
        setToastInfo({
          title: "success",
          message: "user has been updated",
          status: "success",
          delay: 3000,
        });
        toggleShowToast();
        setShowAddModal(false);
      })
      .catch((error) => {
        switch (error.status) {
          case 409:
            {
              setToastInfo({
                title: "failure",
                message: `${error.response.data}`,
                status: "failure",
                duration: 3000,
              });
              toggleShowToast();
            }
            break;
          default: {
            setToastInfo({
              title: "failure",
              message: "unable to update user",
              status: "failure",
              duration: 3000,
            });
            toggleShowToast();
          }
        }
      });
  };

  const deleteUser = () => {
    axios
      .delete(`http://localhost:8080/api/users/${currentUser.id}`, {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      })
      .then(() => {
        fetchUsers();
        setShowUpdateModal(false);
        setToastInfo({
          title: "success",
          message: "user has been deleted",
          status: "success",
          delay: 3000,
        });
        toggleShowToast();
        setShowAddModal(false);
      })
      .catch(() => {
        setToastInfo({
          title: "failure",
          message: "unable to delete user",
          status: "failure",
          delay: 3000,
        });
        toggleShowToast();
      });
  };

  return (
    <PageContainer>
      <div className="usersPage">
        <AddButton onClick={() => handleShowAddModal()} label={"add user"} />

        <UsersPaginationPanel
          setPaginationSettings={setPaginationSettings}
          totalPages={totalPages}
          fetchUsers={fetchUsers}
        />

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
          onSubmit={updateUser}
          rolesList={roles}
        />
        <section className="deleteUserButtonSection">
          <DeletionZone title={"user"} onClick={deleteUser} />
        </section>
      </DataModal>

      <AppToast
        title={toastInfo.title}
        message={toastInfo.message}
        status={toastInfo.status}
        delay={toastInfo.delay}
        show={showToast}
        onClose={toggleShowToast}
      />
    </PageContainer>
  );
};

export default UsersPage;
