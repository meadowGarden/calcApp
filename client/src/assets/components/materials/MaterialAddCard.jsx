import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import "./MaterialAddCard.css";
import "../site/CommonStyles.css";
import useTokenStore from "../../storage/useTokenStore";

const MaterialAddCard = ({ fetchMaterials, closeCard, showAddToast }) => {
  const [uomList, setUOMList] = useState([]);
  const [summary, setSummary] = useState("");
  const [isUOMDiffer, setIsUOMDiffer] = useState(false);
  const token = useTokenStore((state) => state.token);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials/uom", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUOMList(response.data);
        setValue("purchaseUOM", response.data[0]);
      })
      .catch((error) => console.log(error));
  }, [setValue]);

  const uomToDisplay = uomList.map((u) => (
    <option value={u} key={u}>
      {adjustUOMClient(u)}
    </option>
  ));

  const handleUOMCheck = () => {
    setIsUOMDiffer(!isUOMDiffer);
  };

  const onSubmit = async (data) => {
    const material = {
      name: data.name,
      description: data.description,
      purchaseUOM: data.purchaseUOM,
      storageUOM: data.storageUOM,
      purchasePrice: data.purchasePrice,
      conversionRatio: data.ratio,
    };

    axios
      .post("http://localhost:8080/api/materials", material, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchMaterials();
        closeCard();
        showAddToast();
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
              message: "description must have at least 5 characters",
            },
            maxLength: {
              value: 100,
              message: "description must not be over 100 characters",
            },
          })}
          placeholder="description"
          className="inputText"
        />
      </section>

      <section className="materialAddCardPurchaseUOM">
        <label className="listElementText">purchase uom</label>
        <select {...register("purchaseUOM")} className="inputText">
          {uomToDisplay}
        </select>
      </section>

      <section className="materialAddCardPurchasePrice">
        <input
          {...register("purchasePrice", { required: "enter price" })}
          type="number"
          placeholder="price"
          className="inputNumber"
        />
      </section>

      <section className="materialAddCardIsConvertable">
        <label htmlFor="isConvertable" className="listElementText">
          purchase/ storage differs
        </label>
        <input
          onChange={handleUOMCheck}
          type="checkbox"
          id="isConvertable"
          className="listElementText"
        />
      </section>

      {isUOMDiffer && (
        <section className="materialAddCardStorageUOM">
          <label className="listElementText">storage uom</label>
          <select {...register("storageUOM")} className="inputText">
            {uomToDisplay}
          </select>
        </section>
      )}

      {isUOMDiffer && (
        <section className="materialAddCardStorageRatio">
          <input
            {...register("ratio", { required: "add conversion ratio" })}
            type="number"
            placeholder="ratio"
            className="inputNumber"
          />
        </section>
      )}

      {isUOMDiffer && summary !== "" && (
        <section className="materialAddCardSummary">
          <span>{summary}</span>
        </section>
      )}

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
        {isUOMDiffer && errors.ratio && (
          <p className="formErrorMessage">{errors.ratio.message}</p>
        )}
      </section>

      <section className="listElementButton materialAddCardButton">
        <StandardButton
          type="submit"
          handleClick={handleSubmit(onSubmit)}
          label="add"
        />
      </section>
    </form>
  );
};

export default MaterialAddCard;
