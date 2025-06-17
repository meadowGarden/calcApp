import { useState } from "react";
import "./DropDownWithSearch.css";

const DropDownWithSearch = ({ rawList, onElementSelect }) => {
  const [list, setList] = useState(rawList);

  const listToDisplay = list.map((el) => (
    <div
      value={el.name}
      key={el.id}
      onClick={() => onElementSelect({ target: { value: el.name } })}
      className="menusListElement"
    >
      <span>{el.name}</span>
      <span>{el.description}</span>
    </div>
  ));

  const onChange = (e) => {
    const text = e.target.value.toLowerCase();

    const newList = rawList.filter(
      (el) =>
        text === "" ||
        el.name.toLowerCase().includes(text) ||
        el.description.toLowerCase().includes(text)
    );
    setList(newList);
  };

  return (
    <div className="dropDownMenuWithSearch">
      <input
        onChange={onChange}
        type="text"
        placeholder=""
        className="menuSearchField"
      />
      {listToDisplay}
    </div>
  );
};

export default DropDownWithSearch;
