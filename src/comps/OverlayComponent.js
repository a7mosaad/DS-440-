import React, { useContext } from 'react';
import { GeoJSON } from 'react-leaflet';
import { GeoDataContext } from '../GeoDataContext';

const OverlayComponent = () => {
  const { geojsonData } = useContext(GeoDataContext);

  const geojsonStyle = {
    color: 'red',
    weight: 2,
    opacity: 0.6
  };

  return <GeoJSON data={geojsonData} style={geojsonStyle} />;
};

export default OverlayComponent;
