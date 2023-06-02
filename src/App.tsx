import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Form } from "./components/Form";
import { Map } from "./components/Map";
import { Sighting } from "./types";

const App: React.FC = () => {
  const [sightings, setSightings] = React.useState<Sighting[]>([]);

  const addSighting = (sighting: Sighting) => {
    setSightings((prevSightings) => [...prevSightings, sighting]);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Map sightings={sightings} />} />
          <Route path="/form" element={<Form onSubmit={addSighting} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
