import { useEffect, useState } from "react";
import BOMLinesListElement from "./BOMLinesListElement";

const BOMDataCard = ({ data, materials }) => {
  const { costs, entity } = data;
  const { name, description, bomLines } = entity;
  const [lines, setLines] = useState(bomLines || []);

  useEffect(() => setLines(data?.entity?.bomLines || []), [data]);
  // useEffect(() => setLines(lines || []), [data]);

  const handleDelete = (id) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  const bomLinesToDisplay = lines.map((line) => (
    <BOMLinesListElement
      key={line.id}
      data={line}
      onDelete={handleDelete}
      materials={materials}
    />
  ));

  return (
    <div>
      <div>{name}</div>
      <div>
        {description}
        {costs}
      </div>
      {bomLinesToDisplay}
    </div>
  );
};

export default BOMDataCard;
