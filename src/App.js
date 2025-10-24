const { useState, useEffect, useMemo } = React;

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { filteredFaculty, filteredIndustry } = useMemo(() => {
        if (!searchTerm) {
            return {
                filteredFaculty: facultyData,
                filteredIndustry: industryData
            };
        }

        const filteredFac = facultyData.filter(faculty => 
            faculty.expertise.toLowerCase().includes(searchTerm) ||
            faculty.department.toLowerCase().includes(searchTerm) ||
            faculty.name.toLowerCase().includes(searchTerm)
        );

        const filteredInd = industryData.filter(industry =>
            industry.needs.toLowerCase().includes(searchTerm) ||
            industry.name.toLowerCase().includes(searchTerm)
        );

        return {
            filteredFaculty: filteredFac,
            filteredIndustry: filteredInd
        };
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase().trim());
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

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
                            <button 
                                onClick={() => setCurrentPage('matches')}
                                className="nav-card-button"
                                data-active={currentPage === 'matches'}
                            >
                                🤝 AI Matches
                            </button>
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
            {currentPage === 'matches' && <Matches />}
            {currentPage === 'about' && <About />}
        </div>
    );
}