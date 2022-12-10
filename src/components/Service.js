import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

function PortfolioCarousel() {
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

  var items = [require("../assets/image/g1.jpg"), require("../assets/image/g2.jpg"), require("../assets/image/g3.jpg"), require("../assets/image/g4.jpg"), require("../assets/image/g5.jpg")];

  function Item(props) {
    return (
      <Paper className="w-full h-full flex items-center justify-center">
        <img src={props.url} alt="gambar" className="w-[200px] md:w-[400px]" />
      </Paper>
    );
  }

  return (
    <Carousel className="drop-shadow-xl w-[200px] md:w-[400px] " animation="slide" height={windowSize.innerWidth > 768 ? 400 : 200}>
      {items.map((item, i) => (
        <Item key={i} url={item} />
      ))}
    </Carousel>
  );
}

function Service() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/services");
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-between px-32 mt-20 font-poppins">
        <div className="flex flex-col">
          <p className="font-extrabold text-space-cadet text-3xl">Jasa Design Logo</p>
        </div>
        <div>
          <PortfolioCarousel />
        </div>
      </div>
    </>
  );
}

export default Service;
