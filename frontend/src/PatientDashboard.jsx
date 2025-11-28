import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATABASE (Source of Truth) ---
// We keep this outside or separate so we can filter the state without losing data
const ALL_HOSPITALS = [
  { id: 1, name: 'City General Hospital', distance: '1.2 km', wait: '15 mins', specialty: 'General, Trauma', beds: 4, status: 'High Availability', color: 'green' },
  { id: 2, name: 'St. Mary’s Cardio Center', distance: '3.5 km', wait: '45 mins', specialty: 'Cardiology', beds: 1, status: 'Low Availability', color: 'red' },
  { id: 3, name: 'Westside Pediatrics', distance: '2.0 km', wait: '10 mins', specialty: 'Pediatrics', beds: 12, status: 'Moderate Availability', color: 'orange' },
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [view, setView] = useState('home'); 
  const [symptom, setSymptom] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  // Initialize hospitals with the full list
  const [hospitals, setHospitals] = useState(ALL_HOSPITALS); 

  const [highContrast, setHighContrast] = useState(false);
  
  const [activeRequests, setActiveRequests] = useState([
    { id: 101, hospital: 'City General', status: 'Accepted', eta: 'Ambulance arriving in 5 mins', time: '10:30 AM' }
  ]);

  const [history] = useState([
    { id: 1, date: '2024-10-15', title: 'Viral Fever Checkup', doctor: 'Dr. Smith', hospital: 'City General' },
    { id: 2, date: '2024-08-20', title: 'Blood Test (CBC)', doctor: 'Lab Corp', hospital: 'St. Mary’s' },
  ]);

  const [bedGrid] = useState(Array(20).fill(false).map(() => Math.random() < 0.6));

  // --- UPDATED HANDLERS ---
  
  const handleSearch = () => {
    if (!symptom) {
        // If empty, reset to show all hospitals
        setHospitals(ALL_HOSPITALS);
        return;
    }

    setIsSearching(true);

    // Simulate Algorithm Delay
    setTimeout(() => {
      const lowerSym = symptom.toLowerCase();
      
      // 1. Determine Specialty based on keywords
      let targetSpecialty = '';
      if (lowerSym.includes('heart') || lowerSym.includes('chest') || lowerSym.includes('breath') || lowerSym.includes('cardio')) {
          targetSpecialty = 'Cardiology';
      } else if (lowerSym.includes('child') || lowerSym.includes('baby') || lowerSym.includes('infant')) {
          targetSpecialty = 'Pediatrics';
      } else if (lowerSym.includes('accident') || lowerSym.includes('fracture') || lowerSym.includes('trauma') || lowerSym.includes('blood')) {
          targetSpecialty = 'Trauma';
      } else {
          targetSpecialty = 'General'; // Default fallback
      }

      // 2. Filter the Master List (ALL_HOSPITALS)
      const filteredResults = ALL_HOSPITALS.filter(h => 
          // Match the determined specialty OR match "General" as a safety net
          h.specialty.includes(targetSpecialty) || 
          (targetSpecialty === 'General' && h.specialty.includes('General'))
      );

      // 3. Update the view
      setHospitals(filteredResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setView('details');
  };

  const handleRequestHelp = () => {
    if(!selectedHospital) return;
    const confirm = window.confirm(`Request Emergency Help from ${selectedHospital.name}?`);
    if(confirm) {
        setActiveRequests([{
            id: Date.now(), 
            hospital: selectedHospital.name, 
            status: 'Pending', 
            eta: 'Calculating...', 
            time: new Date().toLocaleTimeString()
        }, ...activeRequests]);
        alert("🚨 Request Sent! Redirecting to Dashboard...");
        setView('home');
    }
  };

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to log out?")) navigate('/');
  };

  // --- STYLES (Unchanged) ---
  const styles = {
    container: { minHeight: '100vh', backgroundColor: highContrast ? '#000' : '#f0f2f5', color: highContrast ? '#fff' : '#333', fontFamily: 'Segoe UI, sans-serif', display: 'flex' },
    sidebar: { width: '80px', backgroundColor: highContrast ? '#333' : '#fff', boxShadow: '2px 0 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', zIndex: 10 },
    main: { flex: 1, padding: '30px', overflowY: 'auto' },
    iconBtn: (active) => ({
      width: '50px', height: '50px', borderRadius: '15px', border: 'none', marginBottom: '20px', cursor: 'pointer', fontSize: '1.5rem',
      backgroundColor: active ? '#007bff' : 'transparent', color: active ? '#fff' : (highContrast ? '#aaa' : '#666'), transition: 'all 0.3s'
    }),
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    profileBadge: { display: 'flex', alignItems: 'center', gap: '10px', background: highContrast ? '#333' : '#fff', padding: '10px 20px', borderRadius: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    card: { backgroundColor: highContrast ? '#1a1a1a' : '#fff', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px', border: highContrast ? '1px solid #444' : 'none' },
    searchBox: { display: 'flex', gap: '10px', marginBottom: '20px' },
    input: { flex: 1, padding: '15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' },
    searchBtn: { padding: '15px 30px', borderRadius: '12px', border: 'none', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    hospitalCard: { 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.2s' 
    },
    statusDot: (color) => ({ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, display: 'inline-block', marginRight: '5px' }),
    bedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '10px', marginTop: '15px' },
    bedBox: (occupied) => ({
      height: '40px', backgroundColor: occupied ? '#dc3545' : '#28a745', borderRadius: '6px', opacity: highContrast ? 1 : 0.8,
      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)'
    }),
    timelineItem: { borderLeft: '3px solid #007bff', paddingLeft: '20px', marginBottom: '20px', position: 'relative' },
    timelineDot: { position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#007bff' },
    alertBox: { padding: '15px', borderRadius: '10px', backgroundColor: '#e3f2fd', color: '#0d47a1', marginBottom: '15px', borderLeft: '5px solid #007bff' }
  };

  // --- VIEWS ---

  const renderHome = () => (
    <>
      <div style={styles.card}>
        <h2 style={{marginTop:0}}>🩺 How are you feeling today?</h2>
        <div style={styles.searchBox}>
          <input 
            style={styles.input} 
            placeholder="Type symptoms (e.g., Chest pain, Fever, Baby)..." 
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>
            {isSearching ? 'Finding...' : 'Find Help'}
          </button>
        </div>
      </div>

      {activeRequests.length > 0 && (
        <div style={styles.card}>
            <h3 style={{margin:'0 0 15px 0', color: '#007bff'}}>🚑 Active Requests</h3>
            {activeRequests.map(req => (
                <div key={req.id} style={styles.alertBox}>
                    <strong>{req.hospital}</strong> • <span style={{fontWeight:'bold'}}>{req.status}</span>
                    <div style={{fontSize:'0.9rem', marginTop:'5px'}}>{req.eta}</div>
                </div>
            ))}
        </div>
      )}

      {isSearching && <div style={{textAlign:'center', padding:'20px'}}>Analyzing symptoms & checking availability... <span style={{fontSize:'1.5rem'}}>⏳</span></div>}
      
      {!isSearching && (
          <div style={styles.card}>
            <h3>{hospitals.length === ALL_HOSPITALS.length ? 'Nearby Hospitals' : 'Recommended Specialists'}</h3>
            
            {hospitals.length === 0 ? (
                <div style={{padding:'20px', textAlign:'center', color:'#888'}}>
                    No specialists found for this symptom. <br/> showing General Hospitals.
                </div>
            ) : (
                hospitals.map(h => (
                    <div 
                        key={h.id} 
                        style={styles.hospitalCard} 
                        onClick={() => handleHospitalClick(h)}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <div>
                            <h4 style={{margin:0}}>{h.name}</h4>
                            <div style={{fontSize:'0.9rem', color:'#666', marginTop:'5px'}}>{h.specialty} • {h.distance}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                            <div style={{fontWeight:'bold', color: h.color}}>
                                <span style={styles.statusDot(h.color)}></span>{h.status}
                            </div>
                            <div style={{fontSize:'0.8rem', color:'#888'}}>Wait: {h.wait}</div>
                        </div>
                    </div>
                ))
            )}
          </div>
      )}
    </>
  );

  const renderHospitalDetails = () => (
    <div style={{animation: 'fadeIn 0.5s'}}>
        <button onClick={() => setView('home')} style={{marginBottom:'20px', background:'none', border:'none', color:'#007bff', cursor:'pointer', fontSize:'1rem'}}>← Back to List</button>
        
        <div style={{...styles.card, background: 'linear-gradient(135deg, #007bff 0%, #00d2ff 100%)', color:'white'}}>
            <h1 style={{margin:0}}>{selectedHospital?.name}</h1>
            <p style={{opacity:0.9}}>📍 {selectedHospital?.distance} away • 🕒 {selectedHospital?.wait} wait time</p>
            <button onClick={handleRequestHelp} style={{marginTop:'15px', padding:'12px 25px', borderRadius:'25px', border:'none', background:'white', color:'#007bff', fontWeight:'bold', cursor:'pointer', boxShadow:'0 4px 10px rgba(0,0,0,0.2)'}}>
                🚨 REQUEST EMERGENCY HELP
            </button>
        </div>

        <div style={styles.card}>
            <h3>🛏️ Real-Time Bed Availability</h3>
            <p style={{fontSize:'0.9rem', color:'#666'}}>Live view of ER and Ward status.</p>
            <div style={{display:'flex', gap:'15px', marginBottom:'10px', fontSize:'0.8rem'}}>
                <span>🟢 Available</span> <span>🔴 Occupied</span>
            </div>
            <div style={styles.bedGrid}>
                {bedGrid.map((occupied, i) => (
                    <div key={i} style={styles.bedBox(occupied)} title={occupied ? 'Bed Occupied' : 'Bed Available'}></div>
                ))}
            </div>
        </div>

        <div style={styles.card}>
            <h3>👨‍⚕️ Available Specialists</h3>
            <div style={{display:'flex', gap:'10px', flexWrap:'wrap', marginTop:'10px'}}>
                {['Dr. Adams (Cardio)', 'Dr. Eve (Trauma)', 'Dr. House (Diag)'].map((doc, i) => (
                    <span key={i} style={{background:'#f0f2f5', padding:'8px 15px', borderRadius:'15px', fontSize:'0.9rem'}}>
                        {doc}
                    </span>
                ))}
            </div>
        </div>
    </div>
  );

  const renderHistory = () => (
    <div style={styles.card}>
        <h2>📂 Medical History</h2>
        <div style={{marginTop:'20px'}}>
            {history.map(item => (
                <div key={item.id} style={styles.timelineItem}>
                    <div style={styles.timelineDot}></div>
                    <div style={{fontSize:'0.9rem', color:'#888'}}>{item.date}</div>
                    <h4 style={{margin:'5px 0'}}>{item.title}</h4>
                    <div>{item.hospital} • {item.doctor}</div>
                    <button style={{marginTop:'10px', padding:'5px 10px', border:'1px solid #ddd', background:'transparent', borderRadius:'5px', cursor:'pointer'}}>View Report</button>
                </div>
            ))}
        </div>
        <div style={{marginTop:'30px', borderTop:'1px solid #eee', paddingTop:'20px'}}>
            <h4>Drag & Drop Documents</h4>
            <div style={{border:'2px dashed #ccc', padding:'30px', textAlign:'center', borderRadius:'10px', color:'#999'}}>
                Upload MRI, X-Rays, or Prescriptions here
            </div>
        </div>
    </div>
  );

  const renderSettings = () => (
    <div style={styles.card}>
        <h2>⚙️ Settings</h2>
        
        <div style={{marginBottom:'20px'}}>
            <h4>Notifications</h4>
            <label style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                <span>Push Notifications</span> <input type="checkbox" defaultChecked />
            </label>
            <label style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                <span>SMS Alerts</span> <input type="checkbox" defaultChecked />
            </label>
        </div>

        <div style={{marginBottom:'20px'}}>
            <h4>Accessibility</h4>
            <label style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                <span>High Contrast Mode</span> 
                <input type="checkbox" checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
            </label>
            <label style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                <span>Voice Commands</span> <input type="checkbox" />
            </label>
        </div>

        <button onClick={handleLogout} style={{width:'100%', padding:'15px', background:'#ff4d4f', color:'white', border:'none', borderRadius:'8px', fontSize:'1rem', fontWeight:'bold', cursor:'pointer'}}>
            Log Out
        </button>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* SIDEBAR NAVIGATION */}
      <nav style={styles.sidebar}>
        <div style={{marginBottom:'30px', fontSize:'2rem'}}>🏥</div>
        <button style={styles.iconBtn(view === 'home')} onClick={() => setView('home')} title="Dashboard">🏠</button>
        <button style={styles.iconBtn(view === 'history')} onClick={() => setView('history')} title="History">📂</button>
        <button style={styles.iconBtn(view === 'settings')} onClick={() => setView('settings')} title="Settings">⚙️</button>
        <div style={{marginTop:'auto', marginBottom:'20px'}}>
            <button style={styles.iconBtn(false)} onClick={() => alert("Connecting to Emergency Contact...")} title="SOS Call">📞</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <header style={styles.header}>
            <h1 style={{margin:0, color: highContrast ? '#fff' : '#333'}}>
                {view === 'home' ? 'Patient Dashboard' : 
                 view === 'history' ? 'My Records' : 
                 view === 'settings' ? 'Preferences' : 'Details'}
            </h1>
            <div style={styles.profileBadge}>
                <div style={{width:'35px', height:'35px', borderRadius:'50%', background:'#ddd'}}></div>
                <div>
                    <div style={{fontWeight:'bold', fontSize:'0.9rem'}}>Alex Doe</div>
                    <div style={{fontSize:'0.7rem', color:'#888'}}>+1 987 654 3210</div>
                </div>
            </div>
        </header>

        {view === 'home' && renderHome()}
        {view === 'details' && renderHospitalDetails()}
        {view === 'history' && renderHistory()}
        {view === 'settings' && renderSettings()}
        
      </main>
    </div>
  );
};

export default PatientDashboard;