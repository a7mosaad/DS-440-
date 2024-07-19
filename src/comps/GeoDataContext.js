import React, { createContext, useState, useEffect, useContext } from 'react';

const GeoDataContext = createContext();

export const useGeoData = () => {
  return useContext(GeoDataContext);
};

export const GeoDataProvider = ({ children }) => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    fetch('/warnings.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('GeoJSON data:', data);
        setGeojsonData(data);
      })
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []);

  return (
    <GeoDataContext.Provider value={{ geojsonData, setGeojsonData }}>
      {children}
    </GeoDataContext.Provider>
  );
};
