import axios from "axios";
import { useEffect, useState } from "react";
import MaterialListElement from "./MaterialListElement";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const materialsToDisplay = materials.map((material) => (
    <MaterialListElement key={material.id} data={material} />
  ));

  return (
    <div>
      <div>{materialsToDisplay}</div>
    </div>
  );
};

export default MaterialsPage;
