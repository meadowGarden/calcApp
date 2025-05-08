import { Link } from "react-router";
import PageContainer from "./site/PageContainer";

function ErrorPage() {
  return (
    <PageContainer>
      <div>error page</div>
      <Link to="/">home page</Link>
    </PageContainer>
  );
}

export default ErrorPage;
