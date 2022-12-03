import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Admin from "./components/admin";
import Login from "./components/admin/Login";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/order" element={<Admin />} />
          <Route path="/admin/services" element={<Admin />} />
          <Route path="/admin/admin-list" element={<Admin />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
