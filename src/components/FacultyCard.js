function FacultyCard({ faculty }) {
    return (
        <div className="faculty-card">
            <h3>{faculty.name}</h3>
            <p><strong>🎯 Expertise:</strong> {faculty.expertise}</p>
            <p><strong>🏫 Department:</strong> {faculty.department}</p>
            <p><strong>⭐ Match Potential:</strong> {Math.floor(Math.random() * 40) + 60}%</p>
        </div>
    );
}