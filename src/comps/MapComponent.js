import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import OverlayComponent from './OverlayComponent';
import useFetchGeoData from './useFetchGeoData';

// Define the geographical bounds of the USA
const usaBounds = [
  [14.22, -60.50], // Puerto Rico
  [71, -156] // Alaska 
];

const MapComponent = () => {
  // Custom hook to fetch GeoJSON data
  useFetchGeoData();

  return (
    
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={5}
      minZoom={4} // Set the minimum zoom level to restrict zooming out
      maxZoom={9} // Optional: Set the maximum zoom level if needed
      style={{ height: '100vh', width: '100%' }}
      maxBounds={usaBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <OverlayComponent />
    </MapContainer>
  );
};

export default MapComponent;



