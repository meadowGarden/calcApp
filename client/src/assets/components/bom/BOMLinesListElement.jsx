import { useForm } from "react-hook-form";
import {
  calculateLineCosts,
  uomDictServerClient,
} from "../../../services/utils.js";
import "./BOMLinesListElement.css";
import "../site/CommonStyles.css";
import { useRef, useState } from "react";
import DropDownWithSearch from "../site/dropDown/DropDownWithSearch.jsx";
import useOutsideDetector from "../../hooks/useOutsideDetector.jsx";

const BOMLinesListElement = ({
  data,
  onDelete,
  materials,
  lines,
  setLines,
}) => {
  const { id, material, quantity: initialQuantity } = data;
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isMaterialSelectionVisible, setIsMaterialSelectionVisible] =
    useState(false);
  const materialMenu = useRef(false);

  const handleMaterialChange = (e) => {
    const selectedName = e.target.value;
    const selectedMaterial = materials.find(
      (material) => material.name === selectedName
    );

    const newLines = lines.map((line) =>
      line.id === id ? { ...line, material: selectedMaterial } : line
    );

    setLines(newLines);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    const newLines = lines.map((line) =>
      line.id === id ? { ...line, quantity: newQuantity } : line
    );
    setLines(newLines);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: material.name } });

  const adjustedUOM = uomDictServerClient[material.storageUOM];
  const lineCosts = calculateLineCosts(quantity, material.price);

  const toggleMaterialMenuVisibility = () => {
    setIsMaterialSelectionVisible(!isMaterialSelectionVisible);
  };

  useOutsideDetector(materialMenu, () => setIsMaterialSelectionVisible(false));

  return (
    <form onSubmit={handleSubmit} className="bomLinesListElement">
      <section className="bomLineMaterialSelection" ref={materialMenu}>
        <button
          type="button"
          onClick={toggleMaterialMenuVisibility}
          className="dropMenuButton"
        >
          {material.name}
        </button>
        {isMaterialSelectionVisible && (
          <DropDownWithSearch
            rawList={materials}
            onElementSelect={handleMaterialChange}
          />
        )}
      </section>

      <section className="listElementText">
        <span>{material.description}</span>
      </section>

      <section>
        <input
          {...register("quantity")}
          type="text"
          defaultValue={quantity}
          className="inputNumber"
          onChange={handleQuantityChange}
        />
      </section>

      <section className="listElementText">
        <span>{adjustedUOM}</span>
      </section>

      <section className="listElementNumber">
        <span>{material.price.toFixed(3)}</span>
      </section>

      <section className="listElementNumber">
        <span>{lineCosts.toFixed(3)}</span>
      </section>

      <section className="verticalCenter">
        <button onClick={() => onDelete(id)} className="standardButton">
          delete
        </button>
      </section>
    </form>
  );
};

export default BOMLinesListElement;
