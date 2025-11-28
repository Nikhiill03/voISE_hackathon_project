import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Building2, Siren, Moon, Sun, Type, X } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const cycleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('normal');
  };

  const handleRoleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  const handleEmergency = () => {
    setShowEmergencyModal(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      highContrast 
        ? 'bg-slate-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-pink-50'
    }`}>
      {/* Accessibility Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`p-2.5 rounded-lg shadow-lg transition-all ${
            highContrast 
              ? 'bg-indigo-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
          aria-label="Toggle high contrast mode"
        >
          {highContrast ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={cycleTextSize}
          className={`p-2.5 rounded-lg shadow-lg transition-all ${
            highContrast 
              ? 'bg-indigo-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
          aria-label="Cycle text size"
        >
          <Type size={20} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo & Name */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 ${
            highContrast ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-rose-500 to-pink-600'
          } shadow-xl`}>
            <Heart className="text-white" size={40} fill="white" />
          </div>
          <h1 className={`font-bold mb-4 ${
            textSize === 'xlarge' ? 'text-5xl' : textSize === 'large' ? 'text-4xl' : 'text-3xl'
          } ${
            highContrast ? 'text-white' : 'bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent'
          }`}>
            CarePulse
          </h1>
          <p className={`${
            textSize === 'xlarge' ? 'text-xl' : textSize === 'large' ? 'text-lg' : 'text-base'
          } ${
            highContrast ? 'text-slate-200' : 'text-gray-700'
          } max-w-lg mx-auto leading-relaxed`}>
            Connect with hospitals instantly in emergencies. Find the nearest hospital and get help fast.
          </p>
        </div>

        {/* Role Selection Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mb-8 w-full max-w-lg">
          <button
            onClick={() => handleRoleSelect('patient')}
            className={`flex-1 flex items-center justify-center gap-3 py-5 px-6 rounded-xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 ${
              textSize === 'xlarge' ? 'text-xl' : textSize === 'large' ? 'text-lg' : 'text-base'
            } ${
              highContrast
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
            }`}
          >
            <Heart size={textSize === 'xlarge' ? 32 : textSize === 'large' ? 28 : 24} />
            <span className="font-semibold">Patient</span>
          </button>

          <button
            onClick={() => handleRoleSelect('hospital')}
            className={`flex-1 flex items-center justify-center gap-3 py-5 px-6 rounded-xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 ${
              textSize === 'xlarge' ? 'text-xl' : textSize === 'large' ? 'text-lg' : 'text-base'
            } ${
              highContrast
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
            }`}
          >
            <Building2 size={textSize === 'xlarge' ? 32 : textSize === 'large' ? 28 : 24} />
            <span className="font-semibold">Hospital</span>
          </button>
        </div>

        {/* Emergency Button */}
        <button
          onClick={handleEmergency}
          className={`w-full max-w-lg py-5 px-6 rounded-xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 ${
            textSize === 'xlarge' ? 'text-xl' : textSize === 'large' ? 'text-lg' : 'text-base'
          } ${
            highContrast
              ? 'bg-red-600 text-white hover:bg-red-500'
              : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700'
          }`}
        >
          <Siren size={textSize === 'xlarge' ? 32 : textSize === 'large' ? 28 : 24} />
          <span className="font-bold">Emergency Help</span>
        </button>
      </main>

      {/* Footer */}
      <footer className={`py-4 px-4 border-t ${
        highContrast 
          ? 'border-slate-700 bg-slate-900' 
          : 'border-gray-200 bg-white/80 backdrop-blur-sm'
      }`}>
        <div className={`max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 ${
          textSize === 'xlarge' ? 'text-base' : textSize === 'large' ? 'text-sm' : 'text-xs'
        }`}>
          <div className="flex gap-4 flex-wrap justify-center">
            <button 
              onClick={() => alert('Privacy Policy')}
              className={`transition-colors ${
                highContrast 
                  ? 'text-slate-300 hover:text-white' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => alert('Terms of Service')}
              className={`transition-colors ${
                highContrast 
                  ? 'text-slate-300 hover:text-white' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Terms of Service
            </button>
            <button 
              onClick={() => alert('Contact Us')}
              className={`transition-colors ${
                highContrast 
                  ? 'text-slate-300 hover:text-white' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Contact Us
            </button>
          </div>
          <p className={highContrast ? 'text-slate-400' : 'text-gray-500'}>
            © 2024 CarePulse. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className={`rounded-2xl p-6 max-w-md w-full shadow-2xl ${
            highContrast ? 'bg-slate-800 border-2 border-red-500' : 'bg-white'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className={`font-bold ${
                textSize === 'xlarge' ? 'text-3xl' : textSize === 'large' ? 'text-2xl' : 'text-xl'
              } ${
                highContrast ? 'text-red-400' : 'text-red-600'
              }`}>
                Emergency Help
              </h2>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className={`p-1 rounded-lg transition-colors ${
                  highContrast ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <X size={24} />
              </button>
            </div>
            <p className={`mb-5 ${
              textSize === 'xlarge' ? 'text-lg' : textSize === 'large' ? 'text-base' : 'text-sm'
            } ${
              highContrast ? 'text-slate-300' : 'text-gray-600'
            }`}>
              Choose emergency service:
            </p>
            <div className="space-y-3">
              <button className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all hover:shadow-lg ${
                textSize === 'xlarge' ? 'text-lg' : textSize === 'large' ? 'text-base' : 'text-sm'
              } ${
                highContrast
                  ? 'bg-red-600 text-white hover:bg-red-500'
                  : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700'
              }`}>
                Call Ambulance
              </button>
              <button className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all hover:shadow-lg ${
                textSize === 'xlarge' ? 'text-lg' : textSize === 'large' ? 'text-base' : 'text-sm'
              } ${
                highContrast
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
              }`}>
                Find Nearest Hospital
              </button>
              <button className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all hover:shadow-lg ${
                textSize === 'xlarge' ? 'text-lg' : textSize === 'large' ? 'text-base' : 'text-sm'
              } ${
                highContrast
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
              }`}>
                Emergency Contacts
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}