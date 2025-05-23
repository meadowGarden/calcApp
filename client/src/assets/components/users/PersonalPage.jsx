import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer";
import "../site/CommonStyles.css";
import axios from "axios";
import AppToast from "../site/AppToast";
import { useState } from "react";

const PersonalPage = ({ user }) => {
  const [toastTitle, setToastTitle] = useState();
  const [toastMessage, setToastMessage] = useState();
  const [toastStatus, setToastStatus] = useState();
  const [showToast, setShowToast] = useState(false);

  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <PageContainer>
      <div>
        <section>{user.firstName}</section>
        <section>{user.lastName}</section>
        <section>{user.email}</section>
      </div>
      <GeneralUserData user={user} />
      <ChangePassword user={user} />
      <AppToast
        title={toastTitle}
        message={toastMessage}
        status={toastStatus}
        onClose={toggleShowToast}
        delay={5000}
        show={showToast}
      />
    </PageContainer>
  );
};

export default PersonalPage;

const GeneralUserData = ({ user }) => {};

const ChangePassword = ({
  user,
  setToastTitle,
  setToastMessage,
  setToastStatus,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordChange = (data) => {
    const passwords = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    axios
      .patch(`http://localhost:8080/api/users/${user.user.id}`, passwords, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setToastTitle("success");
          setToastMessage("password was changed");
          setToastStatus("success");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit(handlePasswordChange)}>
      <section>
        <input
          {...register("oldPassword", {
            required: "enter your old password",
            minLength: {
              value: 2,
              message: "your password should be at lest two characters long",
            },
            maxLength: {
              value: 15,
              message: "your password should not exceed 15 characters",
            },
          })}
          placeholder="old password"
          className="inputText"
          type="password"
        />
        {errors.oldPassword && (
          <p className="formErrorMessage">{errors.oldPassword.message}</p>
        )}
      </section>

      <section>
        <input
          {...register("newPassword", {
            required: "you must enter your password",
            minLength: {
              value: 2,
              message: "your password should be at lest two characters long",
            },
            maxLength: {
              value: 15,
              message: "your password should not exceed 15 characters",
            },
          })}
          placeholder="new password"
          className="inputText"
          type="password"
        />
        {errors.newPassword && (
          <p className="formErrorMessage">{errors.newPassword.message}</p>
        )}
      </section>

      <section>
        <input
          {...register("repeatPassword", {
            required: "repeat password",
            validate: (value) => {
              if (watch("newPassword") != value) {
                return "password does not match";
              }
            },
          })}
          placeholder="repeat password"
          className="inputText"
          type="password"
        />
        {errors.repeatPassword && (
          <p className="formErrorMessage">{errors.repeatPassword.message}</p>
        )}
      </section>

      <section>
        <input type="submit" value={"change password"} />
      </section>
    </form>
  );
};
