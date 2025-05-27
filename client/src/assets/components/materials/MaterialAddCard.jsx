import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uomDictServerClient } from "../../../services/utils";
import "./MaterialAddCard.css";
import "../site/CommonStyles.css";
import useUserStore from "../../storage/useUserStore.js";

const MaterialAddCard = ({
  fetchMaterials,
  closeCard,
  showToast,
  setToastInfo,
}) => {
  const [uomList, setUOMList] = useState([]);
  const [summary, setSummary] = useState("");
  const [isUOMDiffer, setIsUOMDiffer] = useState(false);
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials/uom", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setUOMList(response.data);
        setValue("purchaseUOM", response.data[0]);
      })
      .catch((error) => console.log(error));
  }, [setValue]);

  const uomToDisplay = uomList.map((uom) => (
    <option value={uom} key={uom}>
      {uomDictServerClient[uom]}
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
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        fetchMaterials();
        closeCard();
        showToast();
        setToastInfo({
          title: "success",
          message: "material added successfully",
          status: "success",
          delay: 3000,
        });
      })
      .catch((error) => {
        switch (error.status) {
          case 409: {
            showToast();
            setToastInfo({
              title: "failure",
              message: error.response.data,
              status: "failure",
              delay: 3000,
            });
            break;
          }
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="materialAddCard">
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
          step={0.01}
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
            step={0.01}
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
        {errors.purchasePrice && (
          <p className="formErrorMessage">{errors.purchasePrice.message}</p>
        )}
        {isUOMDiffer && errors.ratio && (
          <p className="formErrorMessage">{errors.ratio.message}</p>
        )}
      </section>

      <section className="listElementButton materialAddCardButton">
        <input type="submit" className="standardButton" value={"add"} />
      </section>
    </form>
  );
};

export default MaterialAddCard;
