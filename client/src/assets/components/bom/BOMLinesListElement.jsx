import { useForm } from "react-hook-form";
import { adjustUOMClient, calculateLineCosts } from "../../../services/utils";
import "./BOMLinesListElement.css";
import "../site/CommonStyles.css";
import StandardButton from "../buttons/StandardButton";
import axios from "axios";
import { useEffect, useState } from "react";

const BOMLinesListElement = ({ data, onDelete, materials }) => {
  const { id, material, quantity: initialQuantity } = data;
  const [selectedMaterial, setSelectedMaterial] = useState(material);
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setSelectedMaterial(material);
    setQuantity(initialQuantity);
  }, [data]);

  const handleMaterialChange = (e) => {
    const selectedName = e.target.value;
    const selectedMaterial = materials.find((material) => {
      material.name === selectedName;
    });
    setSelectedMaterial(selectedMaterial);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleDeleteBOMLine = (id) => {
    axios
      .delete(`http://localhost:8080/api/bomlines/${id}`)
      .then(() => onDelete(id))
      .catch((error) => console.log(error));
  };

  const adjustedUOM = adjustUOMClient(selectedMaterial.uom);
  const lineCosts = calculateLineCosts(quantity, selectedMaterial.price);

  const materialOptions = materials.map((material) => (
    <option key={material.id}>{material.name}</option>
  ));

  return (
    <form onSubmit={handleSubmit} className="bomLinesListElement">
      <section className="verticalCenter">
        <select
          {...register("name")}
          onChange={handleMaterialChange}
          className="inputText"
        >
          {materialOptions}
        </select>
      </section>

      <section className="listElementText">
        <span>{selectedMaterial.description}</span>
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
        <span>{selectedMaterial.price.toFixed(3)}</span>
      </section>

      <section className="listElementNumber">
        <span>{lineCosts.toFixed(3)}</span>
      </section>

      <section className="verticalCenter">
        <StandardButton
          handleClick={() => handleDeleteBOMLine(id)}
          label="delete"
        />
      </section>
    </form>
  );
};

export default BOMLinesListElement;
