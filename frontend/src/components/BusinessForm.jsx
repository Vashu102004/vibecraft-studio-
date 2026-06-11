import React from 'react';
import { ArrowRight, ArrowLeft, Store, Calendar, Palette } from 'lucide-react';

export default function BusinessForm({ formData, setFormData, onNext, onBack }) {
  const categories = ['Retail', 'Fashion', 'Electronics', 'Grocery', 'Restaurant', 'Auto Parts', 'Beauty', 'Pharmacy'];
  const festivals = ['Diwali', 'Holi', 'Eid', 'Christmas', 'Independence Day', 'Monsoon Sale', 'New Year'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.businessName && formData.category && formData.festival) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 relative z-10">
      <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about your business</h2>
        <p className="text-gray-400 mb-8 text-sm">Our AI will generate the perfect marketing assets based on these details.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div>
            <label className="flex items-center text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              <Store className="w-4 h-4 mr-2 text-cyan-400" /> Business Name
            </label>
            <input 
              type="text" 
              placeholder="e.g. Maa Rewa Auto Parts"
              value={formData.businessName} 
              onChange={(e) => setFormData({...formData, businessName: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
              required 
            />
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              <Store className="w-4 h-4 mr-2 text-purple-400" /> Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${formData.category === cat ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Festival / Theme */}
          <div>
            <label className="flex items-center text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4 mr-2 text-emerald-400" /> Campaign Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {festivals.map(fest => (
                <button
                  key={fest}
                  type="button"
                  onClick={() => setFormData({...formData, festival: fest})}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${formData.festival === fest ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                  {fest}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="flex items-center text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              <Palette className="w-4 h-4 mr-2 text-rose-400" /> Primary Brand Color
            </label>
            <div className="flex items-center space-x-4 bg-black/50 border border-white/10 rounded-xl p-3">
              <input 
                type="color" 
                value={formData.primaryColor} 
                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})} 
                className="w-12 h-12 rounded cursor-pointer bg-transparent border-none p-0" 
              />
              <div className="flex-1">
                <input 
                  type="text" 
                  value={formData.primaryColor} 
                  onChange={(e) => setFormData({...formData, primaryColor: e.target.value})} 
                  className="w-full bg-transparent border-none text-white font-mono text-sm focus:outline-none uppercase" 
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-white/10">
            <button 
              type="button" 
              onClick={onBack}
              className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <button 
              type="submit"
              disabled={!formData.businessName || !formData.category || !formData.festival}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center shadow-lg shadow-cyan-500/20"
            >
              Generate Magic <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
