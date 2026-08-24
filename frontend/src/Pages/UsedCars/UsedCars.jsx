import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function UsedCars() {
  const [activeTab, setActiveTab] = useState("category")

  return (
    <div className='mb-10 bg-gray-300 w-full py-6 px-4 sm:px-6 lg:px-8'>
      <section className='max-w-6xl m-auto min-h-110 '>

        {/* Header Title */}
        <div className='mb-4 text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left'>
          <h1>Browse Used Cars</h1>
        </div>

        {/* Navigation Tabs */}
        <div className='flex flex-wrap justify-center sm:justify-start border-b border-gray-400 gap-2 sm:gap-6 text-gray-600 pb-2 mb-6'>

          {/* Tab: Category */}
          <button
            onClick={() => setActiveTab("category")}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium border-b-2 transition-colors ${
              activeTab === "category"
                ? "text-gray-900 border-blue-600 font-semibold"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Category
          </button>

          {/* Tab: City */}
          <button
            onClick={() => setActiveTab("city")}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium border-b-2 transition-colors ${
              activeTab === "city"
                ? "text-gray-900 border-blue-600 font-semibold"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            City
          </button>

          {/* Tab: Make */}
          <button
            onClick={() => setActiveTab("make")}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium border-b-2 transition-colors ${
              activeTab === "make"
                ? "text-gray-900 border-blue-600 font-semibold"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Make
          </button>

          {/* Tab: Budget */}
          <button
            onClick={() => setActiveTab("budget")}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium border-b-2 transition-colors ${
              activeTab === "budget"
                ? "text-gray-900 border-blue-600 font-semibold"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Budget
          </button>

        </div>

        {/* 1. Category Section */}
        {activeTab === "category" && (
          <div className='flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start py-4'>

            <Link className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] bg-white shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center rounded text-gray-700 text-center gap-2'>
              <img className='h-12 object-contain' src="https://wsa3.pakwheels.com/assets/browse-more/car-ctg-electric-7e1bd16bad3457cf7e05e47daa8e5a25acb81bb479c77f525eb2698a30db0d54.svg" alt="Electric Car" />
              <h4 className='text-sm font-medium'>Electric Car</h4>
            </Link>

            <Link className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] bg-white shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center rounded text-gray-700 text-center gap-2'>
              <img className='h-12 object-contain' src="https://wsa4.pakwheels.com/assets/browse-more/car-ctg-luxury-31f36e7f32099f56af888a6b1a7a539d563c40c2cec0b9e5d4965e0461fd7e64.svg" alt="Sports Car" />
              <h4 className='text-sm font-medium'>Sports Car</h4>
            </Link>

            <Link className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] bg-white shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center rounded text-gray-700 text-center gap-2'>
              <img className='h-12 object-contain' src="https://wsa4.pakwheels.com/assets/browse-more/car-ctg-luxury-31f36e7f32099f56af888a6b1a7a539d563c40c2cec0b9e5d4965e0461fd7e64.svg" alt="Luxury Car" />
              <h4 className='text-sm font-medium'>Luxury Car</h4>
            </Link>

            <Link to="/oldcars" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] bg-white shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center rounded text-gray-700 text-center gap-2'>
              <img className='h-12 object-contain' src="https://wsa4.pakwheels.com/assets/browse-more/car-ctg-old-371bf5ee8fa9a89212cda1806690bdb1d48ba4e264704841baa31967ee2d60fa.svg" alt="Old Cars" />
              <h4 className='text-sm font-medium'>Old Cars</h4>
            </Link>

            <Link className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] bg-white shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center rounded text-gray-700 text-center gap-2'>
              <img className='h-12 object-contain' src="https://wsa4.pakwheels.com/assets/browse-more/car-ctg-luxury-31f36e7f32099f56af888a6b1a7a539d563c40c2cec0b9e5d4965e0461fd7e64.svg" alt="Japan Cars" />
              <h4 className='text-sm font-medium'>Japan Cars</h4>
            </Link>

            <Link className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] bg-white shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center rounded text-gray-700 text-center gap-2'>
              <img className='h-12 object-contain' src="https://wsa4.pakwheels.com/assets/browse-more/car-ctg-old-371bf5ee8fa9a89212cda1806690bdb1d48ba4e264704841baa31967ee2d60fa.svg" alt="Small Cars" />
              <h4 className='text-sm font-medium'>Small Cars</h4>
            </Link>

          </div>
        )}

        {/* 2. City Section */}
        {activeTab === "city" && (
          <div className='flex flex-wrap gap-4 py-4 text-gray-700 font-medium'>
            <Link to="/city?city=Islamabad" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Islamabad</Link>
            <Link to="/city?city=Rawalpindi" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Rawalpindi</Link>
            <Link to="/city?city=Lahore" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Lahore</Link>
            <Link to="/city?city=Karachi" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Karachi</Link>
            <Link to="/city?city=Multan" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Multan</Link>
            <Link to="/city?city=Quetta" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Quetta</Link>
            <Link to="/city?city=Peshawar" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Peshawar</Link>
            <Link to="/city?city=Gujrawala" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Gujrawala</Link>
            <Link to="/city?city=Faisalabad" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Faisalabad</Link>
            <Link to="/city?city=Sailkot" className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] hover:text-blue-600 transition-colors'>Sialkot</Link>
          </div>
        )}

        {/* 3. Make Section */}
        {activeTab === "make" && (
          <div className='flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start py-4'>

            <Link to="/make?make=mercedes" className="group flex flex-col items-center justify-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[13%] h-28 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-gray-500 transition-all p-2">
              <div className="h-16 w-full flex items-center justify-center">
                <img className="max-h-12 max-w-full group-hover:scale-110 transition-transform duration-200" src="https://cache2.pakwheels.com/system/car_manufacturers/manufacturers/000/000/027/resized/mercedes.png" alt="Mercedes" />
              </div>
              <span className="text-xs font-semibold text-gray-700 capitalize">Mercedes</span>
            </Link>

            <Link to="/make?make=Suzuki" className="group flex flex-col items-center justify-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[13%] h-28 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-gray-500 transition-all p-2">
              <div className="h-16 w-full flex items-center justify-center">
                <img className="max-h-12 max-w-full group-hover:scale-110 transition-transform duration-200" src="https://cache3.pakwheels.com/system/car_manufacturers/manufacturers/000/000/041/resized/Suzuki.png" alt="Suzuki" />
              </div>
              <span className="text-xs font-semibold text-gray-700 capitalize">Suzuki</span>
            </Link>

            <Link to="/make?make=toyota" className="group flex flex-col items-center justify-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[13%] h-28 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-gray-500 transition-all p-2">
              <div className="h-16 w-full flex items-center justify-center">
                <img className="max-h-12 max-w-full group-hover:scale-110 transition-transform duration-200" src="https://cache4.pakwheels.com/system/car_manufacturers/manufacturers/000/000/042/resized/Tyota.png" alt="Toyota" />
              </div>
              <span className="text-xs font-semibold text-gray-700 capitalize">Toyota</span>
            </Link>

            <Link to="/make?make=honda" className="group flex flex-col items-center justify-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[13%] h-28 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-gray-500 transition-all p-2">
              <div className="h-16 w-full flex items-center justify-center">
                <img className="max-h-12 max-w-full group-hover:scale-110 transition-transform duration-200" src="https://cache2.pakwheels.com/system/car_manufacturers/manufacturers/000/000/014/resized/Honda.png" alt="Honda" />
              </div>
              <span className="text-xs font-semibold text-gray-700 capitalize">Honda</span>
            </Link>

            <Link to="/make?make=daihatsu" className="group flex flex-col items-center justify-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[13%] h-28 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-gray-500 transition-all p-2">
              <div className="h-16 w-full flex items-center justify-center">
                <img className="max-h-12 max-w-full group-hover:scale-110 transition-transform duration-200" src="https://cache1.pakwheels.com/system/car_manufacturers/manufacturers/000/000/008/resized/daihatsu.png" alt="Daihatsu" />
              </div>
              <span className="text-xs font-semibold text-gray-700 capitalize">Daihatsu</span>
            </Link>

            <Link to="/make?make=Nisan" className="group flex flex-col items-center justify-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[13%] h-28 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-gray-500 transition-all p-2">
              <div className="h-16 w-full flex items-center justify-center">
                <img className="max-h-12 max-w-full group-hover:scale-110 transition-transform duration-200" src="https://cache1.pakwheels.com/system/car_manufacturers/manufacturers/000/000/030/resized/Nisan.png" alt="Nissan" />
              </div>
              <span className="text-xs font-semibold text-gray-700 capitalize">Nissan</span>
            </Link>

            <Link to="/make?make=Changan" className="group flex flex-col items-center justify-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[13%] h-28 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-gray-500 transition-all p-2">
              <div className="h-16 w-full flex items-center justify-center">
                <img className="max-h-12 max-w-full group-hover:scale-110 transition-transform duration-200" src="https://cache1.pakwheels.com/system/car_manufacturers/manufacturers/000/000/068/resized/4.png" alt="Changan" />
              </div>
              <span className="text-xs font-semibold text-gray-700 capitalize">Changan</span>
            </Link>

          </div>
        )}

        {/* 4. Budget Section */}
        {activeTab === "budget" && (
          <div className='flex flex-wrap gap-y-4 gap-x-2 py-4 text-gray-700 font-medium'>
            <Link to="/price?maxPrice=500000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Under 5 Lakh</Link>
            <Link to="/price?maxPrice=1000000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Under 10 Lakh</Link>
            <Link to="/price?maxPrice=2000000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Under 20 Lakh</Link>
            <Link to="/price?maxPrice=3000000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Under 30 Lakh</Link>
            <Link to="/price?maxPrice=5000000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Under 50 Lakh</Link>
            <Link to="/price?maxPrice=7000000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Under 70 Lakh</Link>
            <Link to="/price?maxPrice=10000000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Under 1 Crore</Link>
            <Link to="/price?minPrice=20000000" className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] hover:text-blue-600 transition-colors'>Cars Above 2 Crore</Link>
          </div>
        )}

      </section>
    </div>
  )
}

export default UsedCars