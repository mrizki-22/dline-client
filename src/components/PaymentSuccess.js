import React from "react";
import icon from "../assets/image/payment.gif";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  document.body.style.backgroundColor = "#ffffff";
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-center">
          <img src={icon} alt="success icon" border="0" width={150} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center text-space-cadet">Pembayaran Berhasil</h1>
          <p className="text-space-cadet mt-2 w-[500px] text-center">kami telah mengirimkan detail transaksi ke nomor whatsapp anda. Jika belum menerima pesan harap hubungi nomor whatsapp kami</p>
        </div>
        <div className="mx-auto">
          <Link to="/home" className="text-blue-300 text-center underline">
            Kembali ke home page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
