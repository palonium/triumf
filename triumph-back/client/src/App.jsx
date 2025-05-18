import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ParentDetailsPage from "./pages/ParentDetailsPage.jsx";
import ChildDetailsPage from "./pages/ChildDetailsPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import ParentEditPage from "./pages/ParentEditPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import { RegistrationProvider } from "./context/RegistrationContext";
import TrainersPage from "./pages/TrainersPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import "./App.css";
import PlacesPage from "./pages/PlacesPage.jsx";

function App() {
  return (
    <RegistrationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />

            <Route
              path="register/parent"
              element={
                <ProtectedRoute>
                  <ParentDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="register/child"
              element={
                <ProtectedRoute>
                  <ChildDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route index element={<MainPage />} />

            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/edit-parent"
              element={
                <ProtectedRoute>
                  <ParentEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/edit-parent/change-password"
              element={
                <ProtectedRoute>
                  <ChangePasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route path="/places"
            element={<PlacesPage/>}/>
            <Route path="/trainers"
            element={<TrainersPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </RegistrationProvider>
  );
}

export default App;
