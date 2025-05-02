import { set, useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import axios from "axios";
import { useState } from "react";
import BOMLinesAddElement from "./BOMLinesAddElement";
import { v4 as uuidv4 } from "uuid";

const BOMCreateCard = ({ uomList, materialList, fetchBOM }) => {
  const [bomLines, setBOMLines] = useState([]);
  const uuid = uuidv4();
  const { register, handleSubmit } = useForm({
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
      .post("http://localhost:8080/api/bom", bom)
      .then((res) => {
        console.log(res);
        fetchBOM();
      })
      .catch((error) => console.log(error));
  };

  const addMaterial = () => {
    const line = { uuid: uuid, quantity: 0, material: materialList[0] };
    setBOMLines((bomLines) => [...bomLines, line]);
  };

  const bomLinesToDisplay = bomLines.map((line) => {
    return (
      <BOMLinesAddElement
        key={line.uuid}
        line={line}
        bomLines={bomLines}
        materialList={materialList}
        setBOMLines={setBOMLines}
      />
    );
  });

  return (
    <>
      <form>
        <section>
          <input {...register("name")} placeholder="product name" />
        </section>
        <section>
          <input {...register("description")} placeholder="description" />
        </section>
        <select>{uomOptions}</select>

        <StandardButton handleClick={addMaterial} label="add material" />
        <StandardButton
          handleClick={handleSubmit(createBOM)}
          type="submit"
          label="create"
        />
      </form>
      {bomLinesToDisplay}
    </>
  );
};

export default BOMCreateCard;
