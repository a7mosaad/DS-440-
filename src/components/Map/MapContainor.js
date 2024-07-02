import React from 'react';
import './MapControls.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Layers from './Layers
import MapControls from '../MapControls/MapControls';

function Map() {
  return (
    <div style={{ position: "relative" }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Layers />
      </MapContainer>
      <MapControls />
    </div>
  );
}

export default Map;
