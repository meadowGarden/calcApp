import { useState } from "react";
import BOMLinesListElement from "./BOMLinesListElement";
import { useForm } from "react-hook-form";
import "./BOMDataCard.css";
import "../site/CommonStyles.css";
import CostsComparator from "./CostsComparator";
import { uomDictServerClient } from "../../../services/utils";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useUserStore from "../../storage/useUserStore";

const BOMDataCard = ({
  bom,
  materials,
  fetchBOM,
  uomList,
  closeCard,
  setToastInfo,
  showToast,
  deleteBOM,
}) => {
  const currentCost = bom.costs;

  const user = useUserStore((state) => state.user);

  const updatedBOM = { ...bom };
  const { costs, entity } = updatedBOM;
  const { name, description, bomLines, uom } = entity;
  const [unitOfMeasurement, setUnitOfMeasurement] = useState(uom || uomList[0]);
  const [lines, setLines] = useState(bomLines || []);

  const [isUpdated, setIsUpdated] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: { name: name, description: description, costs: costs },
  });

  const handleLineDelete = (id) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
    setIsUpdated(true);
  };

  const handleLineAdd = () => {
    const uuid = uuidv4();
    const newLine = {
      id: uuid,
      quantity: 1,
      material: materials[0],
    };
    setLines((prev) => [...prev, newLine]);
    setIsUpdated(true);
  };

  const uomOptions = uomList.map((uom) => (
    <option key={uom} value={uom}>
      {uomDictServerClient[uom]}
    </option>
  ));

  const handleUOMChange = (e) => {
    const newUOM = uomList.find((uom) => uom === e.target.value);
    setUnitOfMeasurement(newUOM);
  };

  const updateBOM = (data) => {
    const adjustedLines = lines.map((line) =>
      typeof line.id === "string" ? { ...line, id: 0 } : { ...line }
    );

    const newEntity = {
      ...entity,
      bomLines: adjustedLines,
      name: data.name,
      description: data.description,
      uom: unitOfMeasurement,
    };

    axios
      .put(`${import.meta.env.VITE_BACK_END}/bom/${entity.id}`, newEntity, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        fetchBOM();
        setToastInfo({
          title: "success",
          message: "product has been updated",
          status: "success",
          delay: 3000,
        });
        showToast();
      })
      .catch((error) => {
        switch (error.status) {
          case 409:
            {
              setToastInfo({
                title: "failure",
                message: `${error.response.data}`,
                status: "failure",
                duration: 3000,
              });
              showToast();
            }
            break;
          default: {
            setToastInfo({
              title: "failure",
              message: "product has not been updated",
              status: "failure",
              duration: 3000,
            });
            showToast();
          }
        }
      });
  };

  const bomLinesToDisplay = lines.map((line) => (
    <BOMLinesListElement
      key={line.id}
      data={line}
      onDelete={handleLineDelete}
      materials={materials}
      lines={lines}
      setLines={setLines}
    />
  ));

  return (
    <div className="bomDataCard">
      <form onSubmit={handleSubmit(updateBOM)} className="bomDataCardMainInfo">
        <section>
          <input {...register("name")} className="inputText" />
        </section>

        <section>
          <input {...register("description")} className="inputText" />
        </section>

        <section>
          <CostsComparator
            current={currentCost}
            updated={costs}
            isUpdated={isUpdated}
          />
        </section>

        <section>
          <select onChange={handleUOMChange} className="inputText">
            {uomOptions}
          </select>
        </section>

        <section className="bomDataCardButtons">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLineAdd();
            }}
            className="standardButton"
          >
            add line
          </button>

          <input type="submit" className="standardButton" value={"update"} />

          <button onClick={() => closeCard()} className="standardButton">
            cancel
          </button>
        </section>
      </form>

      <section className="bomDataCardLines">{bomLinesToDisplay}</section>

      <section>
        <button
          onClick={() => deleteBOM(entity.id)}
          type="submit"
          className="elementDeleteButton"
        >
          delete product
        </button>
      </section>
    </div>
  );
};

export default BOMDataCard;
