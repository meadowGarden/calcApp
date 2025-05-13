import axios from "axios";
import { useEffect, useState } from "react";
import MaterialListElement from "./MaterialListElement";
import DataModal from "../site/DataModal.jsx";
import MaterialUpdateCard from "./MaterialUpdateCard.jsx";
import MaterialAddCard from "./MaterialAddCard.jsx";
import PageContainer from "../site/PageContainer.jsx";
import "./MaterialPage.css";
import AddButton from "../buttons/AddButton.jsx";
import "./MaterialPage.css";
import useTokenStore from "../../storage/useTokenStore.js";
import AppToast from "../site/AppToast.jsx";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = useTokenStore((state) => state.token);
  const [showAddMaterialToast, setShowAddMaterialToast] = useState(false);

  const fetchMaterials = () => {
    axios
      .get("http://localhost:8080/api/materials", {
        headers: { Authorization: `Bearer ${token}` },
      })
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
      .delete(`http://localhost:8080/api/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchMaterials())
      .catch((error) => console.log(error));
  };

  const toggleShowAddMaterialToast = () =>
    setShowAddMaterialToast(!showAddMaterialToast);

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
      <div className="materialPage">
        <AddButton onClick={handleAddMaterial} label={"add material"} />

        <div>{materialsToDisplay}</div>
        <DataModal
          show={showAddModal}
          handleClose={handleAddModalClose}
          title={"add new material"}
        >
          <MaterialAddCard
            fetchMaterials={fetchMaterials}
            closeCard={handleAddModalClose}
            showAddToast={toggleShowAddMaterialToast}
          />
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
      </div>

      <AppToast
        title={"success"}
        message={"material added successfully"}
        status={"success"}
        onClose={toggleShowAddMaterialToast}
        show={showAddMaterialToast}
        delay={3000}
      />
    </PageContainer>
  );
};

export default MaterialsPage;
