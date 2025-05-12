// import "./App.css";
import MaterialsPage from "./assets/components/materials/MaterialsPage";
import BOMPage from "./assets/components/bom/BOMPage";
import { Route, Routes } from "react-router";
import ErrorPage from "./assets/components/ErrorPage";
import HomePage from "./assets/components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./assets/components/site/Navbar";
import TestPage from "./assets/components/test/TestPage";
import Register from "./assets/components/auth/Register.jsx";
import LogIn from "./assets/components/auth/LogIn";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="bom" element={<BOMPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
