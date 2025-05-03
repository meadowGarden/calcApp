import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import "./MaterialAddCard.css";
import "../site/CommonStyles.css";

const MaterialAddCard = ({ fetchMaterials }) => {
  const [uomList, setUOMList] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, setError },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials/uom")
      .then((response) => {
        setUOMList(response.data);
        setValue("uom", response.data[0]);
      })
      .catch((error) => console.log(error));
  }, [setValue]);

  const uomToDisplay = uomList.map((u) => (
    <option value={u} key={u}>
      {adjustUOMClient(u)}
    </option>
  ));

  const onSubmit = async (data) => {
    const material = {
      name: data.name,
      description: data.description,
      uom: data.uom,
      price: data.price,
    };

    axios
      .post("http://localhost:8080/api/materials", material)
      .then(() => {
        fetchMaterials();
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="materialAddCard">
      <section>
        <input
          {...register("name", {
            required: "you must enter name",
          })}
          placeholder="name"
          className="inputText"
        />
        {errors.name && <div>{errors.name.message}</div>}
      </section>

      <section>
        <input
          {...register("description", {
            required: "you must enter name",
            minLength: {
              value: 5,
              message: "description must have at least five characters",
            },
            maxLength: {
              value: 50,
              message: "description must not be over fifty characters",
            },
          })}
          placeholder="description"
          className="inputText"
        />
        {errors.description && <div>{errors.description.message}</div>}
      </section>

      <section>
        <select {...register("uom")} className="inputText">
          {uomToDisplay}
        </select>
      </section>

      <section>
        <input
          {...register("price", { required: "you must enter price" })}
          placeholder="price"
          className="inputText"
        />
        {errors.price && <div>{errors.price.message}</div>}
      </section>
      <section className="listElementButton">
        <StandardButton
          handleClick={handleSubmit(onSubmit)}
          type="submit"
          label="add"
        />
      </section>
    </form>
  );
};

export default MaterialAddCard;
