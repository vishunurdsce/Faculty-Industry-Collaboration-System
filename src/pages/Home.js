const { useState, useEffect } = React;

function Home({ searchTerm, onSearch, onClear, isLoading, filteredFaculty, filteredIndustry }) {
  // Form input states
  const [fName, setFName] = useState("");
  const [fDept, setFDept] = useState("");
  const [fExp, setFExp] = useState("");
  const [iName, setIName] = useState("");
  const [iNeeds, setINeeds] = useState("");
  const [iContact, setIContact] = useState("");

  // --- Functions to add faculty or industry ---
  async function addFaculty() {
    if (!fName || !fDept || !fExp) return alert("Please fill all faculty fields.");
    try {
      await fetch("/api/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fName, department: fDept, expertise: fExp })
      });
      alert("✅ Faculty added successfully!");
      setFName(""); setFDept(""); setFExp("");
    } catch (e) {
      alert("⚠️ Error adding faculty");
    }
  }

  async function addIndustry() {
    if (!iName || !iNeeds || !iContact) return alert("Please fill all industry fields.");
    try {
      await fetch("/api/industry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: iName, needs: iNeeds, contact: iContact })
      });
      alert("✅ Industry added successfully!");
      setIName(""); setINeeds(""); setIContact("");
    } catch (e) {
      alert("⚠️ Error adding industry");
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>AI-driven Faculty-Industry Collaboration</h1>
        <p>Intelligent Recommendation System</p>
      </div>

      {/* Filter/Search bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearch={onSearch}
        onClear={onClear}
        isLoading={isLoading}
      />

      {/* Loading state */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>🔍 Searching for matches...</p>
        </div>
      ) : (
        <>
          {searchTerm && (
            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "20px"
              }}
            >
              <strong>
                Found {filteredFaculty.length} faculty and {filteredIndustry.length} industry partners matching "{searchTerm}"
              </strong>
            </div>
          )}

          {/* Faculty + Industry lists */}
          <div className="dashboard">
            <div className="section">
              <h2>👨‍🏫 Faculty Experts</h2>
              <div className="faculty-list">
                {filteredFaculty.length > 0 ? (
                  filteredFaculty.map((faculty) => (
                    <FacultyCard key={faculty._id || faculty.id} faculty={faculty} />
                  ))
                ) : (
                  <p>No faculty found.</p>
                )}
              </div>
            </div>

            <div className="section">
              <h2>🏢 Industry Partners</h2>
              <div className="industry-list">
                {filteredIndustry.length > 0 ? (
                  filteredIndustry.map((industry) => (
                    <IndustryCard key={industry._id || industry.id} industry={industry} />
                  ))
                ) : (
                  <p>No industry partners found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Add new entries */}
          <div className="section" style={{ marginTop: "30px" }}>
            <h3>Add New Faculty / Industry</h3>

            {/* Faculty form */}
            <details open>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>➕ Add Faculty</summary>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <input
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  value={fDept}
                  onChange={(e) => setFDept(e.target.value)}
                  placeholder="Department"
                />
                <input
                  value={fExp}
                  onChange={(e) => setFExp(e.target.value)}
                  placeholder="Expertise"
                />
                <button onClick={addFaculty}>Add Faculty</button>
              </div>
            </details>

            {/* Industry form */}
            <details style={{ marginTop: "15px" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>🏭 Add Industry</summary>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <input
                  value={iName}
                  onChange={(e) => setIName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  value={iNeeds}
                  onChange={(e) => setINeeds(e.target.value)}
                  placeholder="Needs"
                />
                <input
                  value={iContact}
                  onChange={(e) => setIContact(e.target.value)}
                  placeholder="Contact"
                />
                <button onClick={addIndustry}>Add Industry</button>
              </div>
            </details>
          </div>
        </>
      )}
    </div>
  );
}
