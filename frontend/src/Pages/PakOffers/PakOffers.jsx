import React from 'react'
import { Link } from 'react-router-dom'

function PakOffers() {
  return (
    <div>

        <div className='max-w-6xl m-auto text-2xl font-medium mb-10 px-4'>
            <h2>Pakwheels Offerings</h2>
        </div>

{/* Main Section Start here */}
<section className='h-auto max-w-5xl m-auto mb-10'>
    <div className='flex flex-wrap '>
            
            {/* First */}
            
                <Link to={"/pakoffers/sellcar"} className='group flex w-full m-4 sm:flex-[40%]  border border-gray-400 rounded-sm p-6 mb-4'>
                <img className='h-20 w-30 pr-4' src="/src/assets/download.jpg" alt="Sell pics" />
                <div>
                    <h3 className='text-blue-900 group-hover:text-blue-700 font-semibold'>PakWheels </h3>
                    <h4 className='text-gray-500 font-semibold'>SELL IT FOR ME</h4>
                </div>
                </Link>
            

            {/* Second  Offer*/}
                <Link to={"/pakoffers/carsaution"} className='group mb-4 flex w-full m-4 sm:flex-[40%] border border-gray-400 rounded-sm p-6 lg:ml-4'>
                <img className='h-20 w-30 pr-4' src="/src/assets/download (7).jpg" alt="" />
                <div>
                    <h3 className='text-blue-900 group-hover:text-blue-700  font-semibold'>PakWheels </h3>
                    <h4 className='text-gray-500 font-semibold'>AUCTION SHEET VERIFICATION</h4>
                </div>
                </Link>

            {/*Third  Offer  */}
                <Link to={"/pakoffers/carinspection"} className='group mb-4 flex w-full m-4 sm:flex-[40%] border border-gray-400 rounded-sm p-6 '>
                <img className='h-20 w-30 pr-4' src="/src/assets/download (6).jpg" alt="" />
                <div>
                    <h3 className='text-blue-900 group-hover:text-blue-700  font-semibold'>PakWheels </h3>
                    <h4 className='text-gray-500 font-semibold'>CAR INSPECTION</h4>
                </div>
                </Link>

            {/* Fourth offer */}
                <Link to={"/pakoffers/carservice"} className='group mb-4 flex w-full m-4 sm:flex-[40%] border border-gray-400 rounded-sm p-6 ml-4'>
                <img className='h-20 w-30 pr-4' src="/src/assets/download (2).jpg" alt="" />
                <div>
                    <h3 className='text-blue-900  group-hover:text-blue-700 font-semibold'>PakWheels </h3>
                    <h4 className='text-gray-500 font-semibold'>SERVICE CENTER</h4>
                </div>
                </Link>

            {/* Fifth Offer*/}
                <Link to={"/pakoffers/insurance"} className='group mb-4 flex w-full m-4 sm:flex-[40%] border border-gray-400 rounded-sm p-6 '>
                <img className='h-20 w-30 pr-4' src="/src/assets/download (3).jpg" alt="" />
                <div>
                    <h3 className='text-blue-900  group-hover:text-blue-700 font-semibold'>PakWheels </h3>
                    <h4 className='text-gray-500 font-semibold'>CAR INSURANCE</h4>
                </div>
                </Link>

            {/* Sixth Offer */}
                <Link to={"/pakoffers/cartransfer"} className='group mb-4 flex w-full m-4 sm:flex-[40%] border border-gray-400 rounded-sm p-6 ml-4'>
                <img className='h-20 w-30 pr-4' src="/src/assets/download (4).jpg" alt="" />
                <div>
                    <h3 className='text-blue-900  group-hover:text-blue-700 font-semibold'>PakWheels </h3>
                    <h4 className='text-gray-500 font-semibold'>OWNERSHIP TRANSFER</h4>
                </div>
                </Link>


            {/* All Offers End here */}

    </div>
</section>
        
    </div>
  )
}

export default PakOffers