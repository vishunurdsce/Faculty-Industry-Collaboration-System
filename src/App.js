const { useState, useEffect, useMemo } = React;

function App() {
    // debug log
    console.log("🔍 App initializing. initial window.facultyData:", window.facultyData && window.facultyData.length, "window.industryData:", window.industryData && window.industryData.length);

    const [currentPage, setCurrentPage] = useState('home');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Local state for backend-loaded data (start with globals if present)
    const [faculty, setFaculty] = useState(window.facultyData || []);
    const [industry, setIndustry] = useState(window.industryData || []);

    // Load data from backend when app starts (and whenever manual reload is triggered)
    useEffect(() => {
        let mounted = true;
        async function loadData() {
            try {
                if (window.loadDataFromBackend) {
                    await window.loadDataFromBackend();
                    if(!mounted) return;
                    setFaculty(window.facultyData || []);
                    setIndustry(window.industryData || []);
                } else {
                    // fallback: use globals
                    setFaculty(window.facultyData || []);
                    setIndustry(window.industryData || []);
                }
            } catch (err) {
                console.warn("Error loading backend data:", err);
                setFaculty(window.facultyData || []);
                setIndustry(window.industryData || []);
            }
        }
        loadData();
        return ()=> mounted = false;
    }, []);

    // If no data yet, show friendly loading message instead of blank page
    if ((!faculty || faculty.length === 0) && (!industry || industry.length === 0)) {
    // fallback to static demo data if backend empty
    const demoFaculty = [
        { id: 1, name: "Dr. Smith", expertise: "AI", department: "Computer Science" },
        { id: 2, name: "Dr. Johnson", expertise: "Data Science", department: "Statistics" },
        { id: 3, name: "Dr. Brown", expertise: "Robotics", department: "Engineering" }
    ];
    const demoIndustry = [
        { id: 1, name: "Tech Corp", needs: "AI Research", contact: "hr@techcorp.com" },
        { id: 2, name: "Data Solutions", needs: "Data Analysis", contact: "careers@datasol.com" },
        { id: 3, name: "Auto Industries", needs: "Robotics Automation", contact: "info@autoind.com" }
    ];
    return (
        <div className="section">
            <h2>👨‍🏫 Faculty Experts</h2>
            <div className="faculty-list">
                {demoFaculty.map(f => (
                    <div key={f.id} className="faculty-card">
                        <h3>{f.name}</h3>
                        <p><strong>Department:</strong> {f.department}</p>
                        <p><strong>Expertise:</strong> {f.expertise}</p>
                    </div>
                ))}
            </div>

            <h2>🏢 Industry Partners</h2>
            <div className="industry-list">
                {demoIndustry.map(i => (
                    <div key={i.id} className="industry-card">
                        <h3>{i.name}</h3>
                        <p><strong>Needs:</strong> {i.needs}</p>
                        <p><strong>Contact:</strong> {i.contact}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


    // Use faculty/industry state for filtering
    const { filteredFaculty, filteredIndustry } = useMemo(() => {
        if (!searchTerm) {
            return {
                filteredFaculty: faculty,
                filteredIndustry: industry
            };
        }

        const lowerTerm = searchTerm.toLowerCase();
        const filteredFac = faculty.filter(faculty =>
            (faculty.expertise || "").toLowerCase().includes(lowerTerm) ||
            (faculty.department || "").toLowerCase().includes(lowerTerm) ||
            (faculty.name || "").toLowerCase().includes(lowerTerm)
        );

        const filteredInd = industry.filter(industry =>
            (industry.needs || "").toLowerCase().includes(lowerTerm) ||
            (industry.name || "").toLowerCase().includes(lowerTerm)
        );

        return {
            filteredFaculty: filteredFac,
            filteredIndustry: filteredInd
        };
    }, [searchTerm, faculty, industry]);

    useEffect(() => {
        if (searchTerm) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 200);
            return () => clearTimeout(timer);
        }
    }, [searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase().trim());
    };

    const clearSearch = () => setSearchTerm('');

    return (
        <div className="container">
            {/* Styled Navigation Box - Transparent/Lucent */}
            <div className="nav-section" style={{ marginBottom: '30px' }}>
                <div className="section" style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        {/* System Title - Moved to LEFT */}
                        <div style={{
                            color: '#2c3e50',
                            fontWeight: 'bold',
                            fontSize: '24px'
                        }}>
                            AI Collaboration System
                        </div>

                        {/* Page Navigation - Moved to RIGHT */}
                        <div style={{ 
                            display: 'flex', 
                            gap: '15px', 
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button 
                                onClick={() => setCurrentPage('home')}
                                className="nav-card-button"
                                data-active={currentPage === 'home'}
                            >
                                🏠 Home
                            </button>
                            {/* <button 
                                onClick={() => setCurrentPage('matches')}
                                className="nav-card-button"
                                data-active={currentPage === 'matches'}
                            >
                                🤝 AI Matches
                            </button> */}
                            <button 
                                onClick={() => setCurrentPage('about')}
                                className="nav-card-button"
                                data-active={currentPage === 'about'}
                            >
                                ℹ️ About
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Current Page */}
            {currentPage === 'home' && (
                <Home 
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    onClear={clearSearch}
                    isLoading={isLoading}
                    filteredFaculty={filteredFaculty}
                    filteredIndustry={filteredIndustry}
                />
            )}
            {/* {currentPage === 'matches' && <Matches />} */}
            {currentPage === 'about' && <About />}
        </div>
    );
}