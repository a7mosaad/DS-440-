import './App.css';
import { GeoDataProvider } from './comps/GeoDataContext';
import MapComponent from './comps/MapComponent';

const App = () => {
  return (
    <GeoDataProvider>
      <MapComponent />
    </GeoDataProvider>
  );
}

export default App;
