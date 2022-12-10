import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import ilustrasi from "../assets/image/ilustrasi.png";
import logo from "../assets/image/logo.webp";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

function PrimaryButton(props) {
  return (
    <>
      <Link
        to={props.link}
        className={`font-bold text-center box-border text-md text-white bg-gradient-to-r from-red-500 to-amber-500 px-4 py-2 transition duration-500 ease-in-out rounded-md border-2 border-white hover:bg-white hover:text-transparent hover:bg-clip-text  hover:border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500  ${props.className}`}
      >
        {props.text}
      </Link>
    </>
  );
}
function SecondaryButton(props) {
  return (
    <>
      <Link
        to={props.link}
        className={`font-medium text-center box-border text-[14px] rounded-[10px] border-2 px-4 py-2 transition duration-500 ease-in-out bg-white text-transparent bg-clip-text border-red-500 bg-gradient-to-r from-red-500 to-amber-500 hover:text-white  hover:bg-clip-padding hover:border-none ${props.className}`}
      >
        {props.text}
      </Link>
    </>
  );
}

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
        <img src={props.url} alt="gambar" className="w-[300px] md:w-[500px]" />
      </Paper>
    );
  }

  return (
    <Carousel className="drop-shadow-xl w-[300px] md:w-[500px] " animation="slide" height={windowSize.innerWidth > 768 ? 500 : 300}>
      {items.map((item, i) => (
        <Item key={i} url={item} />
      ))}
    </Carousel>
  );
}

function LandingPage() {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    rootMargin: "-80px",
  });
  const [ref2, inView2] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  useEffect(() => {
    document.title = "Dline - Jasa Design Grafis";
  }, []);
  return (
    <div className="font-poppins  overflow-x-hidden">
      <Navbar />
      {/* Jumbotron */}
      <div className="flex justify-center py-24 px-8 md:px-44 ">
        <div className="flex space-x-52  w-full justify-between">
          <div className="flex flex-col w-[450px] items-center md:items-start">
            <div className="space-y-4 text-center md:text-start">
              <h1 className="font-bold text-[24px] md:text-[32px] text-space-cadet">Layanan Jasa Design Cepat dan Berkualitas</h1>
              <p className="font-medium text-[12px] md:text-[15px] text-space-cadet">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde consequatur tempora debitis necessitatibus, eos quia veniam aperiam accusamus iure ad.</p>
            </div>
            <div className="mt-10">
              <PrimaryButton link="/services" text="Order Sekarang" />
            </div>
          </div>
          <div className="hidden md:flex items-center z-[-1]">
            <img src={ilustrasi} alt="ilustrasi" />
          </div>
        </div>
      </div>

      {/* {services section} */}
      <div className="flex flex-col py-24 px-4   bg-[#f9eaea] place-items-center space-y-14 overflow-y-hidden" ref={ref}>
        <div className="font-semibold text-center">
          <p className="text-sm text-candy-apple-red">Services</p>
          <p className="text-[28px] text-space-cadet">Layanan Kami</p>
        </div>
        <div className="boxes flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-6 md:space-y-0">
          <div className={`box flex flex-col bg-white px-14 py-12 rounded-[20px] drop-shadow-lg space-y-10 items-center ${inView ? "animate-slide-top" : "hidden"}`}>
            <div className="box-content flex flex-col text-center w-[213px] items-center space-y-5">
              <img src={logo} alt="logo" className="w-[72px]" />
              <p className="font-semibold text-[24px] text-space-cadet">Jasa Desain Logo</p>
              <p className="font-light text-[14px]">Desain logo untuk perusahaan atau kegiatan usaha</p>
            </div>
            <div>
              <SecondaryButton link="/logo" text="Lihat Selengkapnya" />
            </div>
          </div>
          <div className={`box flex flex-col bg-white px-14 py-12 rounded-[20px] drop-shadow-lg space-y-10 items-center ${inView ? "animate-slide-top" : "hidden"}`}>
            <div className="box-content flex flex-col text-center w-[213px] items-center space-y-5">
              <img src={logo} alt="logo" className="w-[72px]" />
              <p className="font-semibold text-[24px] text-space-cadet">Jasa Desain Logo</p>
              <p className="font-light text-[14px]">Desain logo untuk perusahaan atau kegiatan usaha</p>
            </div>
            <div>
              <SecondaryButton link="/logo" text="Lihat Selengkapnya" />
            </div>
          </div>
          <div className={`box flex flex-col bg-white px-14 py-12 rounded-[20px] drop-shadow-lg space-y-10 items-center ${inView ? "animate-slide-top" : "hidden"}`}>
            <div className="box-content flex flex-col text-center w-[213px] items-center space-y-5">
              <img src={logo} alt="logo" className="w-[72px]" />
              <p className="font-semibold text-[24px] text-space-cadet">Jasa Desain Logo</p>
              <p className="font-light text-[14px]">Desain logo untuk perusahaan atau kegiatan usaha</p>
            </div>
            <div>
              <SecondaryButton link="/logo" text="Lihat Selengkapnya" />
            </div>
          </div>
        </div>
        <div>
          <PrimaryButton link="/services" text="Lihat Layanan Lainnya" className={`${inView ? "animate-slide-top" : "hidden"}`} />
        </div>
      </div>

      {/* {portfolio section} */}
      <div className=" w-screen py-24 flex flex-col space-y-16  items-center">
        <div className="font-semibold text-center">
          <p className="text-sm text-candy-apple-red">Portfolio</p>
          <p className="text-[28px] text-space-cadet">Portfolio Kami</p>
        </div>
        <div className="mx-auto overflow-y-hidden" ref={ref2}>
          <div className={inView2 ? "animate-slide-top" : "hidden"}>
            <PortfolioCarousel />
          </div>
        </div>
        <div className="">
          <PrimaryButton link="/portfolio" text="Lihat Portfolio Lainnya" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
