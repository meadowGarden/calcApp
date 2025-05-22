const DeletionZone = ({ title, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>delete {title}</button>
    </div>
  );
};

export default DeletionZone;
