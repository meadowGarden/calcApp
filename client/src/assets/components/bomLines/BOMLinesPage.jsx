import axios from "axios";
import { useEffect, useState } from "react";
import BOMLinesListElement from "./BOMLinesListElement";

const BOMLinesPage = () => {
  const [bomLines, setBOMLines] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_END}/api/bomlines`)
      .then((response) => {
        setBOMLines(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const bomLinesToDisplay = bomLines.map((element) => (
    <BOMLinesListElement key={element.entity.id} data={element} />
  ));

  return (
    <div>
      <div>{bomLinesToDisplay}</div>
    </div>
  );
};

export default BOMLinesPage;
