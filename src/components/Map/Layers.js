import React from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

function Layers() {
  return (
    <LayerGroup>
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </LayerGroup>
  );
}

export default Layers;
