import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const Map = () => {
  const greeceBounds = [
    [33.5651, 19.6272], // SW corner
    [41.7489, 26.6042], // NE corner
  ];

  const RestrictBounds = () => {
    const map = useMap();
    map.setMaxBounds(greeceBounds);
    return null;
  };

  return (
    <MapContainer center={[37.9838, 23.7275]} zoom={7} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <RestrictBounds />
      <Marker position={[37.85, 23.75]}>
        <Popup>Παραλία Α - Ιδανική για κολύμπι</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
