import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Layers from './Layers';
import MapControls from '../MapControls/MapControls';

function MapContainer() {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <LeafletMap center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Layers />
        <MapControls />
      </LeafletMap>
    </div>
  );
}

export default MapContainer;
