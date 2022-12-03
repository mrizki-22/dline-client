import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Order from "./Order";
import Layanan from "./Layanan";
import AdminList from "./AdminList";
import Dashboard from "./Dashboard";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";

function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [onlineAdmin, setOnlineAdmin] = useState([]);

  useEffect(() => {
    //check if token exist
    const token = localStorage.getItem("token");
    token === null && navigate("/admin/login");

    //socket
    const socket = io(process.env.REACT_APP_SERVER_URL);
    socket.on("connect", () => {
      socket.emit("online", jwt_decode(token).id);
      socket.on("online-admin", (data) => {
        setOnlineAdmin(data);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  document.body.style.backgroundColor = "#f0f2f5";
  return (
    <div className="font-poppins p-4">
      <div>
        <Sidebar />
      </div>
      <div className="absolute md:right-4 md:left-[288px] right-4 left-4 p-3">
        {(() => {
          switch (location.pathname) {
            case "/admin/dashboard":
              return <Dashboard />;
            case "/admin/services":
              return <Layanan />;
            case "/admin/order":
              return <Order />;
            case "/admin/admin-list":
              return <AdminList onlineAdmin={onlineAdmin} />;
          }
        })()}
      </div>
    </div>
  );
}

export default Admin;
