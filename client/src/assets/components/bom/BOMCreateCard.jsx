import { set, useForm } from "react-hook-form";
import { adjustUOMClient } from "../../../services/utils";
import StandardButton from "../buttons/StandardButton";
import axios from "axios";
import { useState } from "react";
import BOMLinesAddElement from "./BOMLinesAddElement";

const BOMCreateCard = ({ uomList, materialList, fetchBOM }) => {
  const [bomLines, setBOMLines] = useState([]);
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

  const createBOM = async (data) => {
    const adjustedBomlines = bomLines.map((e) => {
      return { quantity: e.qty, material: materialList.find(e.id) };
    });

    const bom = {
      name: data.name,
      description: data.description,
      uom: data.uom,
      bomLines: adjustedBomlines,
    };

    axios
      .post("http://localhost:8080/api/bom", bom)
      .then((res) => {
        console.log(res);
        fetchBOM();
      })
      .catch((error) => console.log(error));
  };

  const bomLinesToDisplay = bomLines.map((line, i) => {
    return (
      <BOMLinesAddElement
        key={i}
        data={line}
        materialList={materialList}
        uomList={uomList}
      />
    );
  });

  const addMaterial = () => {
    const line = {
      id: "",
      name: "",
      description: "",
      qty: "",
      uom: "",
      price: 0.0,
    };
    setBOMLines((bomLines) => [...bomLines, line]);
  };

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
