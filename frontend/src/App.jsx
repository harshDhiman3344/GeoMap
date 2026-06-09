import { useState, useEffect } from "react";
import axios from "axios";
import {
  SignedIn,
  SignedOut,
  SignIn,
  useUser,
  UserButton,
} from "@clerk/clerk-react";
import MapView from "./components/MapView";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import UsernameSetup from "./components/UsernameSetup";
import "./App.css";

function App() {
  const { user, isLoaded } = useUser();
  const [username, setUsername] = useState("");
  const [usernameSet, setUsernameSet] = useState(false);
  const [journals, setJournals] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [guestMode, setGuestMode] = useState(false);

  const getHeadersWithUsername = () => {
    return {
      "x-user-id": user?.id || "",
      "x-username": user?.username || "",
    };
  };

  const quotes = [
    "anthony bourdain",
    "life is either a daring adventure or nothing at all.",
    "depression cannot hit a target in motion",
    "go where you feel the most alive",
    "The journey itself is my home",
    "collect momments, not things",
    "I love the mountains #mountainGng4life",
    "Travel isn't always pretty... The journey changes you; it should change you.",
    "Fake it till you make it",
  ];

  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)],
  );
  // Load username from localStorage
  useEffect(() => {
    if (user?.id) {
      const storedUsername = localStorage.getItem(
        `geojournal_username_${user.id}`,
      );
      if (storedUsername) {
        setUsername(storedUsername);
        setUsernameSet(true);
      } else {
        setUsernameSet(false);
      }
    }
  }, [user?.id]);

  const handleUsernameSet = (newUsername) => {
    setUsername(newUsername);
    setUsernameSet(true);
  };

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
    <>
      <SignedIn>
        {!usernameSet ? (
          <UsernameSetup userId={user?.id} onUsernameSet={handleUsernameSet} />
        ) : (
          <div className="app">
            <div className="title">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <UserButton />
                <span>GeoJournal</span>
              </div>
              <button
                className="list-toggle"
                onClick={() => setShowList(!showList)}
              >
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
                <div className="sidebar-quote">"{quote}"</div>
                <div className="sidebar-cat">
                  <div className="cat"></div>
                </div>
              </div>
              <div className="container">
                {showList ? (
                  <JournalList
                    journals={journals}
                    onDelete={fetchJournals}
                    userId={user?.id}
                  />
                ) : (
                  <MapView journals={journals} onMapClick={handleMapClick} />
                )}
                {showForm && (
                  <JournalForm
                    location={selectedLocation}
                    onSubmit={handleFormSubmit}
                    onClose={handleFormClose}
                    userId={user?.id}
                    username={username}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        {guestMode ? (
          <div className="app">
            <div className="title">
              <span>🌍 GeoJournal</span>
              <button
                className="list-toggle"
                onClick={() => setGuestMode(false)}
              >
                Sign In
              </button>
            </div>
            <div className="main">
              <div className="sidebar">{/* your sidebar content */}</div>
              <div className="container">
                <MapView
                  journals={journals}
                  onMapClick={() => setGuestMode(false)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-screen">
            <h1>🌍 GeoJournal</h1>
            <p>your world, your words.</p>
            <SignIn />
            <button className="guest-btn" onClick={() => setGuestMode(true)}>
              just browsing →
            </button>
          </div>
        )}
      </SignedOut>
    </>
  );
}

export default App;
