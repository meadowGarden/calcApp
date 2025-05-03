import Modal from "react-bootstrap/Modal";
import "./DataModal.css";

function DataModal({ children, show, handleClose, title }) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        dialogClassName="dataModal"
      >
        <Modal.Header className="dataModalHeader">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dataModalBody">{children}</Modal.Body>
      </Modal>
    </div>
  );
}

export default DataModal;
