import { useForm } from "react-hook-form";
import { adjustUOMClient, calculateLineCosts } from "../../../services/utils";
import "./BOMLinesListElement.css";
import "../site/CommonStyle.css";
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
    const newMaterial = materials.find((material) => {
      material.name = e.target.value;
    });
    setSelectedMaterial(newMaterial);
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

  const materialsToDisplay = materials.map((material) => (
    <option key={material.id}>{material.name}</option>
  ));

  return (
    <form onSubmit={handleSubmit} className="bomLinesListElement">
      <select
        {...register("name")}
        value={selectedMaterial.name}
        onChange={handleMaterialChange}
        className="bomLinesField width9em"
      >
        {materialsToDisplay}
      </select>
      <input
        type="text"
        value={selectedMaterial.description}
        className="bomLinesField width21em"
        readOnly
      />
      <input
        {...register("quantity")}
        type="text"
        defaultValue={quantity}
        className="bomLinesField width3em"
      />
      <input
        {...register("uom")}
        type="text"
        defaultValue={adjustedUOM}
        className="bomLinesField width3em"
      />
      <input
        type="text"
        value={selectedMaterial.price}
        className="bomLinesField width3em"
        readOnly
      />
      <input
        type="text"
        value={lineCosts}
        className="bomLinesField width3em"
        readOnly
      />
      <StandardButton
        handleClick={() => handleDeleteBOMLine(id)}
        label="delete"
      />
    </form>
  );
};

export default BOMLinesListElement;
