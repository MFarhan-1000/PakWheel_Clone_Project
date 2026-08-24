import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#232933] text-[#a1a7b3] text-sm font-sans">
      {/* Top Banner: Get PakWheels App */}

      <div className="bg-[#1b2028] border-b border-[#2d3542] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-row  items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-center ">
            {/* ADD YOUR OWN ICON/IMAGE HERE */}

            <div className="ml-20">
              <h3 className="text-white  text-xl font-bold mb-1">
                <i className="fa-brands fa-google-play"></i>
                Get the PakWheels App
              </h3>
              <p className="text-[#a1a7b3] text-sm">
                Buy & Sell Cars, Bikes and Auto Parts faster and easier using
                our App
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">

{/* First icons  */}
            <Link className="bg-black text-white hover:bg-gray-900 border border-gray-700 rounded-md px-4 py-2 inline-flex items-center gap-3">
              <img className="w-7 h-7 object-contain "
                src="/src/assets/1492616988-12-play-store-google-android-game-service-marketplace_83394.webp" alt="Google Play"/>
              <div className="text-left ">
                <div className="text-[10px] uppercase text-gray-400 font-medium tracking-wide"> Get it on</div>
                <div className="text-sm font-semibold text-white mt-0.5">Google Play</div>
              </div>
            </Link>

{/* second icons  */}
<Link className="bg-black text-white hover:bg-gray-900 border border-gray-700 rounded-md px-4 py-2 inline-flex items-center gap-3">
              <img className="w-7 h-7 object-contain "
                src="/src/assets/Appstore.jpg" alt="Google Play"/>
              <div className="text-left ">
                <div className="text-[10px] uppercase text-gray-400 font-medium tracking-wide"> Download on the</div>
                <div className="text-sm font-semibold text-white mt-0.5">App Store</div>
              </div>
            </Link>

{/* Third icon */}
<Link className="bg-black text-white hover:bg-gray-900 border border-gray-700 rounded-md px-4 py-2 inline-flex items-center gap-3">
              <img className="w-7 h-7 object-contain "
                src="/src/assets/app.png" alt="Google Play"/>
              <div className="text-left ">
                <div className="text-[10px] uppercase text-gray-400 font-medium tracking-wide"> Explore it on</div>
                <div className="text-sm font-semibold text-white mt-0.5">AppGallery</div>
              </div>
            </Link>



          </div>
        </div>
      </div>

      {/* Main Footer Navigation Links */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1: Cars By Make */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-gray-700 pb-2">
              Cars By Make
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link className="hover:text-white ">Toyota Cars for Sale</Link>
              </li>

              <li>
                <Link className="hover:text-white ">Suzuki Cars for Sale</Link>
              </li>

              <li>
                <Link className="hover:text-white ">Honda Cars for Sale</Link>
              </li>

              <li>
                <Link className="hover:text-white ">
                  Daihatsu Cars for Sale
                </Link>
              </li>

              <li>
                <Link className="hover:text-white">Hyundai Cars for Sale</Link>
              </li>

              <li>
                <Link className="hover:text-white">Nissan Cars for Sale</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Cars By City */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-gray-700 pb-2">
              Cars By City
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link className="hover:text-white ">Cars in Lahore</Link>
              </li>

              <li>
                <Link className="hover:text-white">Cars in Karachi</Link>
              </li>

              <li>
                <Link className="hover:text-white">Cars in Islamabad</Link>
              </li>

              <li>
                <Link className="hover:text-white">Cars in Rawalpindi</Link>
              </li>

              <li>
                <Link className="hover:text-white">Cars in Peshawar</Link>
              </li>

              <li>
                <Link className="hover:text-white">Cars in Faisalabad</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore PakWheels */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-gray-700 pb-2">
              Explore PakWheels
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link className="hover:text-white">Used Cars</Link>
              </li>

              <li>
                <Link className="hover:text-white">Used Bike</Link>
              </li>

              <li>
                <Link className="hover:text-white">New Cars</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: PakWheels.com */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-gray-700 pb-2">
              PakWheels.com
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link className="hover:text-white">About PakWheels.com</Link>
              </li>

              <li>
                <Link className="hover:text-white">Our Products</Link>
              </li>

              <li>
                <Link className="hover:text-white ">Advertise With Us</Link>
              </li>

              <li>
                <Link className="hover:text-white ">How To Pay</Link>
              </li>
              <li>
                <Link className="hover:text-white ">Contact Us</Link>
              </li>

              <li>
                <Link className="hover:text-white"> Careers</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Subscribe & Follow Us */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-gray-700 pb-2">
              Sell On PakWheels
            </h4>
            <ul className="space-y-2 text-xs mb-6">
              <li>
                <Link className="hover:text-white"> Sell Your Car</Link>
              </li>
              <li>
                <Link className="hover:text-white"> Sell Your Bike</Link>
              </li>
            </ul>

            <h4 className="text-white font-bold text-base mb-3">
              Subscribe to Newsletter
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Name@email.com"
                className="bg-[#1b2028] text-white text-xs px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-[#b71c1c] hover:bg-[#991515] text-white text-xs font-semibold py-2 rounded transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-10 pt-6 border-t border-[#2d3542] flex flex-col items-center justify-between gap-4">
          <div className="text-xs text-[#a1a7b3]">
            Follow Us On Social Media
          </div>
          <div className="flex items-center gap-3">
            <Link>
              <img
                className="w-8 h-8  rounded-full bg-[#1b2028] hover:bg-[#ff0000] text-gray-300 hover:text-white flex items-center justify-center "
                src="/src/assets/youtube(2).jpg"
                alt="Youtube"
              />
            </Link>

            <Link>
              <img
                className="w-8 h-8 rounded-full bg-[#1b2028] hover:bg-[#ff0000] text-gray-300 hover:text-white flex items-center justify-center "
                src="/src/assets/images.jpg"
                alt="Facebook"
              />
            </Link>

            <Link>
              <img
                className="w-8 h-8 rounded-full bg-[#1b2028] hover:bg-[#ff0000] text-gray-300 hover:text-white flex items-center justify-center "
                src="/src/assets/twitter.png"
                alt="Twitter"
              />
            </Link>

            <Link>
              <img
                className="w-8 h-8"
                src="/src/assets/1492616988-12-play-store-google-android-game-service-marketplace_83394.webp"
                alt="Playstore"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright*/}
      <div className="bg-[#181c23] py-4 text-center text-xs text-gray-500 border-t border-[#232933]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col  items-center justify-between gap-2">
          <p>
            Copyright © 2003 - 2026 PakWheels (Pvt) Ltd. - All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link className="hover:underline">Terms of Service</Link>

            <span>|</span>

            <Link className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
