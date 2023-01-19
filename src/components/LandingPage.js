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

  let items = [require("../assets/image/g1.jpg"), require("../assets/image/g2.jpg"), require("../assets/image/g3.jpg"), require("../assets/image/g4.jpg"), require("../assets/image/g5.jpg"), require("../assets/image/g6.jpg")];

  function Item(props) {
    return (
      <Paper className="w-full h-full flex items-center justify-center border-[1px]">
        <img src={props.url} alt="gambar" className="w-[300px] md:w-[500px]" />
      </Paper>
    );
  }

  return (
    <Carousel className="drop-shadow-xl w-[300px] md:w-[500px]" animation="slide" height={windowSize.innerWidth > 768 ? 500 : 300}>
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
  const [ref3, inView3] = useInView({
    threshold: 0.8,
    triggerOnce: true,
    rootMargin: "-100px",
  });

  useEffect(() => {
    document.title = "Dline - Jasa Design Grafis";
    document.body.style.backgroundColor = "white";
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
              <p className="font-medium text-[12px] md:text-[15px] text-space-cadet">Dline adalah layanan desain grafis dengan harga terjangkau serta mengutamakan kualitas dan kecepatan.</p>
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
              <SecondaryButton link="/services/1" text="Lihat Selengkapnya" />
            </div>
          </div>
          <div className={`box flex flex-col bg-white px-14 py-12 rounded-[20px] drop-shadow-lg space-y-10 items-center ${inView ? "animate-slide-top" : "hidden"}`}>
            <div className="box-content flex flex-col text-center w-[213px] items-center space-y-5">
              <img src={logo} alt="logo" className="w-[72px]" />
              <p className="font-semibold text-[20px] text-space-cadet">Jasa Desain Banner</p>
              <p className="font-light text-[14px]">Desain Banner untuk acara kegiatan</p>
            </div>
            <div>
              <SecondaryButton link="/services/2" text="Lihat Selengkapnya" />
            </div>
          </div>
          <div className={`box flex flex-col bg-white px-14 py-12 rounded-[20px] drop-shadow-lg space-y-10 items-center ${inView ? "animate-slide-top" : "hidden"}`}>
            <div className="box-content flex flex-col text-center w-[213px] items-center space-y-5">
              <img src={logo} alt="logo" className="w-[72px]" />
              <p className="font-semibold text-[20px] text-space-cadet">Jasa Desain Kaos</p>
              <p className="font-light text-[14px]">Jasa Desain kaos murah meriah</p>
            </div>
            <div>
              <SecondaryButton link="/services/5" text="Lihat Selengkapnya" />
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

      {/* {why us section} */}
      <div className=" w-screen py-24 flex flex-col space-y-16  items-center bg-[#f9eaea]">
        <div className="font-semibold text-center">
          <p className="text-sm text-candy-apple-red">Dline</p>
          <p className="text-[28px] text-space-cadet">Mengapa Kami?</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-12" ref={ref3}>
          <div className={inView3 ? "animate-slide-top" : "hidden"}>
            <div className="bg-white rounded-lg drop-shadow-md overflow-hidden flex flex-col w-[300px] items-center p-5">
              <div>
                <img src={require("../assets/image/creative.gif")} alt="ilustrasi" width={150} />
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center text-black">
                <p className="font-semibold text-xl">Kreatif</p>
                <p className="text-center">Kami memiliki tim yang kreatif dan berpengalaman</p>
              </div>
            </div>
          </div>

          <div className={inView3 ? "animate-slide-top" : "hidden"}>
            <div className="bg-white rounded-lg drop-shadow-md overflow-hidden flex flex-col w-[300px] items-center p-5">
              <div>
                <img src={require("../assets/image/design.gif")} alt="ilustrasi" width={150} />
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center text-black">
                <p className="font-semibold text-xl">Banyak Layanan</p>
                <p className="text-center">Kami menyediakan berbagai layanan sesuai kebutuhan anda</p>
              </div>
            </div>
          </div>

          <div className={inView3 ? "animate-slide-top" : "hidden"}>
            <div className="bg-white rounded-lg drop-shadow-md overflow-hidden flex flex-col w-[300px] items-center p-5">
              <div className="mr-7">
                <img src={require("../assets/image/ontime.gif")} alt="ilustrasi" width={150} />
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center text-black">
                <p className="font-semibold text-xl">Tepat Waktu</p>
                <p className="text-center">Kami berusaha memberikan layanan yang tepat waktu</p>
              </div>
            </div>
          </div>

          <div className={inView3 ? "animate-slide-top" : "hidden"}>
            <div className="bg-white rounded-lg drop-shadow-md overflow-hidden flex flex-col w-[300px] items-center p-5">
              <div>
                <img src={require("../assets/image/secure-payment.gif")} alt="ilustrasi" width={150} />
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center text-black">
                <p className="font-semibold text-xl">Transaksi Aman</p>
                <p className="text-center">Kami menjamin transaksi yang anda lakukan aman</p>
              </div>
            </div>
          </div>

          <div className={inView3 ? "animate-slide-top" : "hidden"}>
            <div className="bg-white rounded-lg drop-shadow-md overflow-hidden flex flex-col w-[300px] items-center p-5">
              <div>
                <img src={require("../assets/image/cs.gif")} alt="ilustrasi" width={150} />
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center text-black">
                <p className="font-semibold text-xl">CS Responsif</p>
                <p className="text-center">CS yang ramah dan siap membantu anda</p>
              </div>
            </div>
          </div>

          <div className={inView3 ? "animate-slide-top" : "hidden"}>
            <div className="bg-white rounded-lg drop-shadow-md overflow-hidden flex flex-col w-[300px] items-center p-5">
              <div>
                <img src={require("../assets/image/file.gif")} alt="ilustrasi" width={150} />
              </div>
              <div className="flex flex-col space-y-2 justify-center items-center text-black">
                <p className="font-semibold text-xl">File Lengkap</p>
                <p className="text-center">File Master yang kami kirimkan lengkap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
