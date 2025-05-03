import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import "./MaterialUpdateCard.css";

const MaterialUpdateCard = ({ currentMaterial, fetchMaterials }) => {
  const [uomList, setUOMList] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, setError },
  } = useForm({
    defaultValues: {
      name: currentMaterial.name,
      description: currentMaterial.description,
      uom: currentMaterial.uom,
      price: currentMaterial.price,
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials/uom")
      .then((response) => {
        setUOMList(response.data);
        setValue("uom", response.data[0]);
      })
      .catch((error) => console.log(error));
  }, [setValue]);

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

  return (
    <form className="materialUpdateCard">
      <section>
        <input
          {...register("name", {
            required: "you must enter name",
          })}
          placeholder="name"
          className="materialField"
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
              value: 100,
              message: "description must not be over hundred characters",
            },
          })}
          placeholder="description"
          className="materialField"
        />
        {errors.description && <div>{errors.description.message}</div>}
      </section>

      <section>
        <select
          {...register("uom")}
          placeholder="uom"
          className="materialField"
        >
          {uomToDisplay}
        </select>
      </section>

      <section>
        <input
          {...register("price", { required: "you must enter price" })}
          placeholder="price"
          className="materialField"
        />
        {errors.price && <div>{errors.price.message}</div>}
      </section>

      <StandardButton
        handleClick={handleSubmit(onSubmit)}
        type="submit"
        label="update"
      />
    </form>
  );
};

export default MaterialUpdateCard;
