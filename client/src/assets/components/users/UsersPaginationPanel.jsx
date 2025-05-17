import { useForm } from "react-hook-form";
import "./UsersPaginationPanel.css";
import { itemsCount } from "../../../services/constants";

const UsersPaginationPanel = (onSubmit, setPaginationSettings) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const usersToDisplay = itemsCount.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <>
      <div className="usersPaginationPanel">miau</div>
      <form onSubmit={handleSubmit(onSubmit)} className="usersPaginationPanel">
        <section>
          <input placeholder="first name" />
        </section>

        <section>
          <input placeholder="last name" />
        </section>

        <section>
          <label>users to display</label>
          <select>{usersToDisplay}</select>
        </section>

        <section>
          <label>page</label>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </section>

        <section>
          <label>sort by</label>{" "}
          <select>
            <option>first name</option>
            <option>last name</option>
            <option>email</option>
          </select>
        </section>

        <section>
          <label>sort</label>
          <select>
            <option>ascending</option>
            <option>descending</option>
          </select>
        </section>
      </form>
    </>
  );
};

export default UsersPaginationPanel;
