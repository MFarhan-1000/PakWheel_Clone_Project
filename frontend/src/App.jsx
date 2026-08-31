import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// URL Import
const API_URL = import.meta.env.VITE_API_URL

// Important things 
import Home from './Component/Home'

import SellCarSection from './Pages/SellCarSection/SellCarSection'
import SellBike from './Pages/SellBikeSection/SellBike'

import PostAd from './Pages/SellCarSection/SellCarSection'

// Searchbar imports here
import SearchBar from './Pages/SearchPage/SearchPages'
import PriceUsedCars from './Pages/SearchUsed/PriceUsedCars'
import UsedCarMake from './Pages/SearchUsed/UsedCarMake'
import UsedCarcity from "./Pages/SearchUsed/UsedCarCity"
import Oldcars from "./Component/ListingGrid"

// Routes'
import NavBarRoutes from "./Routes/NavBarRoutes"

// Pakoffers
import CarTransfer from './Pages/PakOffers/CarTransfer'
import CarServices from './Pages/PakOffers/CarServices'
import CarsInspection from "./Pages/PakOffers/CarsInspection"
import Carinsurance from './Pages/PakOffers/Carsinsurance'
import CarAution from "./Pages/PakOffers/CarAution"

// popular cars
import DetailPassingToChild from "./Pages/NewCars/PopularCars/DetailPassingToChild"
import DetailsPassing from './Pages/NewCars/UpCommingCars/DetailsPassing'

// Admin section
import Admin from "./Component/Admin"

// Edit cars
import AuthEditCars from './Component/AuthEditCars'


function App() {
  return (
    <div>
      <BrowserRouter>

       <Routes>
        
        <Route path='/' element={<Home/>}></Route>

{/* admin Path */}
        <Route path='/admin' element={<Admin/>}></Route>        

{/* Sell bike and cars */}
        <Route path="/car/create" element={<SellCarSection/>}> </Route>
        <Route path='/bike/create' element={<SellBike/>}></Route>

{/* Auth editing cars */}
        <Route path='/car/edit/:id' element={<AuthEditCars/>}></Route>

{/* Search here (filter) */}
        <Route path="/search" element={<SearchBar />} />

{/* Used Cars routes here */}
        <Route path='/price' element={<PriceUsedCars/>}></Route>

        <Route path='/make' element={<UsedCarMake/>}></Route>

        <Route path='/city' element={<UsedCarcity/>}></Route>

        <Route path='/oldcars' 
                element={<Oldcars 
                title='Old Cars' 
                endpoint={`${API_URL}/car/getcar?catagory=used`} />}></Route>

{/* Search bar  Endhere*/}

{/* Post and or sell Cars here */}
{/* to Post an ad */}
        <Route path='/postad' element={<PostAd/>}></Route>

{/* to sell car */}
        <Route path='/sellcar' element={<SellCarSection/>}></Route>

{/*Pak Offers start here  */}
        <Route path='/pakoffers/sellcar' element={<SellCarSection/>}></Route>

        <Route path='/pakoffers/cartransfer' element={<CarTransfer/>}></Route>

        <Route path='/pakoffers/carservice' element={<CarServices/>}></Route>

        <Route path='/pakoffers/carinspection' element={<CarsInspection/>}></Route>

        <Route path='/pakoffers/insurance' element={<Carinsurance/>}></Route>

        <Route path='/pakoffers/carsaution' element={<CarAution/>}></Route>

{/*Pak Offers Ends Here  */}

{/* Popular cars and Upcomming cars */}

        <Route path="/newcars/:id" element={<DetailPassingToChild/>}></Route>

        <Route path='/newcars/upcomming/:id' element={<DetailsPassing/>}></Route>

{/* Popular Cars Ends here */}
       
       </Routes>

        <NavBarRoutes/>       
      
      </BrowserRouter>
    </div>
  )
}

export default App 