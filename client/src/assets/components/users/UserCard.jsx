import { useForm } from "react-hook-form";
import "./UserCard.css";
import "../site/CommonStyles.css";
import { roleDictServerClient } from "../../../services/utils";

const UserCard = ({ user, onSuccessTitle, onSubmit, rolesList }) => {
  const emptyUser = {
    firstName: "",
    lastName: "",
    email: "",
    role: "USER",
  };
  const { firstName, lastName, email, role } = user || emptyUser;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
    },
  });

  const rolesOptions = rolesList.map((role) => (
    <option key={role} value={role}>
      {roleDictServerClient[role]}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="userCard">
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
              message: "first name should not be more that hundred characters",
            },
          })}
          placeholder="first name"
          className="inputText"
        />
        {errors.firstName && (
          <span className="formErrorMessage">{errors.firstName.message}</span>
        )}
      </section>

      <section>
        <input
          {...register("lastName", {
            required: false,
            maxLength: {
              value: 100,
              message: "last name should not be more that hundred characters",
            },
          })}
          placeholder="last name"
          className="inputText"
        />
        {errors.lastName && (
          <span className="formErrorMessage">{errors.lastName.message}</span>
        )}
      </section>

      <section>
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
          <span className="formErrorMessage">{errors.email.message}</span>
        )}
      </section>

      <section>
        <select {...register("role")} className="inputText">
          {rolesOptions}
        </select>
      </section>

      {user === undefined && (
        <section>
          <input
            {...register("password", {
              required: "enter password",
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
      )}

      {user === undefined && (
        <section>
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
      )}

      <section>
        <input
          type="submit"
          readOnly={true}
          value={onSuccessTitle}
          className="standardButton"
        />
      </section>
    </form>
  );
};

export default UserCard;
