import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import "./MaterialUpdateCard.css";
import "../site/CommonStyles.css";

const MaterialUpdateCard = ({ currentMaterial, fetchMaterials }) => {
  const [uomList, setUOMList] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials/uom")
      .then((response) => {
        setUOMList(response.data);
        reset({
          name: currentMaterial.name,
          description: currentMaterial.description,
          uom: currentMaterial.uom,
          price: currentMaterial.price,
        });
      })
      .catch((error) => console.log(error));
  }, [reset, currentMaterial]);

  const uomToDisplay = uomList.map((uom) => (
    <option value={uom} key={uom}>
      {adjustUOMClient(uom)}
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
      .put(
        `http://localhost:8080/api/materials/${currentMaterial.id}`,
        material
      )
      .then(() => {
        fetchMaterials();
      })
      .catch((error) => console.log(error));
  };

  if (uomList.length === 0) return null;

  return (
    <form className="materialUpdateCard">
      <section className="materialUpdateCardName">
        <input
          {...register("name", {
            required: "enter name",
          })}
          placeholder="name"
          className="inputText"
        />
      </section>

      <section className="materialUpdateCardDescription">
        <input
          {...register("description", {
            required: "enter decription",
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

      <section className="materialUpdateCardUOM">
        <select {...register("uom")} placeholder="uom" className="inputText">
          {uomToDisplay}
        </select>
      </section>

      <section className="materialAddCardPrice">
        <input
          {...register("price", { required: "enter price" })}
          placeholder="price"
          className="inputNumber"
          type="number"
        />
      </section>

      <section className="materialUpdateCardErrors">
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

      <section className="listElementButton materialUpdateCardButton">
        <StandardButton
          handleClick={handleSubmit(onSubmit)}
          type="submit"
          label="update"
        />
      </section>
    </form>
  );
};

export default MaterialUpdateCard;
