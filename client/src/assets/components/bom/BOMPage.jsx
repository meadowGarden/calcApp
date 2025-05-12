import axios from "axios";
import { useEffect, useState } from "react";
import BOMListElement from "./BOMListElement";
import PageContainer from "../site/PageContainer";
import DataModal from "../site/DataModal";
import BOMDataCard from "./BOMDataCard";
import BOMCreateCard from "./BOMCreateCard";
import AddButton from "../buttons/AddButton";
import "./BOMPage.css";
import useTokenStore from "../../storage/useTokenStore.js";

const BOMPage = () => {
  const [bom, setBOM] = useState([]);
  const [currentBOM, setCurrentBOM] = useState({});
  const [showAddBOMModal, setShowAddBOMModal] = useState(false);
  const [showBOMDataModal, setShowBOMDataModal] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [uomList, setUOMList] = useState([]);
  const token = useTokenStore((state) => state.token);

  const fetchBOM = () => {
    axios
      .get("http://localhost:8080/api/bom", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBOM(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => fetchBOM(), []);

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials/uom", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUOMList(res.data))
      .catch((error) => console.log(error));
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
          />
        </DataModal>
      </div>
    </PageContainer>
  );
};

export default BOMPage;
