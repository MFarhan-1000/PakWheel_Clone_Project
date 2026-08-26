import React from 'react'

// Imort URl
const API_URL = import.meta.env.VITE_API_URL;

// For user and admin
import ListingGrid from "../Component/ListingGrid"
import AdminAndOwner from "../Component/AdminAndOwner"
import { Routes,Route } from 'react-router-dom'


function NavBarRoutes() {
  return (
    <>

<Routes>
        {/* Get My Listings */}

        <Route path='/mylisting' element={<AdminAndOwner title='My Details' endpoint={`${API_URL}/car/mylistings`}/>}></Route>        
        
        {/* Route to get Used Cars */}
                <Route path='/usedcars' element={<ListingGrid  title="Popular Used Cars" endpoint={`${API_URL}/car/getcar?catagory=Used`} />} ></Route>
        
        {/*Route to get new cars  */}
                <Route path='/newcars' element={<ListingGrid title='Popular New Cars' endpoint={`${API_URL}/car/getcar?catagory=New`}/>}></Route>
        
        {/* Route to get Bikes */}
                <Route path='/bike' element={<ListingGrid title='Popular Bikes' endpoint={`${API_URL}/car/getcar?vehicalType=bike`}/>}></Route>
        
        {/* Route to get More All Cars */}
                <Route path='/more' element={<ListingGrid title='All Cars And Bikes' endpoint={`${API_URL}/car/getcar`}/>}></Route>

   
</Routes>      
    </>
  )
}

export default NavBarRoutes