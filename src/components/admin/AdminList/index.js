import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

function AdminList(props) {
  const [adminList, setAdminList] = useState([]);

  async function fetchData() {
    try {
      const result = await axios.get("http://localhost:5000/admins", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setAdminList(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className=" flex space-x-2">
        <SupervisorAccountIcon sx={{ color: "#193254" }} />
        <p className="font-bold text-space-cadet">List Admin</p>
      </div>
      <div className="mt-14 flex justify-center drop-shadow-lg">
        <TableContainer component={Paper} sx={{ backgroundColor: "white", height: "100%", width: 400 }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ fontWeight: "bold", backgroundColor: "#1e1e1e" }}>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white", width: 10 }}>
                  No.
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white" }}>
                  Nama
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white", width: 60 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* start loop */}
              {adminList.map((admin) => {
                return (
                  <TableRow key={admin.id}>
                    <TableCell align="center">{adminList.indexOf(admin) + 1}</TableCell>
                    <TableCell align="left">{admin.name}</TableCell>
                    <TableCell align="center">
                      {props.onlineAdmin.some((e) => e.adminId === admin.id) ? <p className="p-1 rounded-lg bg-green-500 text-white">Online</p> : <p className="p-1 rounded-lg bg-red-500 text-white">Offline</p>}
                    </TableCell>
                  </TableRow>
                );
              })}

              {/* end loop */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminList;
