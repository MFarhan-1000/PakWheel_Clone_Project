import React from 'react';
import { useParams } from 'react-router-dom';
import { popularCars } from './PopularCarsData';
import SingleCar from "./SingleCar"


const DetailPassingToChild = () => {
    const {id} = useParams();

    const selectedcar = popularCars.find((car) => car.car === Number(id));

    if(!selectedcar){
      return (
      <div> 
        <p className='text-center py-12 text-gray-600 font-bold'>
          NO Cars Found
        </p>
      </div>)
    }

  return (
    <div>
      <SingleCar carData={selectedcar}/>
    </div>
  );
};

export default DetailPassingToChild;