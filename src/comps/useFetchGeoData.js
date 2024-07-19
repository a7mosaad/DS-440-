import { useEffect } from 'react';
import { useGeoData } from './GeoDataContext';

const useFetchGeoData = () => {
  const { setGeojsonData } = useGeoData();

  useEffect(() => {
    fetch('C:/Users/640116/Documents/skedge/warnings_24_to_12_hours_ago.geojson')
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
};

export default useFetchGeoData;
