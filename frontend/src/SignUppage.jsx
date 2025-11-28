import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- State Management ---
  const [role, setRole] = useState('patient'); // 'patient' or 'hospital'
  
  // Unified form state covering both roles to simplify handling
  const [formData, setFormData] = useState({
    // Common Essentials
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Patient Specific
    dob: '',
    gender: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    medicalConditions: '', // optional
    allergies: '', // optional
    // Hospital Specific
    hospitalName: '',
    hospitalLocation: '',
    hospitalContact: '',
    specialties: '',
    bedCapacity: '',
    // Optional Financial (Common structure)
    insuranceProvider: '',
    policyNumber: '',
    paymentMethod: '',
    // Consents
    consentPrivacy: false,
    consentTreatment: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Accessibility State
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // --- Effects ---

  // 1. Determine Role on Mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get('role');
    setRole(roleParam === 'hospital' ? 'hospital' : 'patient');
    // Reset form data when role changes to avoid stale required errors
    setErrors({});
  }, [location]);

  // 2. Real-time Validation logic
  useEffect(() => {
    const newErrors = {};
    let valid = true;

    // --- Common Validations ---
    if (!formData.fullName.trim()) { newErrors.fullName = 'Full Name is required'; valid = false; }
    
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) { newErrors.email = 'Valid Email is required'; valid = false; }
    
    if (!formData.phone || formData.phone.length < 10) { newErrors.phone = 'Valid Phone Number is required'; valid = false; }
    
    if (formData.password.length < 8) { newErrors.password = 'Password must be at least 8 characters'; valid = false; }
    if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; valid = false; }

    if (!formData.consentPrivacy) { newErrors.consentPrivacy = 'Required'; valid = false; }
    if (!formData.consentTreatment) { newErrors.consentTreatment = 'Required'; valid = false; }


    // --- Role-Specific Validations ---
    if (role === 'patient') {
        if (!formData.dob) { newErrors.dob = 'Date of Birth is required'; valid = false; }
        if (!formData.gender) { newErrors.gender = 'Gender selection is required'; valid = false; }
        if (!formData.address.trim()) { newErrors.address = 'Address is required'; valid = false; }
        if (!formData.emergencyName.trim()) { newErrors.emergencyName = 'Emergency Contact Name is required'; valid = false; }
        if (!formData.emergencyPhone || formData.emergencyPhone.length < 10) { newErrors.emergencyPhone = 'Valid Emergency Phone is required'; valid = false; }

    } else if (role === 'hospital') {
        if (!formData.hospitalName.trim()) { newErrors.hospitalName = 'Hospital Name is required'; valid = false; }
        if (!formData.hospitalLocation.trim()) { newErrors.hospitalLocation = 'Hospital Location is required'; valid = false; }
        if (!formData.hospitalContact || formData.hospitalContact.length < 10) { newErrors.hospitalContact = 'Valid Hospital Contact # is required'; valid = false; }
        if (!formData.specialties.trim()) { newErrors.specialties = 'Please list key specialties'; valid = false; }
        if (!formData.bedCapacity || formData.bedCapacity <= 0) { newErrors.bedCapacity = 'Valid Capacity is required'; valid = false; }
    }

    setErrors(newErrors);
    setIsFormValid(valid);
  }, [formData, role]);


  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log(`Registering [${role.toUpperCase()}] with data:`, formData);
      alert("Registration Successful! Redirecting to login...");
      navigate(`/login?role=${role}`);
    }
  };

  // --- Dynamic Styling ---
  // (Reusing the consistent styling approach from the Login page example)
  const baseFontSize = largeText ? '18px' : '16px';
  const bgColor = highContrast ? '#000000' : '#f4f6f9';
  const cardColor = highContrast ? '#1a1a1a' : '#ffffff';
  const textColor = highContrast ? '#ffffff' : '#333333';
  const mutedColor = highContrast ? '#aaaaaa' : '#666666';
  const accentColor = highContrast ? '#FFD700' : (role === 'patient' ? '#007bff' : '#28a745'); // Blue for patient, Green for hospital
  const errorColor = highContrast ? '#ff9999' : '#dc3545';
  const borderColor = highContrast ? '#555' : '#ddd';

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', backgroundColor: bgColor, color: textColor,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: baseFontSize, transition: 'all 0.3s ease',
    },
    contentWrapper: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 10px' },
    // Branding & Access toggles
    brandingHeader: { width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    brandName: { fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: accentColor },
    accessBtn: (active) => ({ background: active ? accentColor : 'transparent', color: active ? (highContrast ? 'black' : 'white') : textColor, border: `1px solid ${borderColor}`, borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '5px' }),

    card: {
      backgroundColor: cardColor, padding: '30px', borderRadius: '15px',
      boxShadow: highContrast ? '0 0 15px rgba(255,255,255,0.1)' : '0 5px 15px rgba(0,0,0,0.05)',
      width: '100%', maxWidth: '650px', border: highContrast ? `1px solid ${borderColor}` : 'none',
    },
    
    // Read-Only Slider
    sliderContainer: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: highContrast ? '#333' : '#e9ecef', borderRadius: '25px', padding: '5px', marginBottom: '25px',
      position: 'relative', height: '45px', border: highContrast ? `1px solid ${borderColor}` : 'none', opacity: 0.8
    },
    sliderIndicator: {
      position: 'absolute', top: '5px', left: role === 'patient' ? '5px' : '50%',
      width: 'calc(50% - 5px)', height: '35px', backgroundColor: accentColor, borderRadius: '20px', transition: 'all 0.3s ease-in-out', zIndex: 0,
    },
    sliderLabel: (isActive) => ({
      flex: 1, textAlign: 'center', zIndex: 1, fontWeight: '600',
      color: isActive ? (highContrast ? 'black' : 'white') : mutedColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', userSelect: 'none',
    }),

    // Form Fields
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }, // 2-column layout for desktop
    fullWidth: { gridColumn: '1 / -1' },
    inputGroup: { display: 'flex', flexDirection: 'column' },
    label: { marginBottom: '5px', fontWeight: '600', fontSize: '0.9em', color: textColor },
    input: {
      padding: '12px', borderRadius: '8px', border: `1px solid ${borderColor}`,
      backgroundColor: highContrast ? '#000' : '#fff', color: textColor, fontSize: baseFontSize,
    },
    sectionHeader: { gridColumn: '1 / -1', marginTop: '10px', marginBottom: '5px', color: accentColor, borderBottom: `1px solid ${borderColor}` },
    errorText: { color: errorColor, fontSize: '0.8em', marginTop: '2px' },
    checkboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9em', cursor: 'pointer' },

    signupBtn: {
        width: '100%', padding: '15px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '8px', border: 'none',
        backgroundColor: isFormValid ? accentColor : (highContrast ? '#333' : '#ccc'),
        color: isFormValid ? (highContrast ? 'black' : 'white') : (highContrast ? '#666' : '#666'),
        cursor: isFormValid ? 'pointer' : 'not-allowed', marginTop: '20px', transition: 'background-color 0.3s',
    },
    link: { color: accentColor, textDecoration: 'none', fontWeight: '600' },
    footer: { padding: '20px', textAlign: 'center', fontSize: '0.9rem', color: mutedColor, borderTop: `1px solid ${borderColor}`, display: 'flex', justifyCenter: 'center', gap: '20px' },
  };

  // --- Helper to render standard input fields ---
  const renderField = (name, label, type = 'text', required = true, gridSpan = 1, placeholder = '') => (
    <div style={{ ...styles.inputGroup, gridColumn: gridSpan === 2 ? '1 / -1' : 'auto' }}>
      <label htmlFor={name} style={styles.label}>{label} {required && '*'}</label>
      <input
        type={type} id={name} name={name}
        value={formData[name]} onChange={handleInputChange}
        style={styles.input} placeholder={placeholder}
        aria-invalid={errors[name] ? "true" : "false"}
      />
      {errors[name] && <span style={styles.errorText}>{errors[name]}</span>}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header & Accessibility */}
        <div style={styles.brandingHeader}>
          <div><span style={{fontSize:'1.5rem'}}>🏥</span> <h1 style={{...styles.brandName, display:'inline'}}>MediConnect</h1></div>
          <div role="group" aria-label="Accessibility options">
            <button style={styles.accessBtn(highContrast)} onClick={() => setHighContrast(!highContrast)} aria-pressed={highContrast}>{highContrast ? '🌄 Normal' : '👁️‍🗨️ Contrast'}</button>
            <button style={styles.accessBtn(largeText)} onClick={() => setLargeText(!largeText)} aria-pressed={largeText}>{largeText ? '🔠 Normal' : '🔠 Large Text'}</button>
          </div>
        </div>

        <main style={styles.card}>
          <h2 style={{textAlign:'center', marginBottom:'20px'}}>Create {role === 'patient' ? 'Patient' : 'Hospital'} Account</h2>

          {/* Read-Only Role Slider */}
          <div style={styles.sliderContainer} role="group" aria-label="Selected User Role" aria-disabled="true">
            <div style={styles.sliderIndicator}></div>
            <div style={styles.sliderLabel(role === 'patient')}><span>👤</span> Patient</div>
            <div style={styles.sliderLabel(role === 'hospital')}><span>🏥</span> Hospital</div>
          </div>

          <form onSubmit={handleSignup} noValidate>
            <div style={styles.formGrid}>
                {/* --- Common Fields Core --- */}
                {renderField('fullName', role === 'hospital' ? 'Admin Full Name' : 'Full Name', 'text', true, 2)}
                {renderField('email', 'Email Address', 'email', true)}
                {renderField('phone', 'Phone Number', 'tel', true, 1, '10 digits')}
                
                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Password *</label>
                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} style={styles.input} placeholder="Min 8 chars" />
                    {errors.password && <span style={styles.errorText}>{errors.password}</span>}
                </div>
                <div style={styles.inputGroup}>
                   <label htmlFor="confirmPassword" style={styles.label}>Confirm Password *</label>
                   <input type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} style={styles.input} />
                   <label style={{fontSize: '0.8em', marginTop:'5px', display:'flex', alignItems:'center'}}><input type="checkbox" onChange={() => setShowPassword(!showPassword)}/> Show Passwords</label>
                   {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
                </div>

                {/* --- Role Specific Fields --- */}
                {role === 'patient' && (
                    <>
                        <h4 style={styles.sectionHeader}>Patient Details</h4>
                        {renderField('dob', 'Date of Birth', 'date')}
                        <div style={styles.inputGroup}>
                            <label htmlFor="gender" style={styles.label}>Gender *</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} style={styles.input}>
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span style={styles.errorText}>{errors.gender}</span>}
                        </div>
                        {renderField('address', 'Full Address', 'text', true, 2)}
                        
                        <h4 style={styles.sectionHeader}>Emergency Contact</h4>
                        {renderField('emergencyName', 'Contact Name')}
                        {renderField('emergencyPhone', 'Contact Phone', 'tel')}

                        <h4 style={styles.sectionHeader}>Medical History (Optional)</h4>
                        {renderField('medicalConditions', 'Existing Conditions', 'text', false, 2)}
                        {renderField('allergies', 'Allergies', 'text', false, 2)}
                    </>
                )}

                {role === 'hospital' && (
                    <>
                        <h4 style={styles.sectionHeader}>Hospital Details</h4>
                        {renderField('hospitalName', 'Official Hospital Name', 'text', true, 2)}
                        {renderField('hospitalLocation', 'Full Address/Location', 'text', true, 2)}
                        {renderField('hospitalContact', 'General Hospital Contact #', 'tel')}
                        {renderField('bedCapacity', 'Total ER Bed Capacity', 'number')}
                        {renderField('specialties', 'Specialties Offered (Comma separated)', 'text', true, 2, 'e.g., Cardiology, Trauma, Pediatrics')}
                    </>
                )}

                 {/* --- Optional Financials (Common) --- */}
                <h4 style={styles.sectionHeader}>Insurance & Payment (Optional)</h4>
                {renderField('insuranceProvider', 'Insurance Provider', 'text', false)}
                {renderField('policyNumber', 'Policy Number', 'text', false)}
                {renderField('paymentMethod', 'Preferred Payment Method', 'text', false, 2)}

                 {/* --- Consents --- */}
                <h4 style={styles.sectionHeader}>Consents</h4>
                <div style={{...styles.inputGroup, gridColumn: '1 / -1'}}>
                    <label style={styles.checkboxLabel}>
                        <input type="checkbox" name="consentPrivacy" checked={formData.consentPrivacy} onChange={handleCheckboxChange} />
                        I agree to the Privacy Policy. *
                    </label>
                    {errors.consentPrivacy && <span style={styles.errorText}>{errors.consentPrivacy}</span>}

                    <label style={{...styles.checkboxLabel, marginTop: '10px'}}>
                        <input type="checkbox" name="consentTreatment" checked={formData.consentTreatment} onChange={handleCheckboxChange} />
                        I consent to emergency medical treatment coordination. *
                    </label>
                    {errors.consentTreatment && <span style={styles.errorText}>{errors.consentTreatment}</span>}
                </div>
            </div>

            <button type="submit" style={styles.signupBtn} disabled={!isFormValid} aria-disabled={!isFormValid}>
                Sign Up
            </button>

            <div style={{textAlign: 'center', marginTop: '20px'}}>
                Already have an account? <Link to={`/login?role=${role}`} style={styles.link}>Login here.</Link>
            </div>
          </form>
           <div style={{textAlign: 'center', marginTop: '20px'}}>
            <Link to="/" style={styles.link}>← Back to Home</Link>
          </div>
        </main>
      </div>

      <footer style={styles.footer}>
        <Link to="/privacy" style={{color: mutedColor, textDecoration:'none'}}>Privacy Policy</Link> | 
        <Link to="/terms" style={{color: mutedColor, textDecoration:'none'}}>Terms of Service</Link> | 
        <Link to="/contact" style={{color: mutedColor, textDecoration:'none'}}>Contact Us</Link>
      </footer>
    </div>
  );
};

export default SignupPage;