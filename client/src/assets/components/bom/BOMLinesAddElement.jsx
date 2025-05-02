import { useState } from "react";
import "./BOMPage.css";

const BOMLinesAddElement = ({ materialList, bomLines, line }) => {
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
    const bomLineToUpdate = bomLines.find((el) => el.uuid === line.uuid);
    bomLineToUpdate.material = selectedMaterial;
  };

  const handleQuantityChange = (e) => {
    const bomLineToUpdate = bomLines.find((el) => el.uuid === line.uuid);
    bomLineToUpdate.quantity = e.target.value;
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
