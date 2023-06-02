import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Sighting } from "../types";
import markerIcon from "../images/marker.png";
import MarkerPopup from "./MarkerPopup";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

interface MapProps {
  sightings: Sighting[];
}

const Map: React.FC<MapProps> = ({ sightings }) => {
  const defaultPosition: LatLngExpression = [0, 0];

  const parseLocation = (location: string): LatLngExpression => {
    const [lat, lon] = location
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    return [lat, lon];
  };

  return (
    <>
      <MapContainer
        center={defaultPosition}
        zoom={2}
        style={{ height: "600px", width: "90%", margin: "100px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {sightings.map((sighting) => (
          <Marker
            key={sighting.id}
            position={parseLocation(sighting.location)}
            icon={L.icon({
              iconUrl: markerIcon,
              iconSize: [30, 30], // Adjust the size according to your image
            })}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
            }}
          >
            <MarkerPopup
              style={{
                background: "darkslategrey",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "-200px",
              }}
              sighting={sighting}
            />
          </Marker>
        ))}
      </MapContainer>
      <div>
        <Link to="/form"> Form Page </Link>
      </div>
    </>
  );
};

export { Map };
