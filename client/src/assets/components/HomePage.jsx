import { Link } from "react-router";
import PageContainer from "./site/PageContainer";

function HomePage() {
  return (
    <PageContainer>
      <div>
        <Link to="/materials">materials</Link>
      </div>

      <div>
        <Link to="/bom">bom</Link>
      </div>
    </PageContainer>
  );
}

export default HomePage;
