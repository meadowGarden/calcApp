import StandardButton from "../buttons/StandardButton";
import "./materialListElement.css";
import { adjustUOMClient } from "../../../services/utils.js";

const MaterialListElement = ({ data, handleClick, handleLineDelete }) => {
  const { id, name, description, uom, price } = data;
  const adjustedUOM = adjustUOMClient(uom);

  return (
    <div onClick={() => handleClick(data)} className="materialListElement">
      <span>{name}</span>
      <span>{description}</span>
      <span>{adjustedUOM}</span>
      <span>{price}</span>
      <StandardButton
        handleClick={() => handleLineDelete(id)}
        label={"delete"}
      />
    </div>
  );
};

export default MaterialListElement;
