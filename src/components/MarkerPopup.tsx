import React from "react";
import { Popup } from "react-leaflet";

interface Sighting {
  id: number;
  location: string;
  dateTime: string;
  encounterType: string;
  description: string;
}

interface Props {
  sighting: Sighting;
  style: object;
}

const MarkerPopup: React.FC<Props> = ({ sighting, style }) => {
  return (
    <Popup>
      <div style={style}>
        <h4>Location :{sighting.location}</h4>

        <h4>Date and Time :{sighting.dateTime}</h4>

        <h4>Encounter Type :{sighting.encounterType} </h4>

        <h4>Description :{sighting.description}</h4>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
