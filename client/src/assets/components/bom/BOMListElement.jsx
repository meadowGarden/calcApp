import "./BOMListElement.css";
import "../../../services/utils.js";
import { adjustUOMClient } from "../../../services/utils.js";

function BOMListElement({ data, handleClick }) {
  const { name, description, uom } = data.entity;
  const adjustedUOM = adjustUOMClient(uom);
  const costs = data.costs;

  return (
    <div onClick={() => handleClick(data)} className="bomListElement">
      <span>{name}</span>
      <span>{description}</span>
      <span>{adjustedUOM}</span>
      <span>{costs}</span>
    </div>
  );
}

export default BOMListElement;
