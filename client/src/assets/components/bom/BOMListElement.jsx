import "./BOMListElement.css";
import "../../../services/utils.js";
import { uomDictServerClient } from "../../../services/utils.js";
import axios from "axios";
import "../site/CommonStyles.css";
import useUserStore from "../../storage/useUserStore.js";

function BOMListElement({ data, handleClick, fetchBOM }) {
  const { name, description, uom } = data.entity;
  const adjustedUOM = uomDictServerClient[uom];
  const costs = data.costs;

  return (
    <div onClick={() => handleClick(data)} className="bomListElement">
      <span className="listElementText">{name}</span>
      <span className="listElementText">{description}</span>
      <span className="listElementText">{adjustedUOM}</span>
      <span className="listElementNumber">{costs.toFixed(2)}</span>
    </div>
  );
}

export default BOMListElement;
