import React, { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from "@mui/material";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalAddService from "./ModalAddService";
import ModalUpdateService from "./ModalUpdateService";

function Layanan() {
  const [isMainAdmin, setIsMainAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false); //modal add service
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); //modal update service
  const [selectedService, setSelectedService] = useState(); //service yang akan diupdate
  const [serviceList, setServiceList] = useState([]);

  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    decoded.isMainAdmin === true && setIsMainAdmin(true);
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/services/list`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setServiceList(res.data);
    } catch (error) {
      notifyError("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isOpen, isUpdateModalOpen]);

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }

  function handleUpdateModalOpen(id) {
    setIsUpdateModalOpen(true);
    setSelectedService(id);
  }
  function handleUpdateModalClose() {
    setIsUpdateModalOpen(false);
  }

  return (
    <div className="flex flex-col w-full">
      <div className=" flex space-x-2">
        <CategoryIcon sx={{ color: "#193254" }} />
        <p className="font-bold text-space-cadet">Layanan</p>
      </div>

      {isMainAdmin && (
        <div className="mt-8">
          <Button variant="contained" onClick={handleOpen}>
            + Tambah
          </Button>
        </div>
      )}

      {isOpen && <ModalAddService open={isOpen} handleClose={handleClose} />}

      {isUpdateModalOpen && <ModalUpdateService open={isUpdateModalOpen} handleClose={handleUpdateModalClose} serviceId={selectedService} />}

      <div className="mt-10 flex justify-center drop-shadow-lg">
        <TableContainer component={Paper} sx={{ backgroundColor: "white", height: "100%", width: 800 }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ fontWeight: "bold", backgroundColor: "#1e1e1e" }}>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white", width: 20 }}>
                  No.
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", color: "white" }}>
                  Nama Layanan
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                  Status
                </TableCell>
                {/* {isMainAdmin && (
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    Action
                  </TableCell>
                )} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceList.map((service) => {
                return (
                  <TableRow key={service.id}>
                    <TableCell align="center">{serviceList.indexOf(service) + 1}</TableCell>
                    <TableCell align="left">{service.name}</TableCell>
                    <TableCell align="center">
                      <div className={`w-2 h-2 rounded-[20px] mx-auto ${service.isActive ? "bg-green-500" : "bg-red-500"}`}></div>
                    </TableCell>
                    {/* {isMainAdmin && (
                      <TableCell align="center">
                        <Tooltip title={`Update ${service.name}`} placement="top">
                          <div className="bg-[#193254] w-5 rounded-md mx-auto cursor-pointer" onClick={() => handleUpdateModalOpen(service.id)}>
                            <EditIcon sx={{ color: "white" }} fontSize="small" />
                          </div>
                        </Tooltip>
                      </TableCell>
                    )} */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Layanan;
