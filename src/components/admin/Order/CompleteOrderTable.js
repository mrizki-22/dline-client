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
import ModalComplete from "./ModalComplete";

function CompleteOrderTable() {
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
      .get(`${process.env.REACT_APP_SERVER_URL}/orders/complete`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isOpen]);

  return (
    <div>
      {isOpen && <ModalComplete open={isOpen} onClose={handleClose} orderId={selectedOrder} />}
      <div>
        Total : <b>{data ? data.total : 0}</b>
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
                  Waktu Selesai
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white", width: 100 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.orders.map((row) => (
                  <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <b>[{row.variantName}]</b> {row.serviceName} (Deadline: {row.variantDeadline} jam)
                    </TableCell>
                    <TableCell align="left">{row.customerName}</TableCell>

                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.completeTime}</TableCell>
                    <TableCell align="center">
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

export default CompleteOrderTable;
