import React, { useState, useEffect } from 'react';

const NewTest = () => {
    const [soilData, setSoilData] = useState([]);
    const [selectedSoil, setSelectedSoil] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch data from the MySQL database when the component mounts
    useEffect(() => {
        const fetchSoilProperties = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/soil-properties');
                const result = await response.json();
                
                if (result.success) {
                    setSoilData(result.data);
                } else {
                    console.error("Failed to fetch soil data from server.");
                }
            } catch (error) {
                console.error("Error connecting to backend:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSoilProperties();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedSoil(e.target.value);
        console.log("Selected Soil ID:", e.target.value);
        // You can later use this ID to fetch specific parameters (cohesion, friction angle, etc.)
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerRow}>
                <h3>Configure New Stability Test</h3>
                
                {/* Right-aligned Dropdown */}
                <div style={styles.dropdownGroup}>
                    <label htmlFor="soil-select" style={styles.label}>
                        Select Soil Parameters:
                    </label>
                    <select 
                        id="soil-select" 
                        value={selectedSoil} 
                        onChange={handleSelectChange}
                        style={styles.select}
                        disabled={loading}
                    >
                        <option value="">-- {loading ? "Loading Database..." : "Choose Soil Profile"} --</option>
                        {soilData.map((soil, index) => (
                            /* NOTE: Adjust 'soil.id' and 'soil.name' to match your exact MySQL column names */
                            <option key={soil.id || index} value={soil.id}>
                                {soil.name || soil.soil_type || `Soil ID: ${soil.id}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            {/* Future Workspace Area */}
            <div style={styles.workspace}>
                <p style={{ color: '#64748b' }}>Select a soil profile from the dropdown above to load telemetry parameters.</p>
            </div>
        </div>
    );
};

// Inline styles for quick layout setup
const styles = {
    container: {
        width: '100%',
        padding: '20px 0'
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '15px',
        marginBottom: '20px'
    },
    dropdownGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    label: {
        fontWeight: '700',
        color: '#7a1b30',
        fontSize: '0.95rem'
    },
    select: {
        padding: '10px 15px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        fontSize: '0.95rem',
        outline: 'none',
        cursor: 'pointer',
        minWidth: '220px'
    },
    workspace: {
        background: '#f8fafc',
        border: '1px dashed #cbd5e1',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center'
    }
};

export default NewTest;