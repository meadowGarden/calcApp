import "./AddButton.css";

const AddButton = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="addButton">
      {label}
    </button>
  );
};

export default AddButton;
