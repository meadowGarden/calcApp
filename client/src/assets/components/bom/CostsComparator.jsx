import "./CostsComparator.css";

const CostsComparator = ({ current, updated, isUpdated }) => {
  const infoCurrent = `current: ${current}`;
  const infoUpdated = `updated: ${updated}`;
  const difference = updated - current;
  const infoDifference = `diff: ${difference}`;

  return (
    <div className="costsComparator">
      <section>{infoCurrent}</section>
      {/* <section>{infoUpdated}</section>
      <section>{infoDifference}</section> */}
      {isUpdated && <section>{infoUpdated}</section>}
      {isUpdated && <section>{infoDifference}</section>}
    </div>
  );
};

export default CostsComparator;
