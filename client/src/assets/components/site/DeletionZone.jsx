import "../site/CommonStyles.css";

const DeletionZone = ({ title, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={"elementDeleteButton"}>
        delete {title}
      </button>
    </div>
  );
};

export default DeletionZone;
