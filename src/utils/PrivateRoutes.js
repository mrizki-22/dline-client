import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  return localStorage.getItem("token") === null ? <Navigate to="/admin/login" /> : <Outlet />;
};

export default PrivateRoutes;
