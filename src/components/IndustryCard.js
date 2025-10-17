function IndustryCard({ industry }) {
    return (
        <div className="industry-card">
            <h3>{industry.name}</h3>
            <p><strong>🎯 Needs:</strong> {industry.needs}</p>
            <p><strong>📧 Contact:</strong> {industry.contact}</p>
            <p><strong>🤝 Collaboration Ready</strong></p>
        </div>
    );
}