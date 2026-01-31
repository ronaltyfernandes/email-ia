import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { DefaultLayout } from "../layouts/DefaultLayout.jsx";
import Respostas from "../pages/Respostas.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/respostas" element={<Respostas />} />
      </Route>
    </Routes>
  );
}
