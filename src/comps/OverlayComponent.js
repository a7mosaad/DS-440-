import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useGeoData } from './GeoDataContext';
import L from 'leaflet';
import { colorMapping, eventMapping, highPriorityEvents, mediumPriorityEvents, lowPriorityEvents } from './Mapping';

const OverlayComponent = () => {
  const { geojsonData } = useGeoData();
  const map = useMap();

  useEffect(() => {
    if (geojsonData) {
      // Define custom panes for different severity levels
      map.createPane('highSeverityPane'); // High-priority events (e.g., Warnings)
      map.getPane('highSeverityPane').style.zIndex = 700;

      map.createPane('mediumSeverityPane'); // Medium-priority events (e.g., Watches)
      map.getPane('mediumSeverityPane').style.zIndex = 600;

      map.createPane('lowSeverityPane'); // Low-priority events (e.g., Advisories)
      map.getPane('lowSeverityPane').style.zIndex = 500;

      map.createPane('unknown'); // unknown events (ones without codes)
      map.getPane('unknown').style.zIndex = 400;

      // Set a higher z-index for popups to ensure they appear in front of polygons
      map.getPane('popupPane').style.zIndex = 1000;

      const geoJsonLayer = L.geoJson(geojsonData, {
        style: (feature) => {
          const phensig = feature.properties.phensig;
          const color = colorMapping[phensig] || 'white'; // Default color if phensig not found
          
          // Determine which pane to assign the layer based on event severity
          let paneName;
          if (highPriorityEvents.includes(phensig)) {
            paneName = 'highSeverityPane'; // High-priority events
          } else if (mediumPriorityEvents.includes(phensig)) {
            paneName = 'mediumSeverityPane'; // Medium-priority events
          } else if (lowPriorityEvents.includes(phensig)) {
            paneName = 'lowSeverityPane'; // Low-priority events
          } else {
            paneName = 'unknown'; // Unknown or uncategorized events
          }

          return {
            pane: paneName,  // Assign to the appropriate pane
            color: color,
            weight: 2,
            opacity: 0.6,
            fillColor: color,
            fillOpacity: 0.2,
          };
        },
        onEachFeature: (feature, layer) => {
          const phensig = feature.properties.phensig;

          if (phensig && phensig !== 'Unknown') {
            layer.on('click', () => {
              const overlappingEvents = new Set(); // Use a Set to store unique events

              // Loop through all layers and check for overlapping polygons
              map.eachLayer((otherLayer) => {
                if (otherLayer !== layer && otherLayer.getBounds && layer.getBounds().intersects(otherLayer.getBounds())) {
                  const otherFeature = otherLayer.feature;
                  if (otherFeature && otherFeature.properties.phensig) {
                    overlappingEvents.add(
                      `Event: ${eventMapping[otherFeature.properties.phensig] || 'Unknown Event'}`
                    );
                  }
                }
              });

              // Add the current feature event to the popup
              overlappingEvents.add(`Event: ${eventMapping[feature.properties.phensig] || 'Unknown Event'}`);

              // Convert the Set to an Array and join it to create popup content
              const popupContent = Array.from(overlappingEvents).join('<br>');

              // Bind a popup with all unique overlapping events and ensure it's on top
              layer.bindPopup(popupContent, { autoPan: true }).openPopup();
            });
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
