import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useGeoData } from './GeoDataContext';
import L from 'leaflet';
import { colorMapping, eventMapping } from './Mapping';


const OverlayComponent = () => {
  const { geojsonData } = useGeoData();
  const map = useMap();

  useEffect(() => {
    if (geojsonData) {
      const geoJsonLayer = L.geoJson(geojsonData, {
        style: (feature) => {
          const phensig = feature.properties.phensig;
          const color = colorMapping[phensig] || 'gray'; // Default color if phensig not found
          return {
            color: color,
            weight: 2,
            opacity: 0.6,
            fillColor: color,
            fillOpacity: 0.2,
          };
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties.phensig && feature.properties) {
            layer.bindPopup(`Event: ${eventMapping[feature.properties.phensig]}`);
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
