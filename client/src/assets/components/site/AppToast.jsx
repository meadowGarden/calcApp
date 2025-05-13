import { Toast, ToastContainer } from "react-bootstrap";
import "./AppToast.css";

const AppToast = ({ title, message, status, onClose, delay, show }) => {
  const headerStyle =
    status === "success" ? "appToastHeaderSuccess" : "appToastHeaderFail";
  const bodyStyle =
    status === "success" ? "appToastBodySuccess" : "appToastBodyFail";

  return (
    <ToastContainer
      className="p-3"
      position="bottom-center"
      style={{ zIndex: 1 }}
    >
      <Toast
        onClose={onClose}
        show={show}
        delay={delay}
        autohide
        className="appToast"
      >
        <Toast.Header className={headerStyle}>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className={bodyStyle}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AppToast;
