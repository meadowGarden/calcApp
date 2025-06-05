import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer.jsx";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router";
import AppToast from "../site/AppToast.jsx";
import { useState } from "react";
import useUserStore from "../../storage/useUserStore.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showRegistrationFailedToast, setShowRegistrationFailedToast] =
    useState(false);
  const toggleFailedRegistrationToast = () =>
    setShowRegistrationFailedToast(!showRegistrationFailedToast);
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.repeatPassword,
    };

    axios
      .post(`${import.meta.env.VITE_BACK_END}/api/auth/register`, user)
      .then((res) => {
        if (res.status === 201) {
          addUser(res.data);
          navigate("/");
        }
      })
      .catch((error) => {
        switch (error.status) {
          case 409:
            toggleFailedRegistrationToast();
            break;
        }
      });
  };

  return (
    <PageContainer>
      <form className="registerFrom" onSubmit={handleSubmit(onSubmit)}>
        <section className="registerFormSection">
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
              required: "enter last name",
              minLength: {
                value: 1,
                message: "last name should be at least one character",
              },
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

        <section className="registerFormSection">
          <input
            {...register("password", {
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
            placeholder="password"
            className="inputText"
            type="password"
          />
          {errors.password && (
            <p className="formErrorMessage">{errors.password.message}</p>
          )}
        </section>

        <section className="registerFormSection">
          <input
            {...register("repeatPassword", {
              required: "repeat password",
              validate: (value) => {
                if (watch("password") != value) {
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

        <section className="registerFormSection">
          <input
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
            value={"register"}
            className="standardButton"
          />
        </section>
      </form>

      <AppToast
        title={"registration failed"}
        message={"provided email already in use"}
        status={"fail"}
        show={showRegistrationFailedToast}
        onClose={toggleFailedRegistrationToast}
        delay={5000}
      />
    </PageContainer>
  );
};

export default Register;
