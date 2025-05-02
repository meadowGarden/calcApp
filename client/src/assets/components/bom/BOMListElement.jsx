import "./BOMListElement.css";
import "../../../services/utils.js";
import { adjustUOMClient } from "../../../services/utils.js";
import StandardButton from "../buttons/StandardButton.jsx";
import axios from "axios";

function BOMListElement({ data, handleClick, fetchBOM }) {
  const { name, description, uom } = data.entity;
  const adjustedUOM = adjustUOMClient(uom);
  const costs = data.costs;

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/bom/${id}`)
      .then((res) => {
        console.log(res);
        fetchBOM();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div onClick={() => handleClick(data)} className="bomListElement">
      <span>{name}</span>
      <span>{description}</span>
      <span>{adjustedUOM}</span>
      <span>{costs}</span>
      <StandardButton
        handleClick={() => handleDelete(data.entity.id)}
        label="delete"
      />
    </div>
  );
}

export default BOMListElement;
