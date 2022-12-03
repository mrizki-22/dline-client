import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Link } from "react-router-dom";

const rows = [{ service: "Ice cream sandwich 0", name: 237, wa: "085930061742", price: 37, orderTime: 4.3 }];

function ProgressOrderTable() {
  return (
    <div>
      <div>
        Total : <b>10</b>
      </div>
      <div className="mt-5">
        <TableContainer component={Paper} sx={{ backgroundColor: "white", height: "100%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ fontWeight: "bold", backgroundColor: "#1e1e1e" }}>
                <TableCell sx={{ fontWeight: "bold", color: "white", width: 300 }}>Jenis Layanan</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white", width: 150 }}>
                  A/N
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white", width: 100 }}>
                  No. WA
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white", width: 100 }}>
                  Harga
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white", width: 200 }}>
                  Waktu Order
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white", width: 100 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <b>[STANDARD]</b> {row.service} (Deadline: 2 jam)
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    <a href={`https://wa.me/${row.wa}`} target="_blank" className="underline">
                      {row.wa}
                    </a>
                  </TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.orderTime}</TableCell>
                  <TableCell align="center" className="flex space-x-2">
                    <Link>
                      <Tooltip title="Lihat Detail" placement="top">
                        <RemoveRedEyeIcon />
                      </Tooltip>
                    </Link>
                    <Link>
                      <Tooltip title="Ambil Order" placement="top">
                        <AddTaskIcon />
                      </Tooltip>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ProgressOrderTable;
