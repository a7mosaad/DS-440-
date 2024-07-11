import React from 'react';
import './App.css';
import MapContainer from './components/Map/MapContainer';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Map App</h1>
      </header>
      <main>
        <MapContainer />
      </main>
    </div>
  );
}

export default App;
