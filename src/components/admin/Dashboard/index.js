import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableViewIcon from "@mui/icons-material/TableView";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CachedIcon from "@mui/icons-material/Cached";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import jwt_decode from "jwt-decode";
import axios from "axios";

function MiniBox(props) {
  return (
    <div className="bg-white rounded-lg drop-shadow-xl p-4 w-80 flex flex-col space-y-8">
      <div className="flex space-x-8 justify-between">
        <div className="w-14 h-14 rounded-lg drop-shadow-lg relative top-[-35px] flex items-center justify-center" style={{ backgroundColor: props.iconBoxColor }}>
          <div>{props.icon}</div>
        </div>
        <div className="text-space-cadet">
          <p className="text-md font-light">{props.title}</p>
          <p className="text-xl font-bold text-end">{props.value}</p>
        </div>
      </div>
      <div className="flex">
        <Link className="cursor-pointer" to={props.link}>
          <div className="bg-space-cadet text-white text-sm rounded-md px-2 py-1 inline-block w-20 text-center hover:bg-black duration-500">Lihat</div>
        </Link>
      </div>
    </div>
  );
}

MiniBox.defaultProps = {
  iconBoxColor: "#fff",
};

function Dashboard() {
  const [waitingTotal, setWaitingTotal] = useState();
  const [progressTotal, setProgressTotal] = useState();
  const [serviceTotal, setServiceTotal] = useState();
  const [adminTotal, setAdminTotal] = useState();

  useEffect(() => {
    //get services total
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/services/list`)
      .then((res) => {
        setServiceTotal(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    //get order waiting
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/orders/waiting`)
      .then((res) => {
        setWaitingTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });

    //get order progress
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/orders/onprogress`)
      .then((res) => {
        setProgressTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });

    //get admin total
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admins/list`)
      .then((res) => {
        setAdminTotal(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const boxes = [
    { box: <MiniBox title="Menunggu Konfirmasi" value={waitingTotal} iconBoxColor="#193254" icon={<PendingActionsIcon sx={{ color: "white" }} />} link="/admin/order?tab=waiting" /> },
    { box: <MiniBox title="Dalam proses" value={progressTotal} iconBoxColor="#193254" icon={<CachedIcon sx={{ color: "white" }} />} link="/admin/order?tab=progress" /> },
    { box: <MiniBox title="Total Layanan" value={serviceTotal} iconBoxColor="#193254" icon={<DesignServicesIcon sx={{ color: "white" }} />} link="/admin/services" /> },
    { box: <MiniBox title="Total Admin" value={adminTotal} iconBoxColor="#193254" icon={<SupervisorAccountIcon sx={{ color: "white" }} />} link="/admin/admin-list" /> },
  ];

  const greetings = (name) => {
    const date = new Date();
    const hours = date.getHours();
    let greet;
    if (hours >= 5 && hours < 12) {
      greet = "Selamat Pagi";
    } else if (hours >= 12 && hours < 16) {
      greet = "Selamat Siang";
    } else if (hours >= 16 && hours < 19) {
      greet = "Selamat Sore";
    } else {
      greet = "Selamat Malam";
    }
    return `${greet}, ${name} :)`;
  };

  return (
    <div className="flex flex-col ">
      <div className="flex space-x-2">
        <TableViewIcon sx={{ color: "#193254" }} />
        <p className="font-bold text-space-cadet">Dashboard</p>
      </div>
      <div className="mt-6 md:mt-10 flex max-w-4xl justify-center flex-wrap md:mx-auto">
        {boxes.map((item) => {
          return <div className="m-10">{item.box}</div>;
        })}
      </div>
      <div className="text-center mt-10">
        <p className="font-light text-2xl">{greetings(jwt_decode(localStorage.getItem("token")).name)}</p>
      </div>
    </div>
  );
}

export default Dashboard;
