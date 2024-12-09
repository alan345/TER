import { Link, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthManagement from "./components/auth/AuthManagement"
import Contact from "./pages/Contact"
import ProfilePage from "./components/auth/ProfilePage"
import PrivateRoute from "./PrivateRoute"
import UsersPage from "./components/user/UsersPage"
import Signup from "./components/auth/Signup"
import BeersPage from "./components/BeersPage"
import { House } from "@phosphor-icons/react"
import DevicesPage from "./components/device/DevicesPage"

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/beers" element={<BeersPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<AuthManagement />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
      <Route path="/users" element={<PrivateRoute element={<UsersPage />} />} />
      <Route path="/devices" element={<PrivateRoute element={<DevicesPage />} />} />
      <Route
        path="*"
        element={
          <div className="p-6">
            <h1>Error</h1>
            <p>Nothing to see here..</p>
            <div className="mt-8">
              <Link to="/">
                <button id="id-home-button" className="btn-blue flex items-center">
                  <House className="mr-2" />
                  Go home
                </button>
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  )
}
export default AppRouter
