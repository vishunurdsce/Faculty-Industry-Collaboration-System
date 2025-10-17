function AIMatches({ suggestions, searchTerm }) {
    return (
        <div className="matches-section">
            <h2>🤖 AI Recommendations</h2>
            <p>Based on your search{suggestions.length > 0 && ` for "${searchTerm}"`}</p>
            {suggestions.map(suggestion => (
                <div key={suggestion.id} className="match-card">
                    <h3>🎯 {suggestion.faculty} + {suggestion.industry}</h3>
                    <p><strong>Match Score:</strong> {suggestion.score}%</p>
                    <p><strong>Reason:</strong> {suggestion.reason}</p>
                    <p><strong>Potential:</strong> {suggestion.potential}</p>
                </div>
            ))}
        </div>
    );
}