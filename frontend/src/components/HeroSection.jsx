import React from 'react';
import { Sparkles, ArrowRight, Palette, Wand2 } from 'lucide-react';

export default function HeroSection({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-semibold text-cyan-100 tracking-wide uppercase">VibeCraft Studio 2.0</span>
      </div>
      <div className="bg-white/95 backdrop-blur-xl px-8 py-10 md:px-12 md:py-12 rounded-[2.5rem] shadow-[0_0_60px_rgba(255,255,255,0.15)] border border-white mb-10 max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-black via-blue-950 to-gray-800 drop-shadow-sm">
          AI-Powered Marketing <br className="hidden md:block" /> for Local Brands
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-semibold">
          Turn your business name into high-converting, culturally grounded marketing banners and Hinglish copy in seconds. No design skills needed.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 font-sans rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] focus:outline-none overflow-hidden"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center space-x-2">
            <span>Start Creating Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto w-full z-10">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm text-left">
          <Palette className="w-8 h-8 text-cyan-400 mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">Festival Templates</h3>
          <p className="text-gray-400 text-sm">Adaptive CSS templates for Diwali, Holi, Eid, and more. Colors automatically match your brand.</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm text-left">
          <Wand2 className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">Hinglish AI Copy</h3>
          <p className="text-gray-400 text-sm">Generates authentic, culturally grounded marketing text tailored for Indian consumers.</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm text-left">
          <svg className="w-8 h-8 text-emerald-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h3 className="text-white font-bold text-lg mb-2">WhatsApp Ready</h3>
          <p className="text-gray-400 text-sm">Export your generated assets directly to WhatsApp with one click to share with your customers.</p>
        </div>
      </div>
    </div>
  );
}
