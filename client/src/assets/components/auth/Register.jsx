import { useForm } from "react-hook-form";
import PageContainer from "../site/PageContainer.jsx";
import "./Register.css";
import StandardButton from "../buttons/StandardButton.jsx";
import useTokenStore from "../../storage/useTokenStore.js";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addToken = useTokenStore((state) => state.addToken);

  const onSubmit = (data) => {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.repeatPassword,
    };

    axios
      .post("http://localhost:8080/api/auth/register", user)
      .then((res) => {
        if (res.status === 201) addToken(res.data.token);
      })
      .catch((error) => console.log(error));
  };

  return (
    <PageContainer>
      <form className="registerFrom" onSubmit={handleSubmit(onSubmit)}>
        <section className="registerFormSection">
          <input
            {...register("firstName")}
            placeholder="first name"
            className="registerFormInput"
          />
        </section>

        <section className="registerFormSection">
          <input
            {...register("lastName")}
            placeholder="last name"
            className="registerFormInput"
          />
        </section>

        <section className="registerFormSection">
          <input
            {...register("email")}
            placeholder="email"
            className="registerFormInput"
          />
        </section>

        <section className="registerFormSection">
          <input
            {...register("password")}
            placeholder="password"
            className="registerFormInput"
          />
        </section>

        <section className="registerFormSection">
          <input
            {...register("repeatPassword")}
            placeholder="repeat password"
            className="registerFormInput"
          />
        </section>

        <section className="registerFormSection">
          <StandardButton
            handleClick={handleSubmit(onSubmit)}
            label={"submit"}
            className="registerFormInput"
          />
        </section>
      </form>
    </PageContainer>
  );
};

export default Register;
