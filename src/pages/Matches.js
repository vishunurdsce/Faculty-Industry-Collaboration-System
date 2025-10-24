function Matches() {
    return (
        <div>
            <div className="header">
                <h1>AI Match Recommendations</h1>
                <p>Intelligent Faculty-Industry Pairing</p>
            </div>

            <div className="matches-section">
                <h2>🤖 AI-Generated Matches</h2>
                <p>Top recommended collaborations</p>
                
                <div className="match-card">
                    <h3>🎯 Dr. Smith + Tech Corp</h3>
                    <p><strong>Match Score:</strong> 92%</p>
                    <p><strong>Reason:</strong> AI Expertise meets AI Research needs</p>
                </div>
                
                <div className="match-card">
                    <h3>🎯 Dr. Johnson + Data Solutions</h3>
                    <p><strong>Match Score:</strong> 88%</p>
                    <p><strong>Reason:</strong> Data Science expertise meets Data Analysis needs</p>
                </div>
            </div>
        </div>
    );
}