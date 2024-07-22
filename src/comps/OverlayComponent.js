import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useGeoData } from './GeoDataContext';
import L from 'leaflet';

// Define color mapping for phensig codes
const colorMapping = {
  'TO.W': 'red',                   // Tornado Warning
  'TO.A': 'yellow',                // Tornado Watch
  'SV.W': 'orange',                // Severe Thunderstorm Warning
  'SV.A': 'yellow',                // Severe Thunderstorm Watch
  'FF.W': 'darkred',               // Flash Flood Warning
  'FF.A': '#ffa07a',               // Flash Flood Watch
  'FA.Y': 'green',                 // Flood Advisory
  'WS.W': 'purple',                // Winter Storm Warning
  'BZ.W': 'lightblue',             // Blizzard Warning
  'HW.W': 'pink',                  // High Wind Warning
  'HT.Y': 'darkorange',            // Heat Advisory
  'FR.W': 'blue',                  // Freeze Warning
  'FR.Y': 'lightblue',             // Frost Advisory
  'FL.W': '#00ff00',               // Flood Warning
  'FL.A': '#ffff00',               // Flood Watch
  'WI.Y': '#ff69b4',               // Wind Advisory
  'IS.W': '#b0e0e6',               // Ice Storm Warning
  'WC.W': '#add8e6',               // Wind Chill Warning
  'WC.Y': '#d3d3d3',               // Wind Chill Advisory
  'DS.W': '#f4a460',               // Dust Storm Warning
  'EH.W': '#ff0000',               // Excessive Heat Warning
  'EH.A': '#ff8c00',               // Excessive Heat Watch
  'AF.Y': '#ffb6c1',               // Air Stagnation Advisory
  'CF.W': '#4682b4',               // Coastal Flood Warning
  'CF.A': '#7fffd4',               // Coastal Flood Watch
  'CF.Y': '#00ffff',               // Coastal Flood Advisory
  'MA.W': '#d2691e',               // Marine Warning
  'SU.W': '#dc143c',               // High Surf Warning
  'SU.Y': '#00ced1',               // High Surf Advisory
  'TS.W': '#0000cd',               // Tsunami Warning
  'TS.A': '#1e90ff',               // Tsunami Watch
  'TS.Y': '#87cefa',               // Tsunami Advisory
  'SE.W': '#ffa500',               // Special Weather Statement
  'SM.W': '#8b0000',               // Small Craft Advisory
  'SR.W': '#00bfff',               // Storm Warning
  'TR.W': '#ff4500',               // Tropical Storm Warning
  'TR.A': '#ff6347',               // Tropical Storm Watch
  'HU.W': '#ff00ff',               // Hurricane Warning
  'HU.A': '#ff1493',               // Hurricane Watch
  'LE.W': '#ffa07a',               // Lake Effect Snow Warning
  'LE.A': '#ffd700',               // Lake Effect Snow Watch
  'LE.Y': '#ffdab9',               // Lake Effect Snow Advisory
  'GL.W': '#ff69b4',               // Gale Warning
  'GL.A': '#ffb6c1',               // Gale Watch
  'HZ.W': '#6a5acd',               // Hard Freeze Warning
  'HZ.A': '#7b68ee',               // Hard Freeze Watch
  'HZ.Y': '#e6e6fa',               // Hard Freeze Advisory
  'ZF.W': '#8b4513',               // Freezing Fog Warning
  'ZF.Y': '#cd853f',               // Freezing Fog Advisory
  'SS.W': '#f08080',               // Storm Surge Warning
  'SS.A': '#fa8072',               // Storm Surge Watch
  'FF.S': '#ff6347',               // Flash Flood Statement
  'FL.S': '#ff4500',               // Flood Statement
  'FG.Y': '#dda0dd',               // Dense Fog Advisory
  'LW.Y': '#8fbc8f',               // Lake Wind Advisory
  'HW.A': '#f0e68c',               // High Wind Watch
  'FR.A': '#b0c4de',               // Freeze Watch
  'EH.Y': '#ff7f50',               // Excessive Heat Advisory
  'SC.Y': '#3cb371',               // Special Marine Warning
  'WS.A': '#ba55d3',               // Winter Storm Watch
  'BZ.A': '#66cdaa',               // Blizzard Watch
  'WW.Y': '#5f9ea0',               // Winter Weather Advisory
  'HS.W': '#f4a460',               // Heavy Snow Warning
  'FA.A': '#32cd32',               // Flood Watch
  'WC.A': '#cd853f',               // Wind Chill Watch
  'WI.A': '#ffa07a',               // Wind Advisory
  'FW.W': '#ff4500',               // Red Flag Warning
  'FW.A': '#ff6347',               // Fire Weather Watch
  'FW.Y': '#ff8c00',               // Fire Weather Advisory

  
  // Add more mappings as needed
};


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
          if (feature.properties && feature.properties.site) {
            layer.bindPopup(`Site: ${feature.properties.site}<br>Phensig: ${feature.properties.phensig}`);
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
