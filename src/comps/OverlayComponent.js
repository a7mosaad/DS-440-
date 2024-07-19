import { useEffect } from 'react';
import {  useMap } from 'react-leaflet';
import { useGeoData } from './GeoDataContext';
import L from 'leaflet';

const OverlayComponent = () => {
  const { geojsonData } = useGeoData();
  const map = useMap();

  useEffect(() => {
    if (geojsonData) {
      const geoJsonLayer = L.geoJson(geojsonData, {
        style: {
          color: 'red',
          weight: 2,
          opacity: 0.6,
          fillColor: 'red',
          fillOpacity: 0.2,
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.site) {
            layer.bindPopup(feature.properties.site);
          }
        },
      });

      map.fitBounds(geoJsonLayer.getBounds());

      // Clear existing layers and add the new one
      map.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer);
        }
      });

      geoJsonLayer.addTo(map);
    }
  }, [geojsonData, map]);
  return null;
};

export default OverlayComponent;
