import React from "react";
import { Link } from "react-router-dom";
import TableViewIcon from "@mui/icons-material/TableView";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import jwt_decode from "jwt-decode";

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
  const boxes = [
    { box: <MiniBox title="Order Pending" value={10} iconBoxColor="#193254" icon={<PendingActionsIcon sx={{ color: "white" }} />} link="/admin/order?tab=pending" /> },
    { box: <MiniBox title="Order on Progress" value={10} iconBoxColor="#193254" icon={<PendingActionsIcon sx={{ color: "white" }} />} link="/admin/order?tab=progress" /> },
    { box: <MiniBox title="Layanan Aktif" value={10} iconBoxColor="#193254" icon={<PendingActionsIcon sx={{ color: "white" }} />} link="/admin/saldo" /> },
    { box: <MiniBox title="Admin Online" value={10} iconBoxColor="#193254" icon={<PendingActionsIcon sx={{ color: "white" }} />} link="/admin/admin-list" /> },
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
