import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoDataContext } from '../GeoDataContext';
import OverlayComponent from './OverlayComponent';

// Define the geographical bounds of the USA
const usaBounds = [
  [24.396308, -125.0], // Southwest corner
  [49.384358, -66.93457] // Northeast corner
];

const MapComponent = () => {
  const { geojsonData } = useContext(GeoDataContext);

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={5}
      minZoom={5} // Set the minimum zoom level to restrict zooming out
      maxZoom={8} // Optional: Set the maximum zoom level if needed
      style={{ height: '100vh', width: '100%' }}
      maxBounds={usaBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {geojsonData && <OverlayComponent />}
    </MapContainer>
  );
};

export default MapComponent;
