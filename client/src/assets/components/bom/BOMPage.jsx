import axios from "axios";
import { useEffect, useState } from "react";
import BOMListElement from "./BOMListElement";
import PageContainer from "../site/PageContainer";
import DataModal from "../site/DataModal";
import BOMDataCard from "./BOMDataCard";
import BOMCreateCard from "./BOMCreateCard";
import AddButton from "../buttons/AddButton";
import "./BOMPage.css";
import useUserStore from "../../storage/useUserStore";
import AppToast from "../site/AppToast.jsx";

const BOMPage = () => {
  const [bom, setBOM] = useState([]);
  const [currentBOM, setCurrentBOM] = useState({});
  const [showAddBOMModal, setShowAddBOMModal] = useState(false);
  const [showBOMDataModal, setShowBOMDataModal] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [uomList, setUOMList] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const user = useUserStore((state) => state.user);
  const [toastInfo, setToastInfo] = useState({});

  const fetchBOM = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_END}/bom`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setBOM(response.data);
      })
      .catch(() => {
        setToastInfo({
          title: "failure",
          message: "could not fetch data",
          status: "failure",
          delay: 3000,
        });
        showToast();
      });
  };
  useEffect(() => fetchBOM(), []);

  const fetchMaterials = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_END}/materials`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setMaterials(response.data);
      })
      .catch(() => {
        setToastInfo({
          title: "failure",
          message: "could not fetch materials data",
          status: "failure",
          delay: 3000,
        });
        showToast();
      });
  };
  useEffect(() => fetchMaterials(), []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_END}/materials/uom`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setUOMList(res.data))
      .catch(() => {
        setToastInfo({
          title: "failure",
          message: "could not fetch data",
          status: "failure",
          delay: 3000,
        });
        showToast();
      });
  }, []);

  const handleCreateBOM = () => {
    setShowAddBOMModal(true);
  };

  const handleAddBOMModalClose = () => {
    setShowAddBOMModal(false);
  };

  const handleElementClick = (bomData) => {
    setCurrentBOM(bomData);
    setShowBOMDataModal(true);
  };

  const handleBOMDataModalClose = () => {
    setShowBOMDataModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACK_END}/bom/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        fetchBOM();
        setShowBOMDataModal(false);
        setToastInfo({
          title: "success",
          message: "product has been deleted",
          status: "success",
          delay: 3000,
        });
        toggleShowToast();
      })
      .catch((error) => {
        setToastInfo({
          title: "failure",
          message: "product has not been deleted",
          status: "failure",
          delay: 3000,
        });
      });
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const bomToDisplay = bom.map((element) => (
    <BOMListElement
      key={element.entity.id}
      data={element}
      handleClick={handleElementClick}
      fetchBOM={fetchBOM}
    />
  ));

  return (
    <PageContainer>
      <div className="bomPage">
        <AddButton onClick={handleCreateBOM} label={"add"} />
        <div>{bomToDisplay}</div>

        <DataModal show={showAddBOMModal} handleClose={handleAddBOMModalClose}>
          <BOMCreateCard
            uomList={uomList}
            materialList={materials}
            fetchBOM={fetchBOM}
            closeCard={setShowAddBOMModal}
            showToast={toggleShowToast}
            setToastInfo={setToastInfo}
          />
        </DataModal>

        <DataModal
          show={showBOMDataModal}
          handleClose={handleBOMDataModalClose}
          title={"product data"}
        >
          <BOMDataCard
            bom={currentBOM}
            materials={materials}
            fetchBOM={fetchBOM}
            uomList={uomList}
            closeCard={setShowBOMDataModal}
            showToast={toggleShowToast}
            setToastInfo={setToastInfo}
            deleteBOM={handleDelete}
          />
        </DataModal>
      </div>

      <AppToast
        title={toastInfo.title}
        message={toastInfo.message}
        status={toastInfo.status}
        delay={toastInfo.delay}
        show={showToast}
        onClose={toggleShowToast}
      />
    </PageContainer>
  );
};

export default BOMPage;
