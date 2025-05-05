import { useEffect, useState } from "react";
import BOMLinesListElement from "./BOMLinesListElement";
import { useForm } from "react-hook-form";
import "./BOMDataCard.css";

const BOMDataCard = ({ data, materials }) => {
  const { costs, entity } = data;
  const { name, description, bomLines } = entity;
  const [lines, setLines] = useState(bomLines || []);
  const { register } = useForm({
    defaultValues: { name: name, description: description, costs: costs },
  });

  useEffect(() => setLines(data?.entity?.bomLines || []), [data]);

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
    <div className="bomDataCard">
      <form className="bomDataCardMainInfo">
        <section>
          <input {...register("name")} />
        </section>

        <section>
          <input {...register("description")} />
        </section>

        <section>
          <span>{costs}</span>
        </section>
      </form>

      <section>{bomLinesToDisplay}</section>
    </div>
  );
};

export default BOMDataCard;
