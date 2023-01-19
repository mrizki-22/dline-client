import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import date from "date-and-time";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import Countdown from "react-countdown";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  m: 2,
  overflow: "scroll",
};

function AlertDialog(props) {
  const handleConfirm = async () => {
    //get order id
    const orderId = props.orderId;

    const data = {
      orderId: orderId,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/finish`, data);
      //cek status code
      if (res.status === 200) {
        toast.success("Berhasil menyelesaikan orderan");
        props.handleFinish();
      } else {
        toast.error("Gagal");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Selesaikan Orderan?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Selesaikan orderan dengan id: {props.orderId} ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ModalProgress(props) {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinish = () => {
    setOpen(false);
    props.onClose();
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/orders/onprogress/${props.orderId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Modal open={props.open} onClose={props.onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2 className="font-bold text-xl">Detail Order</h2>
          {data && (
            <div className="flex mt-10 justify-between">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center space-x-3">
                  <p>Order ID: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.orderId} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Atas Nama: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.customerName} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <a href={`http://wa.me/${data.customerNowa}`} target="_blank" className="underline text-green-500">
                    Whatsapp:
                  </a>
                  <TextField size="small" sx={{ width: 400 }} color="success" inputProps={{ readOnly: true }} value={data.customerNowa} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Layanan: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.serviceName} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Varian: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.variantName} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Varian Deadline: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.variantDeadline + " Jam"} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Harga: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.price} />
                </div>

                <div className="flex justify-between items-center space-x-3">
                  <p>Waktu Order: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.orderTime} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Waktu Deadline: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.deadlineTime} />
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Sisa Waktu: </p>
                  <div className="border-[1px] rounded-md w-[400px] p-2 border-[#C4C4C4]">
                    <div>{data.deadlineTime && <Countdown date={date.parse(data.deadlineTime, "DD/MM/YYYY HH:mm")} />}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center space-x-3">
                  <p>Dikerjakan oleh: </p>
                  <TextField size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.adminName} />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between space-x-3">
                  <p>Deskripsi: </p>
                  <TextField multiline rows={8} size="small" sx={{ width: 400 }} inputProps={{ readOnly: true }} value={data.customerDesc} />
                </div>
                <div>
                  <div className="flex space-x-2 mt-5 justify-end">
                    {data.images &&
                      data.images.map((item, index) => {
                        if (item === "") {
                          return;
                        } else {
                          return (
                            <div className="w-[200px]">
                              <img key={index} src={`${process.env.REACT_APP_SERVER_URL}/uploads/${item}`} alt="gambar referensi" widht={200} className="border-2" />
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
                <div className="self-end pt-7">
                  <Button variant="contained" onClick={handleClickOpen}>
                    Selesaikan Orderan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      <AlertDialog open={open} handleClose={handleClose} orderId={data.orderId} handleFinish={handleFinish} />
    </div>
  );
}

export default ModalProgress;
