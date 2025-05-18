import { useForm } from "react-hook-form";
import "./UsersPaginationPanel.css";
import { itemsCount } from "../../../services/constants";
import { displayToValue, sortByDictDisplay } from "../../../services/utils";

const UsersPaginationPanel = ({ setPaginationSettings }) => {
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

  const onSubmit = (data) => {
    const newPaginationSettings = {
      firstNameContains: data.firstName,
      lastNameContains: data.lastName,
      pageNumber: data.pageNumber,
      numberOfItems: data.numberOfItems,
      sortBy: data.sortBy,
      sortAsc: data.sortAsc,
    };
    setPaginationSettings(newPaginationSettings);
  };

  const sortByOptions = sortByDictDisplay.get("users").map((el) => (
    <option key={el} value={displayToValue.get(el)}>
      {el}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="usersPaginationPanel">
      <section>
        <input {...register("firstName")} placeholder="first name" />
      </section>

      <section>
        <input {...register("lastName")} placeholder="last name" />
      </section>

      <section>
        <label>page</label>
        <select {...register("pageNumber")}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </section>

      <section>
        <label>users to display</label>
        <select {...register("numberOfItems")}>{usersToDisplay}</select>
      </section>

      <section>
        <label>sort by</label>{" "}
        <select {...register("sortBy")}>{sortByOptions}</select>
      </section>

      <section>
        <label>sort</label>
        <select {...register("sortAsc")}>
          <option value={true}>ascending</option>
          <option value={false}>descending</option>
        </select>
      </section>

      <section>
        <input type="submit" value="filter" />
      </section>
    </form>
  );
};

export default UsersPaginationPanel;
