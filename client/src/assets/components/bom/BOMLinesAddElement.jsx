import { useEffect, useState } from "react";
import "./BOMPage.css";
import "../site/CommonStyles.css";
import { adjustUOMClient } from "../../../services/utils";
import "./BOMLinesAddElement.css";
import "../site/CommonStyles.css";
import StandardButton from "../buttons/StandardButton";

const BOMLinesAddElement = ({
  materialList,
  bomLines,
  setBOMLines,
  line,
  addMaterial,
}) => {
  const [material, setMaterial] = useState(materialList[0]);
  const [isLast, setIsLast] = useState(false);
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

  useEffect(() => {
    setIsLast(line.uuid === bomLines[bomLines.length - 1].uuid);
  }, [bomLines, line.uuid]);

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
        <span className="listElementText">{adjustUOMClient(uom)}</span>
        <span className="verticalCenter">
          <input
            onChange={handleQuantityChange}
            name="quantity"
            type="number"
            className="inputUpdateNumber"
            required
          />
        </span>
        <span className="listElementText">{price}</span>
      </div>
      {isLast && (
        <StandardButton handleClick={addMaterial} label={"add material"} />
      )}
    </>
  );
};

export default BOMLinesAddElement;
