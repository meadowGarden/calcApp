import axios from "axios";
import { useEffect, useState } from "react";
import BOMListElement from "./BOMListElement";
import PageContainer from "../site/PageContainer";
import DataModal from "../site/DataModal";
import BOMDataCard from "./BOMDataCard";

const BOMPage = () => {
  const [bom, setBOM] = useState([]);
  const [currentBOM, setCurrentBOM] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bom")
      .then((response) => {
        setBOM(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/materials")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleElementClick = (bomData) => {
    setCurrentBOM(bomData);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const bomToDisplay = bom.map((element) => (
    <BOMListElement
      key={element.entity.id}
      data={element}
      handleClick={handleElementClick}
    />
  ));

  return (
    <PageContainer>
      <DataModal show={showModal} handleClose={handleModalClose}>
        <BOMDataCard data={currentBOM} materials={materials} />
      </DataModal>
      {bomToDisplay}
    </PageContainer>
  );
};

export default BOMPage;
