import { useEffect, useState } from "react";
import "./BOMPage.css";
import "../site/CommonStyles.css";
import { uomDictServerClient } from "../../../services/utils";
import "./BOMLinesAddElement.css";
import "../site/CommonStyles.css";

const BOMLinesAddElement = ({
  materialList,
  bomLines,
  setBOMLines,
  line,
  removeMaterial,
}) => {
  const [material, setMaterial] = useState(materialList[0]);
  const { description, storageUOM, price } = material;

  const materialOptions = materialList.map((material) => (
    <option value={material.name} key={material.id}>
      {material.name}
    </option>
  ));

  const handleMaterialSelection = (e) => {
    const selectedName = e.target.value;
    const selectedMaterial = materialList.find(
      (material) => material.name === selectedName
    );
    setMaterial(selectedMaterial);

    const updatedLines = bomLines.map((el) =>
      el.uuid === line.uuid ? { ...el, material: selectedMaterial } : el
    );
    setBOMLines(updatedLines);
  };

  const handleQuantityChange = (e) => {
    const updatedLines = bomLines.map((el) =>
      el.uuid === line.uuid ? { ...el, quantity: e.target.value } : el
    );
    setBOMLines(updatedLines);
  };

  const [cost, setCost] = useState(price * line.quantity);
  useEffect(() => setCost(price * line.quantity), [line.quantity, price, cost]);

  return (
    <>
      <div className="bomLinesAddElement">
        <span className="verticalCenter">
          <select
            onChange={handleMaterialSelection}
            className="inputUpdateText"
          >
            {materialOptions}
          </select>
        </span>

        <span className="listElementText">{description}</span>

        <span className="listElementText">
          {uomDictServerClient[storageUOM]}
        </span>

        <span className="verticalCenter">
          <input
            onChange={handleQuantityChange}
            name="quantity"
            type="number"
            className="inputUpdateNumber"
            defaultValue={line.quantity}
          />
        </span>

        <span className="listElementText">{price}</span>

        <span className="listElementNumber">{cost.toFixed(2)}</span>

        <span className="listElementText">
          <button
            onClick={() => removeMaterial(line.uuid)}
            className="standardButton"
          >
            remove
          </button>
        </span>
      </div>
    </>
  );
};

export default BOMLinesAddElement;
