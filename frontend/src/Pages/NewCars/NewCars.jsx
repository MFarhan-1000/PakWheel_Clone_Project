import React, { useState } from "react";
import { Link } from "react-router-dom";
import { popularCars } from "./PopularCars/PopularCarsData";
import {upCommingCars} from "./UpCommingCars/UpcommingCarsData"

function NewCars() {
  const [activetab, setactivetab] = useState("popular");


  return (
    <div className="bg-gray-300">
      <section className="max-w-5xl m-auto h-auto p-6 ">
        <div>
          <h2 className="font-semibold text-2xl">Featured New Cars</h2>
        </div>

        {/* Buttons Start here */}
        <div className="flex gap-4 mt-6 font-semibold text-lg">
          <button
            className={`px-4 p-2 cursor-pointer border-b-2 
                ${
                  activetab === "popular" ?
                    "border-b-2 border-blue-500"
                  : "border-transparent"
                }`}
            onClick={() => {
              setactivetab("popular");
            }}
          >
            Popular
          </button>

          <button
            className={`px-4 p-2 cursor-pointer border-b-2
                ${
                  activetab === "upcomming" ?
                    "border-b-2 border-blue-500 "
                  : "border-transparent"
                }`}
            onClick={() => {
              setactivetab("upcomming");
            }}
          >
            Upcomming
          </button>
        </div>
        {/* Buttons ends here */}

        {/* All Cars details here */}

        {/* Popular tab */}
        {activetab === "popular" && (
          <div className="flex flex-wrap -mx-2 mt-4">
            {popularCars.map((item) => (
              <div
                key={item.car}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <div className="group h-full bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center transform hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="w-full h-32 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-2">
                    <img
                      src={item.herf}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Details Container */}
                  <div className="mt-1 w-full space-y-1">
                    <h4 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-2 mt-2 border border-gray-100">
                      <h5 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Price Range
                      </h5>
                      <p className="text-sm font-bold text-emerald-600 mt-0.5">
                        PKR {item.min_price} - {item.max_price}
                      </p>
                      <Link
                        to={`/newcars/${item.car}`}
                        className="mt-3 inline-block bg-[#233d7b] hover:bg-blue-900 text-white text-xs font-medium px-4 py-2 rounded-md shadow-sm hover:shadow transition-all duration-200 text-center"
                      >
                        More Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* UpComming Cars */}
       {activetab === "upcomming" && (
  <div className="flex flex-wrap items-stretch justify-start gap-4 mt-4">
    {upCommingCars.map((item) => (
      <div
        key={item.car}
        className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] flex flex-col items-center justify-between bg-white p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        {/* Car Image */}
        <div className="w-full h-36 flex items-center justify-center mb-3">
          <img
            src={item.herf}
            alt={item.name}
            className="max-h-full w-auto object-contain"
          />
        </div>

        {/* Car Info */}
        <div className="w-full text-center space-y-1">
          <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
            {item.name}
          </h4>
          <p className="text-xs font-semibold text-emerald-600">
            PKR {item.price}
          </p>
        </div>

        {/* More Detail CTA */}
        <Link
          to={`/newcars/upcomming/${item.car}`}
          className="mt-4 w-full bg-[#233d7b] hover:bg-blue-900 text-white text-xs font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 text-center"
        >
          More Detail
        </Link>
      </div>
    ))}
  </div>
)}

      </section>
    </div>
  );
}

export default NewCars;
