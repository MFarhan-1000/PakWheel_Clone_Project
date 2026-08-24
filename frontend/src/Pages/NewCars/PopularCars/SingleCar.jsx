import React from 'react';

const SingleCar = ({ carData }) => {
  if (!carData) {
    return <div className="p-4 text-center text-gray-500">No car details provided.</div>;
  }

  // Destructure Values
  const {
    name = '',
    min_price = '',
    max_price = '',
    herf = '',
    fuelType = '',
    mileage = '',
    engine = ''
  } = carData;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 font-sans">
      {/* Title */}
      <h1 className="text-xl sm:text-3xl font-bold text-[#233d7b] mb-4 sm:mb-6">
        {name}
      </h1>

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        
        {/* Top Section: Price & Image (Flex Layout) */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">

          {/* Price Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-1">
            <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
              Price Range
            </span>
            <div className="text-sm text-gray-500 font-medium">
              PKR <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                {min_price} {max_price ? `- ${max_price}` : ''}
              </span>
            </div>
          </div>

          {/* Image Container */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            {herf ? (
              <img
                src={herf}
                alt={name}
                className="max-h-48 sm:max-h-56 w-auto object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                No Image Available
              </div>
            )}
          </div>

        </div>

        {/* Bottom Specifications Ribbon (Flex Layout) */}
        <div className="border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row">

          {/* Mileage */}
          <div className="flex-1 p-4 text-center border-b sm:border-b-0 sm:border-r border-gray-200">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">MILEAGE</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">{mileage || 'N/A'}</p>
          </div>

          {/* Fuel Type */}
          <div className="flex-1 p-4 text-center border-b sm:border-b-0 sm:border-r border-gray-200">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">FUEL TYPE</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">{fuelType || 'N/A'}</p>
          </div>

          {/* Engine */}
          <div className="flex-1 p-4 text-center">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">ENGINE</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 mt-1">{engine || 'N/A'}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SingleCar;