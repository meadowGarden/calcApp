// import "./App.css";
import MaterialsPage from "./assets/components/materials/MaterialsPage";
import BOMPage from "./assets/components/bom/BOMPage";
import { Link, Route, Routes } from "react-router";
import ErrorPage from "./assets/components/ErrorPage";
import HomePage from "./assets/components/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Link to="/">home</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="bom" element={<BOMPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
