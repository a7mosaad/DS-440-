import React, { useContext } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { GeoDataContext } from '../GeoDataContext';

const OverlayComponent = () => {
  const { geojsonData } = useContext(GeoDataContext);
  const map = useMap();

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.site) {
      layer.bindPopup(feature.properties.site);
    }
  };

  const geojsonStyle = {
    color: 'red',
    weight: 2,
    opacity: 0.6,
    fillColor: 'red',
    fillOpacity: 0.2
  };

  console.log('OverlayComponent received GeoJSON data:', geojsonData); // Debug log

  if (geojsonData) {
    // Fit the map bounds to the GeoJSON layer bounds
    const geoJsonLayer = L.geoJson(geojsonData);
    map.fitBounds(geoJsonLayer.getBounds());
  }

  return geojsonData ? (
    <GeoJSON data={geojsonData} style={geojsonStyle} onEachFeature={onEachFeature} />
  ) : null;
};

export default OverlayComponent;
