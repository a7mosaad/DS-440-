import './App.css';
import { GeoDataProvider } from './GeoDataContext';
import MapComponent from './comps/MapComponent';
import DataFetcher from './comps/DataFetcher';

const App = () => {
  return (
    <GeoDataProvider>
      <DataFetcher />
      <MapComponent />
    </GeoDataProvider>
  );
}

export default App;
