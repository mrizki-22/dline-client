import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import Admin from "./components/admin";
import Login from "./components/admin/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import LandingPage from "./components/LandingPage";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Service from "./components/Service";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="services">
          <Route path="" element={<Services />} />
          <Route path=":id" element={<Service />} />
        </Route>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoutes />}>
          <Route path="admin">
            <Route path="dashboard" element={<Admin />} />
            <Route path="order" element={<Admin />} />
            <Route path="services" element={<Admin />} />
            <Route path="admin-list" element={<Admin />} />
          </Route>
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
