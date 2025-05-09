import { useState } from "react";
import BOMLinesListElement from "./BOMLinesListElement";
import { useForm } from "react-hook-form";
import "./BOMDataCard.css";
import StandardButton from "../buttons/StandardButton";
import "../site/CommonStyles.css";
import CostsComparator from "./CostsComparator";
import { adjustUOMClient } from "../../../services/utils";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BOMDataCard = ({ bom, materials, fetchBOM, uomList }) => {
  const currentCost = bom.costs;

  const updatedBOM = { ...bom };
  const { costs, entity } = updatedBOM;
  const { name, description, bomLines, uom } = entity;
  const [unitOfMeasurement, setUnitOfMeasurement] = useState(uom || uomList[0]);
  const [lines, setLines] = useState(bomLines || []);

  const [isUpdated, setIsUpdated] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: { name: name, description: description, costs: costs },
  });

  const handleLineDelete = (id) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  const handleLineAdd = () => {
    const uuid = uuidv4();
    const newLine = {
      id: uuid,
      quantity: 1,
      material: materials[0],
    };
    setLines((prev) => [...prev, newLine]);
  };

  const uomOptions = uomList.map((uom) => (
    <option key={uom} value={uom}>
      {adjustUOMClient(uom)}
    </option>
  ));

  const handleUOMChange = (e) => {
    const newUOM = uomList.find((uom) => uom === e.target.value);
    setUnitOfMeasurement(newUOM);
  };

  const updateBOM = (data) => {
    const adjustedLines = lines.map((line) =>
      typeof line.id === "string" ? { ...line, id: 0 } : { ...line }
    );

    const newEntity = {
      ...entity,
      bomLines: adjustedLines,
      name: data.name,
      description: data.description,
      uom: unitOfMeasurement,
    };

    axios
      .put(`http://localhost:8080/api/bom/${entity.id}`, newEntity)
      .then((res) => {
        console.log(res);
        fetchBOM();
      })
      .catch((error) => console.log(error));
  };

  const bomLinesToDisplay = lines.map((line) => (
    <BOMLinesListElement
      key={line.id}
      data={line}
      onDelete={handleLineDelete}
      materials={materials}
      lines={lines}
      setLines={setLines}
    />
  ));

  return (
    <div className="bomDataCard">
      <form className="bomDataCardMainInfo">
        <section>
          <input {...register("name")} className="inputText" />
        </section>

        <section>
          <input {...register("description")} className="inputText" />
        </section>

        <section>
          <CostsComparator
            current={currentCost}
            updated={costs}
            isUpdated={isUpdated}
          />
        </section>

        <section>
          <select onChange={handleUOMChange}>{uomOptions}</select>
        </section>

        <section className="bomDataCardButtons">
          <StandardButton
            handleClick={() => {
              console.log("cancel");
            }}
            label="cancel"
          />
          <StandardButton
            handleClick={handleSubmit(updateBOM)}
            label="update"
          />
          <StandardButton handleClick={handleLineAdd} label="add line" />
        </section>
      </form>

      <section className="bomDataCardLines">{bomLinesToDisplay}</section>
    </div>
  );
};

export default BOMDataCard;
