import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import Countdown from "react-countdown";
import date from "date-and-time";
import ModalProgress from "./ModalProgress";

function ProgressOrderTable() {
  const [data, setData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (orderId) => {
    setIsOpen(true);
    setSelectedOrder(orderId);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/orders/onprogress`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isOpen]);

  return (
    <div>
      {isOpen && <ModalProgress open={isOpen} onClose={handleClose} orderId={selectedOrder} />}
      <div>
        Total : <b>{data ? data.total : "0"}</b>
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
                  Harga
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white", width: 200 }}>
                  Waktu Deadline
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white", width: 200 }}>
                  Dikerjakan oleh
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white", width: 100 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.orders.map((row, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <b>[{row.variantName}]</b> {row.serviceName} (Deadline: {row.variantDeadline} jam)
                    </TableCell>
                    <TableCell align="left">{row.customerName}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">
                      <Countdown date={date.parse(row.deadlineTime, "DD/MM/YYYY HH:mm")}>
                        <p className="bg-red-500 p-2 rounded-md text-white inline">Deadline Habis</p>
                      </Countdown>
                    </TableCell>
                    <TableCell align="left">{row.adminName}</TableCell>
                    <TableCell align="center" className="flex space-x-2">
                      <div className="cursor-pointer" onClick={() => handleOpen(row.orderId)}>
                        <Tooltip title="Lihat Detail" placement="top">
                          <RemoveRedEyeIcon />
                        </Tooltip>
                      </div>
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
