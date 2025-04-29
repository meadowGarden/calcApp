import "./StandardButton.css";

const StandardButton = ({ handleClick, label, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={(e) => {
        if (type !== "submit") e.stopPropagation();
        handleClick(e);
      }}
      className="standardButton"
    >
      {label}
    </button>
  );
};

export default StandardButton;
