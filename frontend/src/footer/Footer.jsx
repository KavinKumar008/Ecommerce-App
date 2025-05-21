import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white flex justify-around lg:p-6 p-2 lg:gap-0 gap-5 ">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[#878787] lg:text-[13px] text-[10px]">ABOUT</p>
          </div>
          <div className="lg:text-[13px] text-[10px] flex flex-col gap-2">
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Contact Us
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              About Us
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Careers
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Ekart Stories
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Press
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[#878787] lg:text-[13px] text-[10px]">HELP</p>
          </div>
          <div className="lg:text-[13px] text-[10px] flex flex-col gap-2">
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Payments
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Shipping
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Cancellation &
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Returns
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              FAQ
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[#878787] lg:text-[13px] text-[10px]">
              CONSUMER POLICY
            </p>
          </div>
          <div className="lg:text-[13px] text-[10px] flex flex-col gap-2">
            <span className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Cancellation &
            </span>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Returns
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Terms Of Use
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Security
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Privacy
            </p>
            <p className="cursor-pointer inline-block w-fit leading-none hover:border-b-[1px] hover:border-b-white transition-all duration-200">
              Site Map
            </p>
          </div>
        </div>
        <div>
          <p className="text-[#878787] lg:text-[13px] text-[10px]">
            CONNECT WITH US
          </p>
          <div className="flex gap-3 lg:gap-4 mt-2 cursor-pointer lg:text-xl">
            <FaYoutube />
            <FaTwitter />
            <FaWhatsapp />
            <FaFacebook />
            <FaInstagram />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div>
              <p className="text-[#878787] lg:text-[13px] text-[10px]">
                Mail Us
              </p>
            </div>
            <div className="lg:text-[13px] text-[10px]">
              <p>Ekart Internet Private Limited,</p>
              <p>Anna Nagar,</p>
              <p>Vadapalani,Vellithiruppur Village,</p>
              <p>Erode,638317,</p>
              <p>Tamil Nadu,India</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
