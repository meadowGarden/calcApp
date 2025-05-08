import { useEffect, useState } from "react";
import BOMLinesListElement from "./BOMLinesListElement";
import { useForm } from "react-hook-form";
import "./BOMDataCard.css";
import StandardButton from "../buttons/StandardButton";
import "../site/CommonStyles.css";
import CostsComparator from "./CostsComparator";

const BOMDataCard = ({ bom, materials, fetchBOM }) => {
  const { costs, entity } = bom;
  const { name, description, bomLines } = entity;
  const [lines, setLines] = useState(bomLines || []);
  useEffect(() => setLines(bom?.entity?.bomLines || []), [bom]);

  const [updatedBOM, setUpdatedBOM] = useState(bom);
  console.log(updatedBOM);

  const [isUpdated, setIsUpdated] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: { name: name, description: description, costs: costs },
  });

  const handleDelete = (id) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
    fetchBOM();
  };

  const updateBOM = (bom) => {
    console.log(bom, bomLines);
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
          <CostsComparator
            current={costs}
            updated={updatedBOM.costs}
            isUpdated={isUpdated}
          />
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
