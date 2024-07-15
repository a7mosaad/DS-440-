import { useEffect, useContext } from 'react';
import { GeoDataContext } from '../GeoDataContext';

const DataFetcher = () => {
  const { setGeojsonData } = useContext(GeoDataContext);

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
  }, [setGeojsonData]);

  return null; // This component does not render anything
};

export default DataFetcher;
