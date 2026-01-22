import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HardHat, Briefcase, Mail, Lock, Building, ArrowRight } from 'lucide-react';
import { loginAPI } from '../lib/api'; // Import the API helper we made

// Types for our data
interface Project {
  _id: string;
  projectName: string;
  projectId: string;
  siteLocation: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  
  // State Machine: 'ROLE' -> 'CREDENTIALS' -> 'PROJECT_SELECT'
  const [step, setStep] = useState<'ROLE' | 'CREDENTIALS' | 'PROJECT_SELECT'>('ROLE');
  
  // Form Data
  const [role, setRole] = useState<'supervisor' | 'manager' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Data from Backend
  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call Backend
      const userData = await loginAPI(email, password, role);
      
      // Save Token
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));

      // If user has projects, go to selection screen. If not, maybe show error?
      if (userData.projects && userData.projects.length > 0) {
        setAvailableProjects(userData.projects);
        setStep('PROJECT_SELECT');
      } else {
        setError('No projects assigned to this account.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Project Selection
  const handleProjectSelect = (project: Project) => {
    // Save selected context
    localStorage.setItem('currentProject', JSON.stringify(project));
    
    // Route to Dashboard
    if (role === 'manager') {
      navigate('/manager/dashboard');
    } else {
      navigate('/supervisor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4 font-sans text-[#34495e]">
      <div className="w-full max-w-md">
        
        {/* Title Section */}
        <div className="text-center mb-10">
           <h1 className="text-4xl font-extrabold text-[#34495e]">ConstructPro</h1>
           <p className="text-[#7f8c8d]">Step: {step === 'ROLE' ? 'Role Selection' : step === 'CREDENTIALS' ? 'Login' : 'Select Project'}</p>
        </div>

        <div className="rounded-[2.5rem] bg-[#e0e5ec] p-8 md:p-10 relative"
             style={{ boxShadow: '12px 12px 24px #a3b1c6, -12px -12px 24px #ffffff' }}>
          
          {/* STEP 1: SELECT ROLE */}
          {step === 'ROLE' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold text-center mb-4">Who are you?</h2>
              <button onClick={() => { setRole('supervisor'); setStep('CREDENTIALS'); }}
                className="w-full p-4 rounded-xl bg-[#e0e5ec] flex items-center gap-4 hover:scale-[1.02] transition-all"
                style={{ boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff' }}>
                <div className="bg-[#e67e22] p-3 rounded-lg text-white"><HardHat /></div>
                <div className="text-left"><h3 className="font-bold">Site Supervisor</h3></div>
              </button>

              <button onClick={() => { setRole('manager'); setStep('CREDENTIALS'); }}
                className="w-full p-4 rounded-xl bg-[#e0e5ec] flex items-center gap-4 hover:scale-[1.02] transition-all"
                style={{ boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff' }}>
                <div className="bg-[#34495e] p-3 rounded-lg text-white"><Briefcase /></div>
                <div className="text-left"><h3 className="font-bold">Project Manager</h3></div>
              </button>
            </div>
          )}

          {/* STEP 2: LOGIN FORM */}
          {step === 'CREDENTIALS' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6 animate-in slide-in-from-right">
              <button type="button" onClick={() => setStep('ROLE')} className="text-sm text-gray-500 hover:underline">← Back</button>
              
              {error && <div className="text-red-500 text-center text-sm bg-red-100 p-2 rounded">{error}</div>}

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full pl-12 p-3 rounded-xl bg-[#e0e5ec] outline-none focus:ring-2 ring-orange-200"
                    style={{ boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff' }} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3 text-gray-400" size={20} />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full pl-12 p-3 rounded-xl bg-[#e0e5ec] outline-none focus:ring-2 ring-orange-200"
                    style={{ boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff' }} />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-[#e67e22] text-white font-bold shadow-lg hover:bg-[#d35400] transition-all">
                {loading ? 'Verifying...' : 'Next'}
              </button>
            </form>
          )}

          {/* STEP 3: SELECT PROJECT/SITE */}
          {step === 'PROJECT_SELECT' && (
            <div className="space-y-4 animate-in zoom-in">
              <h2 className="text-xl font-bold text-center mb-2">Select {role === 'manager' ? 'Project' : 'Site'}</h2>
              <p className="text-center text-sm text-gray-500 mb-6">Which workspace are you entering today?</p>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                {availableProjects.map((proj) => (
                  <button key={proj._id} onClick={() => handleProjectSelect(proj)}
                    className="w-full p-4 rounded-xl bg-[#e0e5ec] flex justify-between items-center group hover:bg-gray-200 transition-all"
                    style={{ boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff' }}>
                    <div className="text-left">
                      <div className="font-bold text-[#34495e]">{proj.projectName}</div>
                      <div className="text-xs text-gray-500">ID: {proj.projectId} • {proj.siteLocation}</div>
                    </div>
                    <ArrowRight className="text-gray-400 group-hover:text-[#e67e22]" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default LoginPage;