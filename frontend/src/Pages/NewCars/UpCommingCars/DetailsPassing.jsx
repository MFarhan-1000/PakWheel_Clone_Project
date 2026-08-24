import React from 'react'
import { upCommingCars } from './UpcommingCarsData'
import { useParams } from 'react-router-dom'
import SingleCar from "./SingleCar"


export default function DetailsPassing() {

    const {id} = useParams();
    
    const upcommingcars = upCommingCars.find((car)=>car.car === Number(id))

    if(!upcommingcars){
        return (
            <div>
                <p>No Car Found</p>
            </div>
        )
    }

  return (
    <div>
        <SingleCar carData={upcommingcars}/>
    </div>
  )
}
