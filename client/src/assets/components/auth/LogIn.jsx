import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer.jsx";
import StandardButton from "../buttons/StandardButton.jsx";
import axios from "axios";
import useTokenStore from "../../storage/useTokenStore.js";
import "./LogIn.css";
import { useNavigate } from "react-router";
import "../site/CommonStyles.css";
import AppToast from "../site/AppToast.jsx";
import { useState } from "react";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addToken = useTokenStore((state) => state.addToken);
  const navigate = useNavigate();
  const [showFailToast, setShowFailToast] = useState(false);

  const toggleFailToast = () => setShowFailToast(!showFailToast);

  const onSubmit = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("http://localhost:8080/api/auth/authenticate", user)
      .then((res) => {
        if (res.status === 200) {
        }

        switch (res.status) {
          case 200:
            {
              addToken(res.data.token);
              navigate("/");
            }
            break;
          case 403: {
            toggleFailToast();
          }
        }
      })
      .catch(() => toggleFailToast());
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="logIn">
        <section className="logInFormSection">
          <input
            {...register("email", {
              required: {
                value: true,
                message: "enter email",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "your email is not valid",
              },
            })}
            type="text"
            placeholder="email"
            className="logInFormInput"
          />
          {errors.email && (
            <p className="formErrorMessage">{errors.email.message}</p>
          )}
        </section>

        <section className="logInFormSection">
          <input
            {...register("password", {
              required: "enter password",
            })}
            type="password"
            placeholder="password"
            className="logInFormInput"
          />
          {errors.password && (
            <p className="formErrorMessage">{errors.password.message}</p>
          )}
        </section>

        <section>
          <StandardButton
            handleClick={handleSubmit(onSubmit)}
            type="submit"
            label={"log in"}
          />
        </section>
      </form>

      <AppToast
        title={"log in failed"}
        message={"log in failed"}
        onClose={toggleFailToast}
        show={showFailToast}
        delay={5000}
      />
    </PageContainer>
  );
};

export default LogIn;
