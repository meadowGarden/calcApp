import { useEffect, useState } from "react";
import BOMLinesListElement from "./BOMLinesListElement";
import { useForm } from "react-hook-form";
import "./BOMDataCard.css";
import StandardButton from "../buttons/StandardButton";
import "../site/CommonStyles.css";

const BOMDataCard = ({ data, materials, fetchBOM }) => {
  const { costs, entity } = data;
  const { name, description, bomLines } = entity;
  const [lines, setLines] = useState(bomLines || []);
  const { register, handleSubmit } = useForm({
    defaultValues: { name: name, description: description, costs: costs },
  });

  useEffect(() => setLines(data?.entity?.bomLines || []), [data]);

  const handleDelete = (id) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
    fetchBOM();
  };

  const updateBOM = (data) => {
    console.log(data, bomLines);
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
          <input {...register("name")} className="inputText" />
        </section>

        <section>
          <input {...register("description")} className="inputText" />
        </section>

        <section>
          <span className="listElementNumber">{costs}</span>
        </section>

        <section>
          <StandardButton
            handleClick={handleSubmit(updateBOM)}
            label="update"
          />
        </section>
      </form>

      <section className="bomDataCardLines">{bomLinesToDisplay}</section>
    </div>
  );
};

export default BOMDataCard;
