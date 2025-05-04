import { useState } from "react";
import "./BOMPage.css";
import "../site/CommonStyles.css";
import { adjustUOMClient } from "../../../services/utils";
import "./BOMLinesAddElement.css";
import "../site/CommonStyles.css";

const BOMLinesAddElement = ({ materialList, bomLines, setBOMLines, line }) => {
  const [material, setMaterial] = useState(materialList[0]);
  const { description, uom, price } = material;

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

  return (
    <form className="bomLinesAddElement">
      <span className="verticalCenter">
        <select onChange={handleMaterialSelection} className="inputUpdateText">
          {materialOptions}
        </select>
      </span>
      <span className="listElementText">{description}</span>
      <span className="listElementText">{adjustUOMClient(uom)}</span>
      <span className="verticalCenter">
        <input
          onChange={handleQuantityChange}
          name="quantity"
          type="number"
          className="inputUpdateText"
        />
      </span>
      <span className="listElementText">{price}</span>
      {/* <span>{cost}</span> */}
    </form>
  );
};

export default BOMLinesAddElement;
