import React, { useState } from "react";
import QueueIcon from "@mui/icons-material/Queue";
import { Button, Box, Modal, TextField } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import formData from "form-data";
import { toast } from "react-toastify";
import axios from "axios";

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

function ModalAddService(props) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({});
  const [addVariant, setAddVariant] = useState([]);

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const onImageChange = (e) => {
    if (e.target.files.length > 10) {
      notifyError("Maksimal 10 gambar");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files.length; i++) {
        setImages((prevState) => ({
          ...prevState,
          [e.target.files[i].name]: e.target.files[i],
        }));
      }
    }
  };

  const VariantForm = () => {
    return (
      <div className="flex flex-col spacy-y-4 py-10">
        <div className="flex space-x-2 justify-between">
          <label htmlFor="variantName" className="text-sm font-semibold py-2">
            Nama Variant:
          </label>
          <TextField id="variantName" variant="outlined" size="small" className="w-[90%]" name={`variantName${addVariant.length}`} />
        </div>
        <div className="flex space-x-2 justify-between">
          <label htmlFor="variantDesc" className="text-sm font-semibold py-2">
            Deskripsi:
          </label>
          <TextField id="variantDesc" variant="outlined" size="small" className="w-[90%]" name={`variantDesc${addVariant.length}`} rows={5} multiline />
        </div>
        <div className="flex space-x-2 justify-between">
          <label htmlFor="price" className="text-sm font-semibold py-2">
            Harga:
          </label>
          <TextField id="price" variant="outlined" size="small" className="w-[90%]" name={`variantPrice${addVariant.length}`} type="number" />
        </div>
        <div className="flex space-x-2 justify-between pb-10">
          <label htmlFor="deadline" className="text-sm font-semibold py-2">
            Deadline (Jam):
          </label>
          <TextField id="deadline" variant="outlined" size="small" className="w-[90%]" name={`variantDeadline${addVariant.length}`} type="number" />
        </div>
        <hr></hr>
      </div>
    );
  };

  const onAddBtnClick = () => {
    setAddVariant(addVariant.concat(<VariantForm key={addVariant.length} />));
  };

  const fetchAddService = async (serviceData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/services/add`, serviceData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 201) {
        return res.data.id;
      }
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  const fetchAddVariant = async (variantData, serviceId) => {
    try {
      const data = {
        variants: variantData.get("variants"),
      };

      await axios.post(`http://localhost:5000/variants/add/${serviceId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(images).length === 0) {
      return notifyError("Gambar tidak boleh kosong");
    }

    setLoading(true);

    const serviceData = new formData();
    serviceData.append("name", e.target.serviceName.value);
    serviceData.append("description", e.target.serviceDesc.value);
    for (const key in images) {
      serviceData.append("images", images[key], images[key].name);
    }

    const variantData = new formData();

    //append variant data jika ada
    if (addVariant.length > 0) {
      let variantList = [];
      addVariant.forEach((variant, index) => {
        variantList.push({
          name: e.target[`variantName${index}`].value,
          description: e.target[`variantDesc${index}`].value,
          price: e.target[`variantPrice${index}`].value,
          deadline: e.target[`variantDeadline${index}`].value,
        });
      });
      variantData.append("variants", JSON.stringify(variantList));
    }

    const serviceId = await fetchAddService(serviceData);
    fetchAddVariant(variantData, serviceId);

    setLoading(false);
    props.handleClose();
    notifySuccess("Sukses");
  };

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="absolute top-1 right-1 text-md text-[#193245] cursor-pointer" onClick={props.handleClose}>
            ✖
          </div>
          <div className=" flex space-x-2">
            <QueueIcon sx={{ color: "#193254" }} />
            <p className="font-bold text-space-cadet">Tambah Layanan</p>
          </div>
          <div className="mt-7">
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
              <div className="flex items-center space-x-3 justify-between">
                <label htmlFor="serviceName" className="font-medium">
                  Nama layanan:
                </label>
                <TextField id="serviceName" sx={{ width: "85%" }} name="serviceName" />
              </div>
              <div className="flex items-center space-x-3 justify-between">
                <label htmlFor="serviceDesc" className="font-medium">
                  Deskripsi:
                </label>
                <TextField id="serviceDesc" sx={{ width: "85%" }} multiline rows={5} name="serviceDesc" />
              </div>
              <div className="flex justify-center flex-col w-full items-center space-y-3 mt-7">
                <div>
                  <input accept="image/*" style={{ display: "none" }} id="raised-button-file" multiple type="file" onChange={onImageChange} />
                  <label htmlFor="raised-button-file">
                    <Button variant="outlined" component="span">
                      Upload Gambar
                    </Button>
                  </label>
                </div>
                <div className="border-2 rounded-md border-slate-700 w-80 h-40 p-2 overflow-y-scroll">
                  {Object.keys(images).map((image) => (
                    <p key={image}>{image}</p>
                  ))}
                </div>
              </div>
              <hr />
              <div>
                {/* tambah variant */}
                {addVariant}
              </div>
              <div>
                <Button onClick={onAddBtnClick} variant="outlined">
                  Tambah variant
                </Button>
              </div>
              <div className="flex space-x-3 pt-10 justify-end">
                <Button onClick={props.handleClose} variant="outlined" sx={{ color: "#193254", borderColor: "#193254" }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#193254", color: "white", width: 100 }} className="flex justify-center items-center text-center">
                  {loading ? <ThreeDots color="#fff" height={15} width={20} /> : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAddService;
