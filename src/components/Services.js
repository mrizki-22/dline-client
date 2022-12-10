import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import logo from "../assets/image/logo.webp";
import axios from "axios";

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

function Services() {
  const [items, setItems] = useState([]);

  function convertPrice(price) {
    var price = price.toString();
    var sisa = price.length % 3;
    var rupiah = price.substr(0, sisa);
    var ribuan = price.substr(sisa).match(/\d{3}/g);
    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return rupiah;
  }

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:5000/services/");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col font-poppins mt-5 mb-28">
        <div className="flex justify-center space-x-2 text-center font-extrabold text-space-cadet text-xl md:text-3xl">
          <p className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500 transition duration-500 ease-in-out">Daftar</p>
          <p className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500 transition duration-500 ease-in-out">Layanan</p>
          <p className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500 transition duration-500 ease-in-out">Kami</p>
        </div>
        <div className="w-40 border-b border-space-cadet mx-auto mt-4"></div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 px-10 md:px-40 mt-20">
          {items.map((item, index) => {
            return (
              <div key={index} className=" flex flex-col bg-white px-14 py-12 rounded-[20px] drop-shadow-xl space-y-10 items-center">
                <div className="box-content flex flex-col text-center w-[213px] items-center space-y-5">
                  <img src={logo} alt="logo" className="w-[36px] md:w-[72px]" />
                  <p className="font-semibold text-[24px] text-space-cadet">{item.name}</p>
                  <div className="flex flex-col justify-center text-space-cadet">
                    <p className="font-light text-[14px]">Harga mulai dari</p>
                    <p className="font-bold text-[20px]">Rp {convertPrice(item.startingPrice)}</p>
                  </div>
                </div>
                <div>
                  <SecondaryButton link={`/services/${item.id}`} text="Lihat Selengkapnya" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
