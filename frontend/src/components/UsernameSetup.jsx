import { useState } from "react";

const UsernameSetup = ({ userId, onUsernameSet }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetUsername = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (username.length > 20) {
      setError("Username must be 20 characters or less");
      return;
    }

    setLoading(true);
    // Store username in localStorage
    localStorage.setItem(`geojournal_username_${userId}`, username);
    onUsernameSet(username);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: "#f5f0e8",
        border: "2px solid #1a2e1a",
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "4px 4px 0px #1a2e1a",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#1a2e1a", marginBottom: "20px" }}>
          Welcome to GeoJournal! 🗺️
        </h2>
        <p style={{ color: "#5a7a5a", marginBottom: "20px" }}>
          Choose a username to display on your entries
        </p>
        <form onSubmit={handleSetUsername}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #1a2e1a",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "'Space Mono', monospace",
              boxSizing: "border-box",
              marginBottom: "12px"
            }}
          />
          {error && (
            <p style={{ color: "#d95e5e", fontSize: "0.9rem", marginBottom: "12px" }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ff6b7a",
              color: "white",
              border: "2px solid #1a2e1a",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              fontFamily: "'Space Mono', monospace",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Setting..." : "Set Username"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameSetup;
