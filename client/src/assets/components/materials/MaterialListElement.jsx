import "./MaterialListElement.css";
import { uomDictServerClient } from "../../../services/utils.js";
import "../site/CommonStyles.css";

const MaterialListElement = ({ data, handleClick }) => {
  const { name, description, storageUOM, price } = data;
  const adjustedUOM = uomDictServerClient[storageUOM];

  return (
    <div onClick={() => handleClick(data)} className="materialListElement">
      <span className="listElementText">{name}</span>
      <span className="listElementText">{description}</span>
      <span className="listElementText">{adjustedUOM}</span>
      <span className="listElementNumber">{price.toFixed(3)}</span>
    </div>
  );
};

export default MaterialListElement;
