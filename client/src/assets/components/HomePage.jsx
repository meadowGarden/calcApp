import { Link } from "react-router";

function HomePage() {
  return (
    <div>
      <div>
        <Link to="/materials">materials</Link>
      </div>

      <div>
        <Link to="/bom">bom</Link>
      </div>
    </div>
  );
}

export default HomePage;
