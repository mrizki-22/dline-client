import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import image from "../assets/image/laptop.jpg";

function About() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center overflow-x-hidden">
        <div className="w-screen h-[500px] bg-no-repeat bg-cover flex justify-center items-center" style={{ backgroundImage: `url(${image})` }}>
          <div className="flex flex-col space-y-5 justify-center w-[800px]">
            <p className="font-bold text-white drop-shadow-sm text-5xl text-center">Dline</p>
            <p className="text-white text-center text-sm leading-6">
              Dline merupakan perusahaan yang berfokus pada layanan desain grafis. Kami memiliki tim yang terdiri dari desainer grafis yang berkompeten dan berpengalaman di bidangnya. Kami menawarkan beragam layanan desain grafis, seperti
              desain logo, desain banner, desain poster, dan lain-lain. Kami selalu berusaha memberikan hasil yang terbaik sesuai dengan kebutuhan dan keinginan klien. Kami memahami betapa pentingnya desain grafis bagi suatu perusahaan atau
              bisnis, sehingga kami selalu memberikan layanan yang berkualitas dan terbaik bagi klien kami.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-12 my-10 mx-auto">
          <div>
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

          <div>
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

          <div>
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

          <div>
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

          <div>
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

          <div>
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
    </>
  );
}

export default About;
