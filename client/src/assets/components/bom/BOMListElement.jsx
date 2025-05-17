import "./BOMListElement.css";
import "../../../services/utils.js";
import { uomDictServerClient } from "../../../services/utils.js";
import StandardButton from "../buttons/StandardButton.jsx";
import axios from "axios";
import "../site/CommonStyles.css";
import useUserStore from "../../storage/useUserStore.js";

function BOMListElement({ data, handleClick, fetchBOM }) {
  const { name, description, uom } = data.entity;
  const adjustedUOM = uomDictServerClient[uom];
  const costs = data.costs;
  const user = useUserStore((state) => state.user);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/bom/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        fetchBOM();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div onClick={() => handleClick(data)} className="bomListElement">
      <span className="listElementText">{name}</span>
      <span className="listElementText">{description}</span>
      <span className="listElementText">{adjustedUOM}</span>
      <span className="listElementNumber">{costs.toFixed(2)}</span>
      <span className="listElementButton">
        <StandardButton
          handleClick={() => handleDelete(data.entity.id)}
          label="delete"
        />
      </span>
    </div>
  );
}

export default BOMListElement;
