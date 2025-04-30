import StandardButton from "../buttons/StandardButton";

const MaterialListElement = ({ data, handleClick, handleLineDelete }) => {
  const { id, name, description, uom, price } = data;

  return (
    <div onClick={() => handleClick(data)}>
      <span>{name}</span>
      <span>{description}</span>
      <span>{uom}</span>
      <span>{price}</span>
      <StandardButton
        handleClick={() => handleLineDelete(id)}
        label={"delete"}
      />
    </div>
  );
};

export default MaterialListElement;
