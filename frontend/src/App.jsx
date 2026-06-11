import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import BusinessForm from './components/BusinessForm';
import LivePreview from './components/LivePreview';
import { Layers, Home, ArrowLeft } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: 'Maa Rewa Auto Parts',
    category: 'Retail',
    festival: 'Diwali',
    primaryColor: '#0ea5e9'
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Dynamic Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setStep(1)}>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-white/10">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-white drop-shadow-md">VibeCraft Studio</h1>
            </div>
          </div>
          
          {step > 1 && (
            <div className="hidden sm:flex items-center space-x-2 border-l border-white/10 pl-6">
              <button onClick={() => setStep(step - 1)} className="flex items-center px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
              <button onClick={() => setStep(1)} className="flex items-center px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Home className="w-4 h-4 mr-1" /> Home
              </button>
            </div>
          )}
        </div>
        
        {step > 1 && (
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/10'}`}></div>
            <div className={`h-2 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}></div>
            <div className={`h-2 w-12 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-white/10'}`}></div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <div className={`transition-all duration-700 absolute inset-0 ${step === 1 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
          {step === 1 && <HeroSection onStart={() => setStep(2)} />}
        </div>
        
        <div className={`transition-all duration-700 absolute inset-0 pt-10 overflow-y-auto ${step === 2 ? 'opacity-100 translate-x-0 z-10' : step > 2 ? 'opacity-0 -translate-x-full pointer-events-none' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          {step === 2 && (
            <BusinessForm 
              formData={formData} 
              setFormData={setFormData} 
              onNext={() => setStep(3)} 
              onBack={() => setStep(1)} 
            />
          )}
        </div>
        
        <div className={`transition-all duration-700 absolute inset-0 pt-4 overflow-y-auto ${step === 3 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          {step === 3 && (
            <LivePreview 
              formData={formData} 
              onBack={() => setStep(2)} 
            />
          )}
        </div>
      </main>

    </div>
  );
}
