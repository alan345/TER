import { Route, Routes } from "react-router-dom";
import { ElementsPage } from "./ElementsPage";
import { Home } from "./Home";
import { AuthManagement } from "./auth/AuthManagement";
import { Contact } from "./Contact";

export function Routing() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/elements" element={<ElementsPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<AuthManagement />} />
      <Route path="*" element={<>No page</>} />
    </Routes>
  );
}
