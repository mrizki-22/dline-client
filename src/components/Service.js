import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function PortfolioCarousel(props) {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  let items = props.images;

  function Item(props) {
    return (
      <Paper className="w-full h-full flex items-center justify-center">
        <img src={props.url} alt="gambar" className="w-[250px] md:w-[400px]" />
      </Paper>
    );
  }

  return (
    <Carousel className="drop-shadow-xl w-[250px] md:w-[400px] " animation="slide" height={windowSize.innerWidth > 768 ? 400 : 250}>
      {items.map((item, i) => (
        <Item key={i} url={item} />
      ))}
    </Carousel>
  );
}

function PrimaryButton(props) {
  return (
    <>
      <Link
        to={props.link}
        className={`font-bold text-center box-border text-md text-white ${
          props.idx % 2 === 0 ? "bg-gradient-to-r" : "bg-gradient-to-l"
        } from-amber-500 to-amber-500 px-4 py-2 transition duration-500 ease-in-out rounded-md border-2 border-white hover:bg-white hover:text-transparent hover:bg-clip-text  hover:border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500`}
      >
        {props.text}
      </Link>
    </>
  );
}

function Service() {
  document.body.style.backgroundColor = "white";
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);

  if (!id) {
    navigate("/services");
  }

  // slice 3 back number
  function sliceNumber(number) {
    return number.toString().slice(0, -3);
  }

  async function fetchData() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/services/${id}`);
      setData(res.data);
      document.title = res.data.name;
      let img = res.data.images.split(",");
      setImages(img.map((item) => `${process.env.REACT_APP_SERVER_URL}/${item}`));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {data ? (
        <>
          <div className="flex flex-col md:flex-row justify-between px-5 md:px-32 mt-10 md:mt-20 font-poppins space-y-5 md:space-y-0">
            <div className="flex flex-col max-w-2xl space-y-5 md:space-y-10">
              <p className="font-extrabold text-space-cadet text-3xl">{data.name}</p>
              <p className="text-justify leading-7">{data.description}</p>
            </div>
            <div className="mx-auto md:mx-0">
              <PortfolioCarousel images={images} />
            </div>
          </div>
          <div className="flex flex-col mt-8 mb-20 items-center font-poppins space-y-8">
            <div className="flex space-x-2">
              <p className="font-normal text-2xl text-space-cadet">Pilih</p>
              <p className="font-bold text-2xl text-red-500 ">Paket</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.variants.map((item, i) => {
                return (
                  <div key={i} className="flex flex-col bg-slate-50 w-80 drop-shadow-xl rounded-md">
                    <div className={`${i % 2 === 1 ? "bg-gradient-to-r from-amber-500 to-red-500" : "bg-gradient-to-r from-red-500 to-amber-500"} flex justify-center items-center p-10 rounded-t-md`}>
                      <p className="font-bold text-3xl text-white">{item.name}</p>
                    </div>
                    <div className="flex flex-col justify-between items-center h-full">
                      <div className="flex items-start justify-center space-x-1 text-space-cadet  p-8">
                        <p className="font-medium text-xl">Rp</p>
                        <p className="font-bold text-5xl mt-1">{sliceNumber(item.price)}</p>
                        <p className="font-medium text-xl">000</p>
                      </div>
                      <div className="px-3 whitespace-pre-wrap leading-7">
                        <p className="text-center leading-10">{item.description}</p>
                      </div>
                      <div className="flex justify-center items-center p-6">
                        <PrimaryButton text="Pesan" link={`/order?v=${item.id}`} idx={i} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div className="absolute h-screen w-screen flex justify-center items-center">
          <ThreeDots color="orange" />
        </div>
      )}
    </>
  );
}

export default Service;
