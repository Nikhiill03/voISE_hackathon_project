import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { userType } = useParams(); // Get userType from URL params
  
  // --- State Management ---
  // Role state determined by URL param
  const [role, setRole] = useState('patient'); 
  
  // Form state
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Accessibility State
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // --- Effects ---

  // 1. Determine Role based on URL parameter
  useEffect(() => {
    if (userType === 'hospital') {
      setRole('hospital');
    } else {
      setRole('patient');
    }
  }, [userType]);

  // 2. Real-time Validation functionality
  useEffect(() => {
    const newErrors = {};
    let valid = true;

    // Basic Email/Phone validation
    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or Phone is required';
      valid = false;
    } else if (formData.emailOrPhone.length < 3) {
       // Very basic check, real app needs regex for email OR phone format
      newErrors.emailOrPhone = 'Input too short';
      valid = false;
    }

    // Basic Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);
  }, [formData]);


  // --- Handlers ---

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Navigate to respective dashboard
      if (userType === 'hospital') {
        navigate('/hospital-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    }
  };

  const onNavigateToHome = () => {
    navigate('/');
  };

  const onNavigateToSignUp = () => {
    navigate(`/signup/${userType}`);
  };


  // --- Dynamic Styling based on Accessibility State ---
  const baseFontSize = largeText ? '18px' : '16px';
  const bgColor = highContrast ? '#000000' : '#f4f6f9';
  const cardColor = highContrast ? '#1a1a1a' : '#ffffff';
  const textColor = highContrast ? '#ffffff' : '#333333';
  const mutedColor = highContrast ? '#aaaaaa' : '#666666';
  const accentColor = highContrast ? '#FFD700' : '#007bff'; // Gold for high contrast, Blue normally
  const errorColor = highContrast ? '#ff9999' : '#dc3545';
  const borderColor = highContrast ? '#555' : '#ddd';

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: textColor,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: baseFontSize,
      transition: 'all 0.3s ease',
    },
    contentWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    // Branding header area including accessibility toggles
    brandingHeader: {
      width: '100%',
      maxWidth: '450px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    brandArea: { textAlign: 'left' },
    brandLogo: { fontSize: '2rem' },
    brandName: { fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: accentColor },
    accessPanel: { display: 'flex', gap: '10px' },
    accessBtn: (active) => ({
      background: active ? accentColor : 'transparent',
      color: active ? (highContrast ? 'black' : 'white') : textColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
      fontSize: '0.8rem',
    }),

    card: {
      backgroundColor: cardColor,
      padding: '40px',
      borderRadius: '15px',
      boxShadow: highContrast ? '0 0 15px rgba(255,255,255,0.1)' : '0 10px 25px rgba(0,0,0,0.05)',
      width: '100%',
      maxWidth: '450px',
      textAlign: 'center',
      border: highContrast ? `1px solid ${borderColor}` : 'none',
    },

    // --- READ-ONLY SLIDER STYLES ---
    sliderContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: highContrast ? '#333' : '#e9ecef',
      borderRadius: '25px',
      padding: '5px',
      marginBottom: '30px',
      position: 'relative',
      height: '50px',
      border: highContrast ? `1px solid ${borderColor}` : 'none',
    },
    // The background "pill" that moves behind the active role
    sliderIndicator: {
      position: 'absolute',
      top: '5px',
      left: role === 'patient' ? '5px' : '50%',
      width: 'calc(50% - 5px)',
      height: '40px',
      backgroundColor: accentColor,
      borderRadius: '20px',
      transition: 'all 0.3s ease-in-out',
      zIndex: 0,
    },
    // The labels on top of the slider
    sliderLabel: (isActive) => ({
      flex: 1,
      textAlign: 'center',
      zIndex: 1,
      fontWeight: '600',
      color: isActive ? (highContrast ? 'black' : 'white') : mutedColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      userSelect: 'none', // Prevent text selection confusing user
    }),

    // --- FORM STYLES ---
    form: { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' },
    inputGroup: { position: 'relative' },
    label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: textColor },
    input: {
      width: '100%',
      padding: '14px',
      borderRadius: '8px',
      border: `1px solid ${borderColor}`,
      backgroundColor: highContrast ? '#000' : '#fff',
      color: textColor,
      fontSize: baseFontSize,
      boxSizing: 'border-box',
    },
    passwordToggleBtn: {
      position: 'absolute',
      right: '10px',
      top: '43px', // Adjust based on label height + padding
      background: 'none',
      border: 'none',
      color: accentColor,
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    errorText: { color: errorColor, fontSize: '0.85rem', marginTop: '5px' },
    
    forgotLinkContainer: { textAlign: 'right', marginTop: '-10px' },
    link: { color: accentColor, textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' },

    loginBtn: {
      padding: '16px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: isFormValid ? accentColor : (highContrast ? '#333' : '#ccc'),
      color: isFormValid ? (highContrast ? 'black' : 'white') : (highContrast ? '#666' : '#666'),
      cursor: isFormValid ? 'pointer' : 'not-allowed',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },

    backHomeContainer: { marginTop: '25px' },
    
    signupContainer: { marginTop: '15px', fontSize: '0.95rem' },
    signupLink: { color: accentColor, textDecoration: 'none', fontWeight: '600', cursor: 'pointer' },

    // --- FOOTER STYLES ---
    footer: {
      padding: '20px',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: mutedColor,
      borderTop: `1px solid ${borderColor}`,
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    footerLink: { color: mutedColor, textDecoration: 'none' }
  };


  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        
        {/* Branding Header & Accessibility Toggles */}
        <div style={styles.brandingHeader}>
          <div style={styles.brandArea}>
            <span style={styles.brandLogo} role="img" aria-label="Logo">🏥</span>
            <h1 style={styles.brandName}>CarePulse</h1>
          </div>
          
          <div style={styles.accessPanel} role="group" aria-label="Accessibility options">
            <button 
              style={styles.accessBtn(highContrast)} 
              onClick={() => setHighContrast(!highContrast)}
              aria-pressed={highContrast}
            >
              {highContrast ? '🌄 Normal' : '👁️‍🗨️ High Contrast'}
            </button>
            <button 
              style={styles.accessBtn(largeText)} 
              onClick={() => setLargeText(!largeText)}
              aria-pressed={largeText}
            >
              {largeText ? '🔠 Normal Text' : '🔠 Large Text'}
            </button>
          </div>
        </div>

        <main style={styles.card}>
          <h2 style={{marginBottom: '25px'}}>Secure Login</h2>

          {/* Read-Only User Type Slider */}
          <div 
            style={styles.sliderContainer} 
            role="group" 
            aria-label="Selected User Role"
            aria-disabled="true" // Indicates it's not interactive
          >
            {/* The moving background indicator */}
            <div style={styles.sliderIndicator}></div>

            {/* Patient Label */}
            <div style={styles.sliderLabel(role === 'patient')}>
              <span>👤</span> Patient
            </div>
            
            {/* Hospital Label */}
            <div style={styles.sliderLabel(role === 'hospital')}>
              <span>🏥</span> Hospital
            </div>
          </div>


          {/* Login Form */}
          <form style={styles.form} onSubmit={handleLogin} noValidate>
            {/* Email/Phone Input */}
            <div style={styles.inputGroup}>
              <label htmlFor="emailOrPhone" style={styles.label}>
                Email or Phone
              </label>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                style={styles.input}
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder="Enter your email or phone number"
                required
                aria-invalid={errors.emailOrPhone ? "true" : "false"}
                aria-describedby={errors.emailOrPhone ? "emailError" : undefined}
              />
              {errors.emailOrPhone && <div id="emailError" style={styles.errorText}>{errors.emailOrPhone}</div>}
            </div>

            {/* Password Input */}
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                style={styles.input}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "passError" : undefined}
              />
              <button 
                type="button"
                style={styles.passwordToggleBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && <div id="passError" style={styles.errorText}>{errors.password}</div>}
            </div>

            {/* Forgot Password Link */}
            <div style={styles.forgotLinkContainer}>
              <Link to="/forgot-password" style={styles.link}>Forgot your password?</Link>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              style={styles.loginBtn} 
              disabled={!isFormValid}
              aria-disabled={!isFormValid}
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div style={styles.signupContainer}>
            <span style={{ color: textColor }}>Don't have an account? </span>
            <span onClick={onNavigateToSignUp} style={styles.signupLink}>
              Sign up here
            </span>
          </div>

          {/* Back to Home */}
          <div style={styles.backHomeContainer}>
            <span onClick={onNavigateToHome} style={{...styles.link, cursor: 'pointer'}}>
              ← Back to Home
            </span>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
        <span>|</span>
        <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
        <span>|</span>
        <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
      </footer>
    </div>
  );
};

export default LoginPage;