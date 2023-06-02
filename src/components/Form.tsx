import React from "react";
import { useNavigate } from "react-router-dom";
import { Sighting } from "../types";

interface FormProps {
  onSubmit: (sighting: Sighting) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [location, setLocation] = React.useState("");
  const [dateTime, setDateTime] = React.useState("");
  const [encounterType, setEncounterType] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [locationError, setLocationError] = React.useState("");
  const [dateTimeError, setDateTimeError] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Perform form validation
    let isValid = true;

    if (!location) {
      setLocationError("Please enter the location");
      isValid = false;
    } else if (location.indexOf(",") == -1) {
      setLocationError(
        "Please put latitute ans longitude with comma seperated (e.g 23.44556, 45.3423453)"
      );

      isValid = false;
    } else {
      setLocationError("");
    }

    if (!dateTime) {
      setDateTimeError("Please select the date and time");
      isValid = false;
    } else {
      setDateTimeError("");
    }

    const sighting: Sighting = {
      id: Date.now(),
      location,
      dateTime,
      encounterType,
      description,
    };

    console.log(isValid);

    if (!isValid) {
      return;
    } else {
      onSubmit(sighting);
      setLocation("");
      setDateTime("");
      setEncounterType("");
      setDescription("");
      navigate("/form");
    }
  };

  return (
    <div className="container">
      <h1>Form Example</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Location
            <span className="required">*</span>
          </label>
          <input
            type="text"
            value={location}
            className="form-control my-input"
            onChange={(e) => setLocation(e.target.value)}
          />
          {locationError && (
            <span className="text-danger">{locationError}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Date & Time
            <span className="required">*</span>
          </label>
          <input
            type="datetime-local"
            className="form-control my-input"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          {dateTimeError && (
            <span className="text-danger">{dateTimeError}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="messageTextarea" className="form-label">
            EncounterType
          </label>
          <input
            type="text"
            className="form-control my-input"
            value={encounterType}
            onChange={(e) => setEncounterType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="messageTextarea" className="form-label">
            Description
          </label>
          <textarea
            value={description}
            className="form-control my-input"
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export { Form };
