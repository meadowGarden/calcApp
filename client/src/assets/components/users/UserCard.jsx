import { useForm } from "react-hook-form";
import "./UserCard.css";
import "../site/CommonStyles.css";

const UserCard = ({ user }) => {
  console.log(user);
  const emptyUser = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  };
  const { firstName, lastName, email, role } = user || emptyUser;
  const {
    register,
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

  return (
    <form className="userCard">
      <section>
        <input {...register("firstName")} placeholder="first name" />
      </section>

      <section>
        <input {...register("lastName")} placeholder="last name" />
      </section>

      <section>
        <input {...register("email")} placeholder="email" />
      </section>

      <section>
        <input {...register("role")} placeholder="role" />
      </section>

      <section>
        <input type="submit" value="update" />
      </section>
    </form>
  );
};

export default UserCard;
