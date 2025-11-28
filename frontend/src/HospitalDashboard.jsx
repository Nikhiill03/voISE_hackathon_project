import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // --- MOCK DATA STATE (Simulating Database) ---
  
  // 1. Facilities (The "Movie Theatre" Seat Booking System)
  // Generating 30 beds (false = available/green, true = occupied/red)
  const [beds, setBeds] = useState(Array(30).fill(false).map(() => Math.random() < 0.4)); 

  // 2. Doctors Data
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. John Doe', dept: 'Cardiology', available: true },
    { id: 2, name: 'Dr. Jane Smith', dept: 'Cardiology', available: false },
    { id: 3, name: 'Dr. Emily Davis', dept: 'Pediatrics', available: true },
    { id: 4, name: 'Dr. Alan Grant', dept: 'Orthopedics', available: true },
  ]);

  // 3. Patient Requests
  const [requests, setRequests] = useState([
    { id: 101, name: 'Alice Walker', symptom: 'Severe Chest Pain', triage: 'Critical', status: 'Pending', time: '10:45 AM' },
    { id: 102, name: 'Bob Jones', symptom: 'Fractured Wrist', triage: 'Moderate', status: 'Pending', time: '11:10 AM' },
    { id: 103, name: 'Charlie Day', symptom: 'High Fever', triage: 'Low', status: 'In Progress', time: '09:30 AM' },
  ]);

  // 4. Alerts
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Code Blue', location: 'ICU - Bed 4', time: '10:00 AM', active: true }
  ]);

  // --- HANDLERS ---
  const toggleBed = (index) => {
    const newBeds = [...beds];
    newBeds[index] = !newBeds[index]; // Toggle status
    setBeds(newBeds);
  };

  const toggleDoctor = (id) => {
    setDoctors(doctors.map(doc => doc.id === id ? { ...doc, available: !doc.available } : doc));
  };

  const updateRequestStatus = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const handleSendAlert = () => {
    const newAlert = { id: Date.now(), type: 'Code Red', location: 'Emergency Ward', time: new Date().toLocaleTimeString(), active: true };
    setAlerts([newAlert, ...alerts]);
    alert("🚨 Emergency Alert Broadcasted to all Staff!");
  };

  // --- STYLES ---
  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Segoe UI, sans-serif' },
    sidebar: { width: '250px', backgroundColor: '#003366', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' },
    main: { flex: 1, padding: '30px', overflowY: 'auto' },
    navBtn: (active) => ({
      width: '100%', padding: '15px', textAlign: 'left', background: active ? '#0056b3' : 'transparent',
      color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem', marginBottom: '5px', borderRadius: '5px'
    }),
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #ddd', paddingBottom: '15px' },
    card: { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '20px' },
    statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
    statCard: (color) => ({ background: color, color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }),
    
    // Facility Grid
    bedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '15px', marginTop: '20px' },
    bedBox: (occupied) => ({
      height: '60px', backgroundColor: occupied ? '#dc3545' : '#28a745', borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', cursor: 'pointer',
      boxShadow: occupied ? 'inset 0 0 10px #800' : 'inset 0 0 10px #050'
    }),

    // Lists
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee' },
    statusBadge: (status) => ({
      padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold',
      backgroundColor: status === 'Available' || status === 'Completed' ? '#d4edda' : '#f8d7da',
      color: status === 'Available' || status === 'Completed' ? '#155724' : '#721c24'
    }),
    actionBtn: { padding: '8px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginLeft: '10px', backgroundColor: '#007bff', color: 'white' }
  };

  // --- RENDER HELPERS ---
  
  const renderOverview = () => (
    <>
      <div style={styles.statGrid}>
        <div style={styles.statCard('#007bff')}><h2>{requests.filter(r => r.status === 'Pending').length}</h2><p>Pending Requests</p></div>
        <div style={styles.statCard('#28a745')}><h2>{beds.filter(b => !b).length}</h2><p>Available Beds</p></div>
        <div style={styles.statCard('#17a2b8')}><h2>{doctors.filter(d => d.available).length}</h2><p>Doctors On Duty</p></div>
        <div style={styles.statCard('#ffc107')}><h2>8m</h2><p>Avg Response Time</p></div>
      </div>
      
      {/* Patient Influx Graph */}
      <div style={styles.card}>
        <h3>📊 Hospital Activity Analytics</h3>
        <div style={{display:'flex', alignItems:'flex-end', height:'150px', gap:'10px', padding:'20px 0', position:'relative'}}>
            {/* Graph bars with labels */}
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'40%', width:'100%', background:'#007bff', opacity:0.6}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>8 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'70%', width:'100%', background:'#007bff', opacity:0.8}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>9 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'50%', width:'100%', background:'#007bff', opacity:0.6}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>10 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'90%', width:'100%', background:'#007bff'}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>11 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'60%', width:'100%', background:'#007bff', opacity:0.7}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>12 PM</span>
            </div>
        </div>
        <p style={{textAlign:'center', color:'#666', fontWeight:'bold', marginTop:'10px'}}>Patient Influx Over Last 5 Hours</p>
      </div>

      {/* Bed Availability Graph */}
      <div style={styles.card}>
        <h3>🛏️ Bed Availability Trend</h3>
        <div style={{display:'flex', alignItems:'flex-end', height:'150px', gap:'10px', padding:'20px 0', position:'relative'}}>
            {/* Graph bars with labels */}
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'75%', width:'100%', background:'#28a745', opacity:0.7}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>8 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'55%', width:'100%', background:'#28a745', opacity:0.8}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>9 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'65%', width:'100%', background:'#28a745', opacity:0.6}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>10 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'45%', width:'100%', background:'#28a745', opacity:0.9}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>11 AM</span>
            </div>
            <div style={{width:'20%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%'}}>
              <div style={{height:'60%', width:'100%', background:'#28a745'}}></div>
              <span style={{fontSize:'0.75rem', marginTop:'5px', color:'#666'}}>12 PM</span>
            </div>
        </div>
        <p style={{textAlign:'center', color:'#666', fontWeight:'bold', marginTop:'10px'}}>Available Beds Over Last 5 Hours</p>
      </div>
    </>
  );

  const renderFacilities = () => (
    <div style={styles.card}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3>🏥 Ward Availability Map</h3>
        <div>
            <span style={{marginRight:'15px'}}>🟢 Available</span>
            <span>🔴 Occupied (Click to Toggle)</span>
        </div>
      </div>
      <div style={styles.bedGrid}>
        {beds.map((isOccupied, index) => (
            <div 
                key={index} 
                style={styles.bedBox(isOccupied)} 
                onClick={() => toggleBed(index)}
                title={`Bed ${index + 1}: ${isOccupied ? 'Occupied' : 'Open'}`}
            >
                {index + 1}
            </div>
        ))}
      </div>
    </div>
  );

  const renderSpecialties = () => (
    <div style={styles.card}>
        <h3>🩺 Department & Doctor Management</h3>
        {['Cardiology', 'Pediatrics', 'Orthopedics'].map(dept => (
            <div key={dept} style={{marginBottom:'20px', border:'1px solid #ddd', borderRadius:'8px', padding:'15px'}}>
                <h4 style={{color:'#0056b3', borderBottom:'1px solid #eee', paddingBottom:'5px'}}>{dept}</h4>
                {doctors.filter(d => d.dept === dept).map(doc => (
                    <div key={doc.id} style={styles.listItem}>
                        <span>👨‍⚕️ {doc.name}</span>
                        <div>
                            <span style={styles.statusBadge(doc.available ? 'Available' : 'Busy')}>
                                {doc.available ? 'On Duty' : 'Off Duty'}
                            </span>
                            <button onClick={() => toggleDoctor(doc.id)} style={{...styles.actionBtn, background:'#6c757d', fontSize:'0.8rem'}}>
                                Toggle Status
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
  );

  const renderRequests = () => (
    <div style={styles.card}>
        <h3>🚑 Patient Requests (Triage)</h3>
        {requests.sort((a,b) => (a.triage === 'Critical' ? -1 : 1)).map(req => (
            <div key={req.id} style={{...styles.listItem, background: req.triage === 'Critical' ? '#fff3f3' : 'white'}}>
                <div>
                    <h4 style={{margin:0}}>{req.name} <span style={{fontSize:'0.8rem', color:'#666'}}>({req.time})</span></h4>
                    <p style={{margin:'5px 0', color: req.triage === 'Critical' ? 'red' : 'black'}}>
                        Symptoms: {req.symptom} | <strong>{req.triage}</strong>
                    </p>
                </div>
                <div>
                    <span style={{marginRight:'10px', fontWeight:'bold', color:'#555'}}>Status: {req.status}</span>
                    {req.status !== 'Completed' && (
                        <>
                            <button onClick={() => updateRequestStatus(req.id, 'In Progress')} style={{...styles.actionBtn, background:'#ffc107', color:'black'}}>Start</button>
                            <button onClick={() => updateRequestStatus(req.id, 'Completed')} style={{...styles.actionBtn, background:'#28a745'}}>Complete</button>
                        </>
                    )}
                    <button style={{...styles.actionBtn, background:'transparent', color:'#007bff', border:'1px solid #007bff'}}>Chat</button>
                </div>
            </div>
        ))}
    </div>
  );

  const renderAlerts = () => (
    <div style={styles.card}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>🚨 Emergency Alerts</h3>
            <button onClick={handleSendAlert} style={{...styles.actionBtn, background:'#dc3545', fontWeight:'bold'}}>📢 BROADCAST CODE RED</button>
        </div>
        {alerts.map(alert => (
            <div key={alert.id} style={{...styles.listItem, background:'#f8d7da', borderLeft:'5px solid #dc3545', marginTop:'15px'}}>
                <div>
                    <strong>{alert.type}</strong> at {alert.location}
                    <div style={{fontSize:'0.8rem'}}>{alert.time}</div>
                </div>
                <button style={styles.actionBtn} onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))}>Resolve</button>
            </div>
        ))}
    </div>
  );

  const renderAbout = () => (
    <div style={styles.card}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h2>City General Hospital</h2>
            <button style={styles.actionBtn}>✏️ Edit Details</button>
        </div>
        <p><strong>Location:</strong> 123 Healthcare Blvd, Metropolis</p>
        <p><strong>Contact:</strong> +1 (555) 019-2834</p>
        <p><strong>Description:</strong> A leading Tier-1 trauma center specializing in emergency care, cardiology, and pediatrics. Accredited by JCI.</p>
        <hr />
        <h4>Services</h4>
        <p>24/7 Emergency, ICU, MRI/CT Scan, Pharmacy, Blood Bank</p>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <nav style={styles.sidebar}>
        <div style={{fontSize:'1.5rem', fontWeight:'bold', marginBottom:'30px', textAlign:'center'}}>
            🏥 CarePulse <br/><span style={{fontSize:'1rem', fontWeight:'normal'}}>Partner</span>
        </div>
        <button style={styles.navBtn(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>📊 Overview</button>
        <button style={styles.navBtn(activeTab === 'requests')} onClick={() => setActiveTab('requests')}>🚑 Patient Requests</button>
        <button style={styles.navBtn(activeTab === 'facilities')} onClick={() => setActiveTab('facilities')}>🛏️ Facilities (Beds)</button>
        <button style={styles.navBtn(activeTab === 'specialties')} onClick={() => setActiveTab('specialties')}>🩺 Specialties & Docs</button>
        <button style={styles.navBtn(activeTab === 'staff')} onClick={() => setActiveTab('staff')}>👥 Staff Mgmt</button>
        <button style={styles.navBtn(activeTab === 'alerts')} onClick={() => setActiveTab('alerts')}>🚨 Emergency Alerts</button>
        <button style={styles.navBtn(activeTab === 'about')} onClick={() => setActiveTab('about')}>ℹ️ About Hospital</button>
        
        <div style={{marginTop:'auto'}}>
            <button onClick={() => navigate('/')} style={{...styles.navBtn(false), background:'#dc3545', textAlign:'center'}}>Log Out</button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main style={styles.main}>
        <header style={styles.header}>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard</h2>
            <div>
                <span style={{marginRight:'15px', fontWeight:'bold'}}>👤 Admin: Dr. House</span>
                <button onClick={() => navigate('/')} style={{padding:'5px 10px'}}>Home</button>
            </div>
        </header>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'facilities' && renderFacilities()}
        {activeTab === 'specialties' && renderSpecialties()}
        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'alerts' && renderAlerts()}
        {activeTab === 'about' && renderAbout()}
        {activeTab === 'staff' && <div style={styles.card}><h3>👥 Staff Management</h3><p>List of nurses and admin staff goes here (similar to Doctor list).</p></div>}
      </main>
    </div>
  );
};

export default HospitalDashboard;