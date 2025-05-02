import { useState } from "react";

const BOMLinesAddElement = ({ materialList, bomLines, setBOMLines, line }) => {
  const [material, setMaterial] = useState(materialList[0]);
  const { name, description, uom, price } = material;

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
    <form>
      <select onChange={handleMaterialSelection}>{materialOptions}</select>
      <span>{name}</span>
      <span>{description}</span>
      <span>{uom}</span>
      <input onChange={handleQuantityChange} name="quantity" />
      <span>{price}</span>
    </form>
  );
};

export default BOMLinesAddElement;
