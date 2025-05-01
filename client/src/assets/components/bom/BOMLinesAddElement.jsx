import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BOMLinesAddElement = ({ materialList, bomLines, uomList }) => {
  const [material, setMaterial] = useState(materialList[0]);
  const { name, description, uom, price } = material;

  const handleMaterialSelection = (e) => {
    const selectedName = e.target.value;
    const selectedMaterial = materialList.find((m) => m.name === selectedName);
    setMaterial(selectedMaterial);
  };

  const materialOptions = materialList.map((material) => (
    <option value={material.name} key={material.id}>
      {material.name}
    </option>
  ));

  return (
    <form>
      <select onChange={handleMaterialSelection}>{materialOptions}</select>
      <span>{name}</span>
      <span>{description}</span>
      <span>{uom}</span>
      <input />
      <span>{price}</span>
    </form>
  );
};

export default BOMLinesAddElement;
