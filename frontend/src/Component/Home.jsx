import React from 'react'
import Selloptions from '../Pages/SellOptions/SellOptions'
import UsedCars from '../Pages/UsedCars/UsedCars'
import PakOffers from '../Pages/PakOffers/PakOffers'
import NewCars from '../Pages/NewCars/NewCars'
import NavBar from './NavBar'
import Footer from './Footer'




function Home() {
  return (
    <>
    <NavBar />
        <Selloptions />
        <UsedCars/>
        <PakOffers />
        <NewCars/>

    <Footer />
        
    </>
  )
}

export default Home