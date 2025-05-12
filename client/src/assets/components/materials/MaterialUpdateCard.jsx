import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import "./MaterialUpdateCard.css";
import "../site/CommonStyles.css";
import useTokenStore from "../../storage/useTokenStore";

const MaterialUpdateCard = ({ currentMaterial, fetchMaterials }) => {
  const [uomList, setUOMList] = useState([]);
  const token = useTokenStore((state) => state.token);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentMaterial.name,
      description: currentMaterial.description,
      purchaseUOM: currentMaterial.purchaseUOM,
      storageUOM: currentMaterial.storageUOM,
      purchasePrice: currentMaterial.purchasePrice,
      conversionRatio: currentMaterial.ratio,
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials/uom", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUOMList(response.data);
        reset({
          name: currentMaterial.name,
          description: currentMaterial.description,
          purchaseUOM: currentMaterial.purchaseUOM,
          storageUOM: currentMaterial.storageUOM,
          purchasePrice: currentMaterial.purchasePrice,
          conversionRatio: currentMaterial.conversionRatio,
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
      purchaseUOM: data.purchaseUOM,
      storageUOM: data.storageUOM,
      purchasePrice: data.purchasePrice,
      conversionRatio: data.conversionRatio,
    };

    axios
      .put(
        `http://localhost:8080/api/materials/${currentMaterial.id}`,
        material,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

      <section className="materialUpdateCardPurchaseUOM">
        <label className="listElementText">purchase uom</label>
        <select {...register("purchaseUOM")} className="inputText">
          {uomToDisplay}
        </select>
      </section>

      <section className="materialUpdateCardPurchasePrice">
        <input
          {...register("purchasePrice", { required: "enter price" })}
          className="inputNumber"
          type="number"
        />
      </section>

      <section className="materialUpdateCardStorageUOM">
        <label className="listElementText">storage uom</label>
        <select {...register("storageUOM")} className="inputText">
          {uomToDisplay}
        </select>
      </section>

      <section className="materialUpdateCardRatio">
        <input
          {...register("conversionRatio", {
            required: "add conversion ratio",
          })}
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
          <p className="formErrorMessage">{errors.purchasePrice.message}</p>
        )}
        {errors.price && (
          <p className="formErrorMessage">{errors.conversionRatio.message}</p>
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
