const { useState } = React;

function FilterBar({ searchTerm, onSearch, onClear, isLoading }) {
    const [inputValue, setInputValue] = useState(searchTerm);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        onSearch(inputValue);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleClear = () => {
        setInputValue('');
        onClear();
    };

    return (
        <div className="filter-bar">
            <div className="search-container">
                <input 
                    type="text"
                    placeholder="🔍 Search by expertise, department, or industry needs..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Find Matches'}
                </button>
                <button onClick={handleClear} style={{background: '#95a5a6'}} disabled={isLoading}>
                    Clear
                </button>
            </div>
        </div>
    );
}