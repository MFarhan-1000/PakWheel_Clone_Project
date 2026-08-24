import React from 'react';

const SingleCarDetail = ({ carData }) => {
  if (!carData) {
    return <div className="p-4 text-center text-gray-500">No car details provided.</div>;
  }

  const {
    name = '',
    herf = '',
    price = '',
    expectedLaunch = '',
    fuelType = '',
    bodyType = '',
    engine = ''
  } = carData;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 font-sans">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-3xl font-bold text-[#233d7b]">
          {name}
        </h1>
        {bodyType && (
          <span className="self-start sm:self-auto bg-blue-50 text-[#233d7b] text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
            {bodyType}
          </span>
        )}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        
        {/* Top Section: Price & Image */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">

          {/* Price & Launch Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-3">
            <div>
              <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block">
                Price Estimate
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
                {price}
              </div>
            </div>

            {expectedLaunch && (
              <div className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md w-fit font-medium">
                <span className="text-gray-400 mr-1.5">Expected Launch:</span>
                <span className="text-gray-800 font-semibold">{expectedLaunch}</span>
              </div>
            )}
          </div>

          {/* Car Image Display */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            {herf ? (
              <img
                src={herf}
                alt={name}
                className="max-h-48 sm:max-h-60 w-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                No Image Available
              </div>
            )}
          </div>

        </div>

        {/* Specifications Ribbon (Flex Layout) */}
        <div className="border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row">

          {/* Fuel Type */}
          <div className="flex-1 p-4 text-center border-b sm:border-b-0 sm:border-r border-gray-200">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">FUEL TYPE</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">{fuelType || 'N/A'}</p>
          </div>

          {/* Engine */}
          <div className="flex-1 p-4 text-center border-b sm:border-b-0 sm:border-r border-gray-200">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">ENGINE / POWER</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">{engine || 'N/A'}</p>
          </div>

          {/* Body Type */}
          <div className="flex-1 p-4 text-center">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">BODY STYLE</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">{bodyType || 'N/A'}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SingleCarDetail;