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
import AppToast from "../site/AppToast.jsx";
import useUserStore from "../../storage/useUserStore.js";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const user = useUserStore((state) => state.user);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    title: "",
    message: "",
    status: "",
    onClose: "",
    delay: 3000,
  });

  const fetchMaterials = () => {
    axios
      .get("http://localhost:8080/api/materials", {
        headers: { Authorization: `Bearer ${user?.token}` },
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
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        console.log("in the then");
        fetchMaterials();
        handleEditModalClose();
        toggleShowToast();
        setToastInfo({
          title: "success",
          message: "material deleted successfully",
          status: "success",
          delay: 3000,
        });
      })
      .catch((error) => {
        toggleShowToast();
        setToastInfo({
          title: "failure to delete",
          message: "material deleted",
          status: "failure",
          delay: 3000,
        });
      });
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const materialsToDisplay = materials.map((material) => (
    <MaterialListElement
      key={material.id}
      data={material}
      handleClick={handleMaterialClick}
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
            showToast={toggleShowToast}
            setToastInfo={setToastInfo}
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
            closeCard={handleEditModalClose}
            showToast={toggleShowToast}
            setToastInfo={setToastInfo}
            deleteMaterial={handleLineDelete}
          />
        </DataModal>
      </div>

      <AppToast
        title={toastInfo.title}
        message={toastInfo.message}
        status={toastInfo.status}
        delay={toastInfo.delay}
        onClose={toggleShowToast}
        show={showToast}
      />
    </PageContainer>
  );
};

export default MaterialsPage;
