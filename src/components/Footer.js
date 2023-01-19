import { width } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/icon.webp";

function Footer() {
  return (
    <div className="bg-amber-500 w-full flex flex-col font-poppins">
      <div className="flex justify-around py-10">
        <div className="hidden md:flex flex-col w-60  space-y-3">
          <div id="brand" className="z-[1] bg-space-cadet p-3 rounded-lg w-40 flex justify-center">
            <a className="flex items-end space-x-2 px-3" href="/">
              <img src={logo} alt="logo" />
              <h1 className="font-bold text-2xl text-white m-0 p-0 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500 transition duration-500 ease-in-out">Dline</h1>
            </a>
          </div>
          <div className="text-space-cadet w-30">
            <p className="text-xs">Dline adalah layanan desain grafis dengan harga terjangkau serta mengutamakan kualitas dan kecepatan.</p>
          </div>
        </div>
        <div className="text-space-cadet space-y-3">
          <div>
            <p className="font-bold text-lg">Populer</p>
          </div>
          <div className="flex flex-col space-y-2 text-space-cadet">
            <Link to={"#"}>
              <p className="text-sm hover:text-white">Desain Logo</p>
            </Link>
            <Link to={"#"}>
              <p className="text-sm hover:text-white">Desain Banner</p>
            </Link>
            <Link to={"#"}>
              <p className="text-sm hover:text-white">Desain Kemasan</p>
            </Link>
          </div>
        </div>
        <div className="text-space-cadet space-y-3">
          <p className="font-bold text-lg">Hubungi Kami</p>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-1">
              <img src={require("../assets/image/gmail-icon.png")} alt="Gmail" width={30} />
              <p className="hover:text-white text-sm mt-1">
                <a href="mailto:design.and.deadline@gmail.com">design.and.deadline@gmail.com</a>
              </p>
            </div>
            <div className="flex space-x-1">
              <img src={require("../assets/image/whatsapp-icon.png")} alt="Gmail" width={25} />
              <p className="text-sm hover:text-white mt-1">
                <a href="https://wa.me/085173101863" target={"_blank"}>
                  +62 851-7310-1863
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-space-cadet text-center p-2 text-white">
        <p>© 2022 - 2023 Dline. Made with ❤</p>
      </div>
    </div>
  );
}

export default Footer;
