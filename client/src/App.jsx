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
import UsersPage from "./assets/components/users/UsersPage.jsx";
import useUserStore from "./assets/storage/useUserStore.js";
import PersonalPage from "./assets/components/users/PersonalPage.jsx";
import { inspectPath } from "./services/utils.js";

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/bom" element={<BOMPage />} />
        <Route
          path={inspectPath(user?.user.role, ["ADMIN"], "/users")}
          element={<UsersPage />}
        />
        <Route
          path={inspectPath(user?.user.role, ["ADMIN"], "/test")}
          element={<TestPage />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/users/:id" element={<PersonalPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
