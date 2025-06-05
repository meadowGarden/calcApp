import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer";
import "../site/CommonStyles.css";
import axios from "axios";
import AppToast from "../site/AppToast";
import { useState } from "react";
import useUserStore from "../../storage/useUserStore";
import "./PersonalPage.css";

const PersonalPage = () => {
  const [toastTitle, setToastTitle] = useState();
  const [toastMessage, setToastMessage] = useState();
  const [toastStatus, setToastStatus] = useState();
  const [showToast, setShowToast] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const user = useUserStore((state) => state.user);

  const toggleShowToast = () => setShowToast(!showToast);
  const toggleShowPassword = () => setShowPasswordChange(!showPasswordChange);

  return (
    <PageContainer>
      <div className="personalPage">
        <section className="userTitle">
          <strong>
            {user?.user.firstName} {user?.user.lastName}
          </strong>
        </section>

        <section>
          <GeneralUserData
            user={user}
            setToastTitle={setToastTitle}
            setToastMessage={setToastMessage}
            setToastStatus={setToastStatus}
            showToast={toggleShowToast}
          />
        </section>

        <section className="showPasswordSection">
          <button
            onClick={() => toggleShowPassword()}
            className="showPasswordSectionButton"
          >
            change password
          </button>

          {showPasswordChange && (
            <ChangePassword
              user={user}
              setToastTitle={setToastTitle}
              setToastMessage={setToastMessage}
              setToastStatus={setToastStatus}
              showToast={toggleShowToast}
            />
          )}
        </section>

        <AppToast
          title={toastTitle}
          message={toastMessage}
          status={toastStatus}
          onClose={toggleShowToast}
          show={showToast}
          delay={3000}
        />
      </div>
    </PageContainer>
  );
};

export default PersonalPage;

const GeneralUserData = ({
  user,
  setToastTitle,
  setToastMessage,
  setToastStatus,
  showToast,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.user.firstName,
      lastName: user?.user.lastName,
      email: user?.user.email,
    },
  });

  const updateUser = useUserStore((state) => state.updateUser);

  const onSubmit = (data) => {
    const updatedUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACK_END}/api/users/${user?.user.id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setToastTitle("success");
          setToastMessage("personal data updated");
          setToastStatus("success");
          updateUser(res.data);
          showToast();
        }
      })
      .catch(() => {
        setToastTitle("update failed");
        setToastMessage("could not update personla data");
        setToastStatus("failure");
        showToast();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="personalData">
      <section>
        <input
          {...register("firstName", {
            required: "enter first name",
            minLength: {
              value: 1,
              message: "first name should be at least one character",
            },
            maxLength: {
              value: 100,
              message: "first name should be at least one character",
            },
          })}
          placeholder="first name"
          className="inputText"
        />
        {errors.firstName && (
          <p className="formErrorMessage">{errors.firstName.message}</p>
        )}
      </section>

      <section className="registerFormSection">
        <input
          {...register("lastName", {
            maxLength: {
              value: 100,
              message: "last name should be at least one character",
            },
          })}
          placeholder="last name"
          className="inputText"
        />
        {errors.lastName && (
          <p className="formErrorMessage">{errors.lastName.message}</p>
        )}
      </section>

      <section className="registerFormSection">
        <input
          {...register("email", {
            required: { value: true, message: "enter your email" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "your email is not valid",
            },
          })}
          placeholder="email"
          className="inputText"
        />
        {errors.email && (
          <p className="formErrorMessage">{errors.email.message}</p>
        )}
      </section>

      <section className="changePersonalDataButtonSection">
        <input
          type="submit"
          value={"update"}
          className="changePersonalDataButton"
        />
      </section>
    </form>
  );
};

const ChangePassword = ({
  user,
  setToastTitle,
  setToastMessage,
  setToastStatus,
  showToast,
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
      .patch(
        `${import.meta.env.VITE_BACK_END}/api/users/${user?.user.id}`,
        passwords,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        switch (res.status) {
          case 200:
            {
              setToastTitle("success");
              setToastMessage("password was changed");
              setToastStatus("success");
              showToast();
            }
            break;
        }
      })
      .catch((error) => {
        switch (error.status) {
          case 406:
            {
              setToastTitle("failure");
              setToastMessage("current password is wrong");
              setToastStatus("failed");
              showToast();
            }
            break;
          case 417:
            {
              setToastTitle("failure");
              setToastMessage("your new password is the same as old one");
              setToastStatus("failed");
              showToast();
            }
            break;
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handlePasswordChange)}
      className="passwordFields"
    >
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

      <section className="changePasswordButtonSection">
        <input
          type="submit"
          value={"change"}
          className="changePasswordButton"
        />
      </section>
    </form>
  );
};
