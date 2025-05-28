import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uomDictServerClient } from "../../../services/utils";
import "./MaterialUpdateCard.css";
import "../site/CommonStyles.css";
import useUserStore from "../../storage/useUserStore";

const MaterialUpdateCard = ({
  currentMaterial,
  fetchMaterials,
  closeCard,
  showToast,
  setToastInfo,
  deleteMaterial,
}) => {
  const [uomList, setUOMList] = useState([]);
  const user = useUserStore((state) => state.user);
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
        headers: { Authorization: `Bearer ${user.token}` },
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
      .catch(() => {
        setToastInfo({
          title: "failure",
          message: "could not fetch data",
          status: "failure",
          delay: 3000,
        });
        showToast();
      });
  }, [reset, currentMaterial]);

  const uomToDisplay = uomList.map((uom) => (
    <option value={uom} key={uom}>
      {uomDictServerClient[uom]}
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
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        fetchMaterials();
        closeCard();
        showToast();
        setToastInfo({
          title: "success",
          message: "material updated successfully",
          status: "success",
          delay: 3000,
        });
      })
      .catch((error) => {
        showToast();
        setToastInfo({
          title: "failure to update",
          message: `${error.response.data}`,
          status: "failure",
          delay: 3000,
        });
      });
  };

  if (uomList.length === 0) return null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="materialUpdateCard">
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
            step={0.01}
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
            step={0.01}
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
          <input type="submit" value={"update"} className="standardButton" />
        </section>
      </form>
      <button
        onClick={() => deleteMaterial(currentMaterial.id)}
        className="elementDeleteButton"
      >
        delete
      </button>
    </>
  );
};

export default MaterialUpdateCard;
