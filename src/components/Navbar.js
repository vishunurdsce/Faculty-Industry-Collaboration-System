const { Link, useLocation } = ReactRouterDOM;

function Navbar() {
    const location = useLocation();
    
    return (
        <nav style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '15px 0',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '20px'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '30px'
                    }}>
                        <Link 
                            to="/" 
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === '/' ? '#3498db' : '#2c3e50',
                                fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                                fontSize: '18px'
                            }}
                        >
                            🏠 Home
                        </Link>
                        <Link 
                            to="/matches" 
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === '/matches' ? '#3498db' : '#2c3e50',
                                fontWeight: location.pathname === '/matches' ? 'bold' : 'normal',
                                fontSize: '18px'
                            }}
                        >
                            🤝 AI Matches
                        </Link>
                        <Link 
                            to="/about" 
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === '/about' ? '#3498db' : '#2c3e50',
                                fontWeight: location.pathname === '/about' ? 'bold' : 'normal',
                                fontSize: '18px'
                            }}
                        >
                            ℹ️ About
                        </Link>
                    </div>
                    <div style={{
                        color: '#2c3e50',
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>
                        AI Collaboration System
                    </div>
                </div>
            </div>
        </nav>
    );
}