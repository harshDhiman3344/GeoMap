import { useState, useEffect } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import "./App.css";

function App() {
  const [journals, setJournals] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);

  const fetchJournals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/journals`);
      setJournals(res.data);
    } catch (err) {
      console.error("Error fetching journals:", err);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const clockEl = document.getElementById("clock");
      const dateEl = document.getElementById("date");
      if (clockEl)
        clockEl.textContent = now.toLocaleDateString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      if (dateEl)
        dateEl.textContent = now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedLocation(null);
    fetchJournals();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedLocation(null);
  };

  return (
    <div className="app">
      <div className="title">
        <span>GeoJournal</span>
        <button className="list-toggle" onClick={() => setShowList(!showList)}>
          {showList ? "Map" : "Entries"}
        </button>
      </div>
      <div className="main">
        <div className="sidebar">
          <div className="sidebar-clock" id="clock"></div>
          <div className="sidebar-date" id="date"></div>
          <div className="sidebar-entries">
            <span className="entry-count">{journals.length}</span>
            <span className="entry-label">entries</span>
            
          </div>
          <div className="sidebar-cat">
  <div className="cat"></div>
</div>
        </div>
        <div className="container">
        {showList ? (
          <JournalList journals={journals} onDelete={fetchJournals} />
        ) : (
          <MapView journals={journals} onMapClick={handleMapClick} />
        )}
        {showForm && (
          <JournalForm
            location={selectedLocation}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
          />
        )}
      </div>
      </div>
    </div>
  );
}

export default App;