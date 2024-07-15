import React, { createContext, useState } from 'react';

export const GeoDataContext = createContext();

export const GeoDataProvider = ({ children }) => {
  const [geojsonData, setGeojsonData] = useState(null);

  return (
    <GeoDataContext.Provider value={{ geojsonData, setGeojsonData }}>
      {children}
    </GeoDataContext.Provider>
  );
};
