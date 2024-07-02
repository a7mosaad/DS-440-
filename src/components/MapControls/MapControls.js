import React from 'react';
import { useMap } from 'react-leaflet';

function MapControls() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="map-controls">
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
    </div>
  );
}

export default MapControls;
