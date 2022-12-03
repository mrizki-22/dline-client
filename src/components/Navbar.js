import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/image/icon.webp";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Layanan", link: "/services" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Kontak", link: "/contact" },
    { name: "Tentang Kami", link: "/about" },
  ];

  return (
    <div className="flex flex-col md:flex-row font-poppins px-8 md:px-28 py-4 pb-8 md:pb-4 justify-between bg-white  drop-shadow-xl md:drop-shadow-none">
      <div id="brand" className="z-[1]">
        <a className="flex items-end space-x-2 px-3" href="/">
          <img src={logo} alt="logo" />
          <h1 className="font-bold text-2xl text-space-cadet m-0 p-0 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500 transition duration-500 ease-in-out">Dline</h1>
        </a>
      </div>

      <div className="absolute md:hidden top-6 right-11 cursor-pointer z-[1]" onClick={() => setOpen(!open)}>
        {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
      </div>

      <div className="md:hidden absolute left-0 top-0 w-screen h-20 bg-white"></div>
      <div className={`static flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 font-semibold text-sm items-center mt-8 md:mt-0 transition-all duration-700 ease-in-out ${open ? "" : "-mt-60"}`}>
        {navItems.map((item) => {
          return (
            <Link
              to={item.link}
              className={
                location.pathname == item.link
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500"
                  : "text-space-cadet hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500 transition duration-500 ease-in-out"
              }
            >
              {item.name}
            </Link>
          );
        })}
        <Link
          to="/services"
          className="font-bold box-border text-sm text-white bg-gradient-to-r from-red-500 to-amber-500 px-4 py-2 transition duration-500 ease-in-out rounded-md border-2 border-white hover:bg-white hover:text-transparent hover:bg-clip-text  hover:border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500 md:hidden"
        >
          Order Sekarang
        </Link>
      </div>
      <div className="hidden md:flex items-center flex-col md:flex-row md:items-center mt-2">
        <Link
          to="/services"
          className="font-bold box-border text-sm text-white bg-gradient-to-r from-red-500 to-amber-500 px-4 py-2 transition duration-500 ease-in-out rounded-md border-2 border-white hover:bg-white hover:text-transparent hover:bg-clip-text  hover:border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-500"
        >
          Order Sekarang
        </Link>
      </div>
    </div>
  );
}
