const { useState, useEffect } = React;

function Matches() {
    const [matches, setMatches] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const res = await fetch('/api/matches');
                if (!res.ok) throw new Error('No backend or empty');
                const json = await res.json();
                if (!mounted) return;
                const norm = json.map(m => ({
                    id: m._id,
                    score: m.score,
                    reason: m.reason,
                    faculty: m.faculty && (m.faculty.name || m.faculty),
                    industry: m.industry && (m.industry.name || m.industry)
                }));
                setMatches(norm);
            } catch (err) {
                console.warn("Matches fetch failed, using fallback demo:", err.message);
                const fromWindow = window.matchesData && window.matchesData.length ? window.matchesData : [
                    { id: 'demo1', faculty: 'Dr. Smith', industry: 'Tech Corp', score: 92, reason: 'AI Expertise meets AI Research' },
                    { id: 'demo2', faculty: 'Dr. Johnson', industry: 'Data Solutions', score: 88, reason: 'Data Science expertise meets Data Analysis needs' }
                ];
                setMatches(fromWindow);
                setError(err.message);
            } finally {
                if(mounted) setLoading(false);
            }
        }
        load();
        return ()=> mounted = false;
    }, []);

    return (
        <div className="section">
            <h2>Matches</h2>
            {loading && <p>Loading matches...</p>}
            {!loading && matches && matches.length === 0 && <p>No matches found.</p>}
            <div className="matches-grid">
                {matches && matches.map(m => (
                    <div key={m.id} className="match-card">
                        <h3>🎯 {m.faculty} + {m.industry}</h3>
                        <p><strong>Match Score:</strong> {m.score ? m.score + '%' : 'N/A'}</p>
                        <p><strong>Reason:</strong> {m.reason || 'N/A'}</p>
                    </div>
                ))}
            </div>
            {error && <p className="muted">Showing demo data because: {error}</p>}
        </div>
    );
}