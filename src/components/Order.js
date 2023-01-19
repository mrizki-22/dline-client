import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function Order() {
  document.body.style.backgroundColor = "#EEF1F3";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const v = searchParams.get("v");
  !v && navigate("/services");
  const notifyError = (msg) => toast.error(msg);

  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { register, handleSubmit } = useForm();

  function onImageChange(e) {
    if (e.target.files.length > 2) {
      notifyError("Maksimal 2 gambar");
      e.target.value = null;
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
  }

  async function getServiceInfo() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/${v}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getServiceInfo();
  }, [v]);

  //snap midtrans
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-WwU47RAde-8XjlMj";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", clientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  //pay button on click
  // const pay = async () => {
  //   setLoading(true);

  //   try {
  //     const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/checkout`);
  //     window.snap.pay(res.data.token, {
  //       onSuccess: async function (result) {
  //         await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/notif`);
  //         setLoading(false);
  //       },
  //       language: "id",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("nowa", data.nowa);
    formData.append("desc", data.description);
    formData.append("variantId", v);

    for (const key of Object.keys(images)) {
      formData.append("images", images[key]);
    }

    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/checkout`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.snap.pay(res.data.token, {
        onSuccess: async function (result) {
          const data = {
            orderId: result.order_id,
          };
          await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/confirmPayment`, JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
          navigate("/payment-success");
        },
        language: "id",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center p-10 drop-shadow-lg rounded-md">
      <div className="bg-white flex flex-col items-center space-y-8 w-fit p-8 font-poppins text-space-cadet">
        <div>
          <p className="font-extrabold text-2xl">Order Layanan</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-16 md:space-y-0 space-x-0 md:space-x-20">
          <div className=" w-96 flex flex-col space-y-6">
            <p className="font-bold text-lg">Paket: </p>
            <div className="space-y-4">
              <p>
                {data ? data.serviceName : ""} - <b>{data ? data.variantName : ""}</b>
              </p>
              <div className="bg-white drop-shadow-md h-40 p-2 whitespace-pre-wrap scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <p>{data ? data.description : ""}</p>
              </div>
              <p className="font-thin text-xs">ⓘ Waktu deadline dimulai saat kami mengonfirmasi pesanan.</p>
              <div className="flex flex-col border-2 border-blue-400 font-medium text-xs p-3 space-y-3">
                <p className="underline">RINCIAN PESANAN</p>
                <div className="flex justify-between">
                  <p>{data ? data.serviceName : ""}</p>
                  <p>{data ? data.price : ""}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="inline">Paket:</p>
                    <p className="inline ml-1">{data ? data.variantName : ""}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">TOTAL:</p>
                  <p className="font-bold">Rp {data ? data.price : ""}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-96 flex flex-col space-y-6">
            <p className="font-bold text-lg">Data Pemesan: </p>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className=" space-y-2">
                <TextField id="name" className="w-full" label="Nama lengkap" variant="outlined" name="name" required type={"text"} {...register("name")} />
                <div>
                  <TextField id="nowa" className="w-full" label="No. Whatsapp (08xxxx)" variant="outlined" name="nowa" required type={"number"} {...register("nowa")} />
                  <p className="font-thin text-xs">ⓘ Kami akan mengirim invoice dan hasil design ke nomor whatsapp yang anda masukkan.</p>
                </div>
                <TextField id="description" className="w-full" label="Deskripsi Design (Judul, warna, dll)" variant="outlined" name="description" multiline rows={6} required {...register("description")} />
                <div className="space-y-2">
                  <p className="font-medium text-sm inline">Referensi Design (opsional)</p>
                  <p className="font-light text-sm inline">maks. 2</p>
                  <div className="border-2">
                    <input accept="image/*" id="image" multiple type="file" onChange={onImageChange} />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-500 to-amber-500 transition duration-500 ease-in-out rounded-md border-2 border-white hover:bg-white hover:text-transparent hover:bg-clip-text  hover:border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500"
                >
                  {loading ? <ThreeDots height={24} width={29} color="white" /> : "Bayar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
