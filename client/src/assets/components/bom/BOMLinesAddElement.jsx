import { useEffect, useRef, useState } from "react";
import "./BOMPage.css";
import "../site/CommonStyles.css";
import { uomDictServerClient } from "../../../services/utils";
import "./BOMLinesAddElement.css";
import "../site/CommonStyles.css";
import DropDownWithSearch from "../site/dropDown/DropDownWithSearch";
import useOutsideDetector from "../../hooks/useOutsideDetector";

const BOMLinesAddElement = ({
  materialList,
  bomLines,
  setBOMLines,
  line,
  removeMaterial,
}) => {
  const [material, setMaterial] = useState(materialList[0]);
  const { description, storageUOM, price } = material;
  const [isMaterialSelectionVisible, setIsMaterialSelectionVisible] =
    useState(false);
  const materialMenu = useRef(null);

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
    setIsMaterialSelectionVisible(false);
  };

  const handleQuantityChange = (e) => {
    const updatedLines = bomLines.map((el) =>
      el.uuid === line.uuid ? { ...el, quantity: e.target.value } : el
    );
    setBOMLines(updatedLines);
  };

  const [cost, setCost] = useState(price * line.quantity);
  useEffect(() => setCost(price * line.quantity), [line.quantity, price, cost]);

  const toggleMaterialMenuVisibility = () => {
    setIsMaterialSelectionVisible(!isMaterialSelectionVisible);
  };

  useOutsideDetector(materialMenu, () => setIsMaterialSelectionVisible(false));

  return (
    <div className="bomLinesAddElement">
      <section className="bomLineMaterialSelection" ref={materialMenu}>
        <button
          onClick={toggleMaterialMenuVisibility}
          className="dropMenuButton"
        >
          {material.name}
        </button>
        {isMaterialSelectionVisible && (
          <DropDownWithSearch
            rawList={materialList}
            onElementSelect={handleMaterialSelection}
          />
        )}
      </section>

      <span className="listElementText">{description}</span>

      <span className="listElementText">{uomDictServerClient[storageUOM]}</span>

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
  );
};

export default BOMLinesAddElement;
