import StandardButton from "../buttons/StandardButton";
import "./materialListElement.css";
import { adjustUOMClient } from "../../../services/utils.js";
import "../site/CommonStyles.css";

const MaterialListElement = ({ data, handleClick, handleLineDelete }) => {
  const { id, name, description, storageUOM, price } = data;
  const adjustedUOM = adjustUOMClient(storageUOM);

  return (
    <div onClick={() => handleClick(data)} className="materialListElement">
      <span className="listElementText">{name}</span>
      <span className="listElementText">{description}</span>
      <span className="listElementText">{adjustedUOM}</span>
      <span className="listElementNumber">{price.toFixed(3)}</span>
      <span className="listElementButton">
        <StandardButton
          handleClick={() => handleLineDelete(id)}
          label={"delete"}
        />
      </span>
    </div>
  );
};

export default MaterialListElement;
