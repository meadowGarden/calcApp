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
      <section className="materialAddCardName">
        <input
          {...register("name", {
            required: "enter name",
          })}
          placeholder="name"
          className="inputText"
        />
      </section>

      <section className="materialAddCardDescription">
        <input
          {...register("description", {
            required: "enter description",
            minLength: {
              value: 5,
              message: "description must have at least five characters",
            },
            maxLength: {
              value: 100,
              message: "description must not be over hundred characters",
            },
          })}
          placeholder="description"
          className="inputText"
        />
      </section>

      <section className="materialAddCardUOM">
        <select {...register("uom")} className="inputText">
          {uomToDisplay}
        </select>
      </section>

      <section className="materialAddCardPrice">
        <input
          {...register("price", { required: "enter price" })}
          type="number"
          placeholder="price"
          className="inputNumber"
        />
      </section>

      <section className="materialAddCardErrors">
        {errors.name && (
          <p className="formErrorMessage">{errors.name.message}</p>
        )}
        {errors.description && (
          <p className="formErrorMessage">{errors.description.message}</p>
        )}
        {errors.price && (
          <p className="formErrorMessage">{errors.price.message}</p>
        )}
      </section>

      <section className="listElementButton materialAddCardButton">
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
