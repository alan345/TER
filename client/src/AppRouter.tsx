import { Route, Routes } from "react-router-dom"
import { ElementsPage } from "./pages/ElementsPage"
import { Home } from "./pages/Home"
import { AuthManagement } from "./components/auth/AuthManagement"
import { Contact } from "./pages/Contact"
import { ProfilePage } from "./pages/ProfilePage"
import { PrivateRoute } from "./PrivateRoute"
import { UsersPage } from "./pages/UsersPage"
import { Signup } from "./components/auth/signup/Signup"

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/elements" element={<ElementsPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<AuthManagement />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
      <Route path="/users" element={<PrivateRoute element={<UsersPage />} />} />
      <Route path="*" element={<>No page</>} />
    </Routes>
  )
}
