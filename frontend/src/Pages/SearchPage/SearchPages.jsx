import React from 'react';
import { useLocation } from 'react-router-dom';
import ListingGrid from '../../Component/ListingGrid';


export default function SearchResults() {
  const location = useLocation();
  
  const endpoint = `http://localhost:3000/car/getcar${location.search}`;

  return (
    <div>
      <ListingGrid title="Search Results" endpoint={endpoint} />
    </div>
  );
}