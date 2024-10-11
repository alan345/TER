import { Route, Routes } from "react-router-dom"
import { ElementsPage } from "./pages/ElementsPage"
import { Home } from "./pages/Home"
import { AuthManagement } from "./auth/AuthManagement"
import { Contact } from "./pages/Contact"

export const AppRouting = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/elements" element={<ElementsPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<AuthManagement />} />
      <Route path="*" element={<>No page</>} />
    </Routes>
  )
}
