import { useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import axios from "axios";
import { useState } from "react";
import BOMLinesAddElement from "./BOMLinesAddElement";
import { v4 as uuidv4 } from "uuid";
import "./BOMCreateCard.css";
import "../site/CommonStyles.css";
import useUserStore from "../../storage/useUserStore";

const BOMCreateCard = ({ uomList, materialList, fetchBOM }) => {
  const [bomLines, setBOMLines] = useState([]);
  const uuid = uuidv4();
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      uom: uomList[0],
    },
  });

  const uomOptions = uomList.map((uom) => (
    <option value={uom} key={uom}>
      {adjustUOMClient(uom)}
    </option>
  ));

  const createBOM = (data) => {
    const bom = {
      name: data.name,
      description: data.description,
      uom: data.uom,
      bomLines: bomLines,
    };

    axios
      .post("http://localhost:8080/api/bom", bom, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log(res);
        fetchBOM();
      })
      .catch((error) => console.log(error));
  };

  const addMaterial = () => {
    const line = { uuid: uuid, quantity: 1, material: materialList[0] };
    setBOMLines((bomLines) => [...bomLines, line]);
  };

  const removeMaterial = (uuid) => {
    const newLines = bomLines.filter((line) => line.uuid !== uuid);
    setBOMLines(newLines);
  };

  const bomLinesToDisplay = bomLines.map((line) => {
    return (
      <BOMLinesAddElement
        key={line.uuid}
        line={line}
        bomLines={bomLines}
        materialList={materialList}
        setBOMLines={setBOMLines}
        addMaterial={addMaterial}
        removeMaterial={removeMaterial}
      />
    );
  });

  return (
    <div className="BOMCreateCard">
      <form className="BOMCreateCardMain">
        <section className="bomCreateButton">
          <StandardButton
            handleClick={handleSubmit(createBOM)}
            type="submit"
            label="create"
          />
        </section>

        <section className="bomCreateInputName">
          <input
            {...register("name", {
              required: "enter product name",
              minLength: {
                value: 4,
                message: "name should be at least 4 characters",
              },
              maxLength: {
                value: 15,
                message: "description must not be over 15 characters ",
              },
            })}
            placeholder="product name"
            className="inputText"
          />
        </section>

        <section className="bomCreateInputDescription">
          <input
            {...register("description", {
              required: "enter product description",
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

        <section className="bomCreateInputUOM">
          <select className="inputText">{uomOptions}</select>
        </section>

        <section className="materialAddCardErrors">
          {errors.name && (
            <p className="formErrorMessage">{errors.name.message}</p>
          )}
          {errors.description && (
            <p className="formErrorMessage">{errors.description.message}</p>
          )}
        </section>
      </form>

      <section className="bomCreateLines">
        <section className="bomCreateLinesButton">
          <StandardButton handleClick={addMaterial} label="add material" />
        </section>
        {bomLinesToDisplay}
      </section>
    </div>
  );
};

export default BOMCreateCard;
