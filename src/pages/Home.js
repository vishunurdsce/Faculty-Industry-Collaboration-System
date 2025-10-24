const { useState, useEffect, useMemo } = React;

function Home({ searchTerm, onSearch, onClear, isLoading, filteredFaculty, filteredIndustry }) {
    return (
        <div>
            <div className="header">
                <h1>AI-driven Faculty-Industry Collaboration</h1>
                <p>Intelligent Recommendation System</p>
            </div>
            
            <FilterBar 
                searchTerm={searchTerm}
                onSearch={onSearch}
                onClear={onClear}
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