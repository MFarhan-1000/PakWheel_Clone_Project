import React from 'react';
import { useLocation } from 'react-router-dom';
import ListingGrid from '../../Component/ListingGrid';

// API_URL
const API_URL = import.meta.env.VITE_API_URL;

export default function SearchResults() {
  const location = useLocation();
  
  const endpoint = `${API_URL}/car/getcar${location.search}`;

  return (
    <div>
      <ListingGrid title="Search Results" endpoint={endpoint} />
    </div>
  );
}