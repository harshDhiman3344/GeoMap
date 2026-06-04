import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L, { Map } from "leaflet";

const popupStyle = `
  .leaflet-popup-content-wrapper {
    background: #f5f0e8;
    border: 2px solid #1a2e1a;
    border-radius: 12px;
    box-shadow: 4px 4px 0px #1a2e1a;
    font-family: 'Space Mono', monospace;
    padding: 0;
  }
  .leaflet-popup-content {
    margin: 14px 16px;
    color: #1a2e1a;
  }
  .leaflet-popup-tip {
    background: #f5f0e8;
    border: 2px solid #1a2e1a;
  }
  .leaflet-popup-close-button {
    color: #1a2e1a !important;
    font-size: 1.1rem !important;
  }
`;

const PopupStyles = () => <style>{popupStyle}</style>;

//Fix default marker icon bug
const customIcon = L.divIcon({
  className: "",
  html: `<div style="
    font-size: 24px;
    filter: drop-shadow(2px 2px 0px #1a2e1a);
    line-height: 1;
  ">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const MapView = ({ journals = [], onMapClick }) => {
  return (<>
  <PopupStyles/>
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <ClickHandler onMapClick={onMapClick} />
      {journals.map((journal) => (
        <Marker
          key={journal._id}
          icon={customIcon}
          position={[
            journal.location.coordinates[1],
            journal.location.coordinates[0],
          ]}
        >
          {" "}
          <Popup>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#1a2e1a",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              👤 {journal.username}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#5a7a5a",
                marginBottom: "6px",
              }}
            >
              📅 {new Date(journal.date).toLocaleDateString()}
            </div>
            <div style={{ fontSize: "0.88rem", lineHeight: "1.6" }}>
              {journal.text}
            </div>
            <div
              style={{ fontSize: "0.7rem", color: "#5a7a5a", marginTop: "6px" }}
            >
              📍 {journal.location.coordinates[1].toFixed(4)},{" "}
              {journal.location.coordinates[0].toFixed(4)}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );
};

export default MapView;
