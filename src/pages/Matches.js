const { useState, useEffect } = React;

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchMatches() {
    try {
      const res = await fetch("/api/matches");
      const json = await res.json();
      setMatches(json);
    } catch (e) {
      console.error("Error loading matches:", e);
      setMessage("⚠️ Could not load matches.");
    }
  }

  async function generateMatches() {
    setLoading(true);
    setMessage("Generating matches...");
    try {
      const res = await fetch("/api/matches/generate");
      const json = await res.json();
      setMessage(`✅ ${json.message}`);
      await fetchMatches();
    } catch (e) {
      setMessage("⚠️ Error generating matches.");
    } finally {
      setLoading(false);
    }
  }

  async function clearMatches() {
    setLoading(true);
    setMessage("Clearing all matches...");
    try {
      const res = await fetch("/api/matches/clear", { method: "DELETE" });
      const json = await res.json();
      setMessage(`🗑️ ${json.message}`);
      await fetchMatches();
    } catch (e) {
      setMessage("⚠️ Error clearing matches.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="section">
      <h2>🤖 AI-Generated Matches</h2>

      {/* Buttons Row */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
        <button 
          onClick={generateMatches} 
          disabled={loading} 
          className="generate-btn"
        >
          {loading ? "Generating..." : "Generate Matches"}
        </button>

        <button 
          onClick={clearMatches} 
          disabled={loading} 
          style={{
            background: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 15px",
            cursor: "pointer"
          }}
        >
          🗑️ Clear Matches
        </button>
      </div>

      {message && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>
      )}

      {/* Matches Display */}
      <div className="matches-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "25px"
      }}>
        {matches.length > 0 ? (
          matches.map((m) => (
            <div key={m._id} style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              padding: "15px"
            }}>
              <h3>🎯 {m.faculty} + {m.industry}</h3>
              <p><b>Score:</b> {m.score}%</p>
              <p><b>Reason:</b> {m.reason}</p>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "20px" }}>No matches found.</p>
        )}
      </div>
    </div>
  );
}
