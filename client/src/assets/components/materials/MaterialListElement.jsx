const MaterialListElement = ({ data }) => {
  const { name, uom, price } = data;

  return (
    <div>
      <span>{name}</span>
      <span>{uom}</span>
      <span>{price}</span>
    </div>
  );
};

export default MaterialListElement;
