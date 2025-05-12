import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer.jsx";
import StandardButton from "../buttons/StandardButton.jsx";
import axios from "axios";
import useTokenStore from "../../storage/useTokenStore.js";
import "./LogIn.css";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addToken = useTokenStore((state) => state.addToken);

  const onSubmit = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("http://localhost:8080/api/auth/authenticate", user)
      .then((res) => {
        console.log(res);
        if (res.status === 200) addToken(res.data.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="logIn">
        <section className="logInFormSection">
          <input
            {...register("email")}
            placeholder="email"
            className="logInFormInput"
          />
        </section>

        <section className="logInFormSection">
          <input
            {...register("password")}
            placeholder="password"
            className="logInFormInput"
          />
        </section>

        <section>
          <StandardButton
            handleClick={handleSubmit(onSubmit)}
            type="submit"
            label={"log in"}
          />
        </section>
      </form>
    </PageContainer>
  );
};

export default LogIn;
