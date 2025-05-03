import { useState } from "react";
import "./BOMPage.css";
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
    <form className="bomLineCalc">
      <select onChange={handleMaterialSelection}>{materialOptions}</select>
      <span>{description}</span>
      <span>{uom}</span>
      <input onChange={handleQuantityChange} name="quantity" />
      <span>{price}</span>
      {/* <span>{cost}</span> */}
    </form>
  );
};

export default BOMLinesAddElement;
