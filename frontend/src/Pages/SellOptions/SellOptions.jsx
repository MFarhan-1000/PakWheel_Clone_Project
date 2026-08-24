import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
      <div>
      <div className="max-w-5xl mx-auto my-10 mb-16 sm:mb-25 px-4">
 
        <div className="flex justify-center">
          <h1 className="relative z-10 text-center font-bold text-xl sm:text-2xl leading-tight text-gray-800 mb-4 sm:-mb-4 bg-white w-full sm:w-170 px-2">
            Sell Your Car on PakWheels and Get the Best Price
          </h1>
        </div>
 
        {/* Main Div Of both Boxes */}
        <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-md bg-white shadow-sm p-6">
          {/* Left Side Box */}
          <div className="flex-1 p-4 sm:p-6 space-y-3 w-full">
            <h2 className="text-blue-900 font-semibold text-xl">
              Post your Ad on PakWheels
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> Post an ad
                in 2 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> Over 20
                million buyers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> Direct buyer
                connections
              </li>
            </ul>
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded text-sm">
              <Link to={"/PostAd"}>
                Post An Ad
              </Link>
            </button>
          </div>
 
          {/* Divider between boxes - vertical line on desktop, horizontal on mobile */}
          <div className="relative flex items-center justify-center w-full md:w-auto my-4 md:my-0">
            <div className="absolute flex items-center justify-center">
              <div className="hidden md:block h-48 w-0.5 bg-gray-300"></div>
              <div className="block md:hidden w-full h-0.5 bg-gray-300"></div>
            </div>
 
            <div className="relative z-10 bg-white px-3 py-1 font-bold text-gray-500 text-2xl">
              OR
            </div>
          </div>
 
          {/* Right side of box */}
          <div className="flex-1 p-4 sm:p-6 md:ml-8 space-y-3 w-full">
            <h2 className="text-blue-900 font-semibold text-xl">
              Try PakWheels Sell It For Me
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> Dedicated
                sales expert
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> Free
                inspection & listing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> Secure &
                hassle-free deal
              </li>
            </ul>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded text-sm transition">
              <Link to={"/sellcar"}>
                Register Your Car
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
