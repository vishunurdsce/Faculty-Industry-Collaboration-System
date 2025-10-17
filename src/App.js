const { useState, useEffect, useMemo, useCallback } = React;

function App() {
    // Hook 1: useState for search term
    const [searchTerm, setSearchTerm] = useState('');
    
    // Hook 2: useState for loading state
    const [isLoading, setIsLoading] = useState(false);
    
    // Hook 3: useMemo for filtered data
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

    // Hook 4: useEffect for loading simulation
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
            <div className="header">
                <h1>AI-driven Faculty-Industry Collaboration</h1>
                <p>Intelligent Recommendation System</p>
            </div>
            
            <FilterBar 
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onClear={clearSearch}
                isLoading={isLoading}
            />
            
            {isLoading ? (
                <div style={{textAlign: 'center', padding: '20px'}}>
                    <p>🔍 Finding matches...</p>
                </div>
            ) : (
                <>
                    {searchTerm && (
                        <div style={{background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '10px', marginBottom: '20px'}}>
                            <strong>Found {filteredFaculty.length} faculty and {filteredIndustry.length} industry partners matching "{searchTerm}"</strong>
                        </div>
                    )}
                    
                    <div className="dashboard">
                        <div className="section">
                            <h2>👨‍🏫 Faculty Experts</h2>
                            <div className="faculty-list">
                                {filteredFaculty.map(faculty => (
                                    <FacultyCard key={faculty.id} faculty={faculty} />
                                ))}
                            </div>
                        </div>
                        
                        <div className="section">
                            <h2>🏢 Industry Partners</h2>
                            <div className="industry-list">
                                {filteredIndustry.map(industry => (
                                    <IndustryCard key={industry.id} industry={industry} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}