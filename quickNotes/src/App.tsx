import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotePage from "./pages/NotePage/NotePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/note/:id"
        element={isLoggedIn ? <NotePage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
