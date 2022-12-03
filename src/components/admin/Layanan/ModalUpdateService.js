import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  m: 2,
  overflow: "scroll",
};

function ModalUpdateService(props) {
  const [variant, setVariant] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setVariant((prevState) => [...prevState, { name: e.target["name"].value, desc: e.target["desc"].value }]);
    console.log(variant);
  }

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="absolute top-1 right-1 text-md text-[#193245] cursor-pointer" onClick={props.handleClose}>
            ✖
          </div>
          <div className=" flex space-x-2">
            <EditIcon sx={{ color: "#193254" }} />
            <p className="font-bold text-space-cadet">Update Layanan</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" />
            <input type="text" name="desc" />
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalUpdateService;
