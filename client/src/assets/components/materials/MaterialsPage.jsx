import axios from "axios";
import { useEffect, useState } from "react";
import MaterialListElement from "./MaterialListElement";
import StandardButton from "../buttons/StandardButton";
import DataModal from "../site/DataModal.jsx";
import MaterialUpdateCard from "./MaterialUpdateCard.jsx";
import MaterialAddCard from "./MaterialAddCard.jsx";
import PageContainer from "../site/PageContainer.jsx";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchMaterials = () => {
    axios
      .get("http://localhost:8080/api/materials")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => fetchMaterials(), []);

  const handleAddMaterial = () => {
    setShowAddModal(true);
  };

  const handleMaterialClick = (material) => {
    setCurrentMaterial(material);
    setShowEditModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleLineDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/materials/${id}`)
      .then(() => fetchMaterials())
      .catch((error) => console.log(error));
  };

  const materialsToDisplay = materials.map((material) => (
    <MaterialListElement
      key={material.id}
      data={material}
      handleClick={handleMaterialClick}
      handleLineDelete={handleLineDelete}
    />
  ));

  const modalTitle = `${currentMaterial.name} details`;

  return (
    <PageContainer>
      <div>{materialsToDisplay}</div>
      <StandardButton handleClick={handleAddMaterial} label={"add material"} />
      <DataModal
        show={showAddModal}
        handleClose={handleAddModalClose}
        title={"add new material"}
      >
        <MaterialAddCard fetchMaterials={fetchMaterials} />
      </DataModal>

      <DataModal
        show={showEditModal}
        handleClose={handleEditModalClose}
        title={modalTitle}
      >
        <MaterialUpdateCard
          currentMaterial={currentMaterial}
          fetchMaterials={fetchMaterials}
        />
      </DataModal>
    </PageContainer>
  );
};

export default MaterialsPage;
