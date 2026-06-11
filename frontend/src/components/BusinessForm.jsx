import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Store, Calendar, Palette, Briefcase, Loader2 } from 'lucide-react';

export default function BusinessForm({ formData, setFormData, onNext, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const businessNames = [
    '', 'Maa Rewa Auto Parts', 'Sharma Sweets & Namkeen', 'Verma Electronics', 'Gupta General Store', 'Royal Fashion Hub',
    'Shri Ram Cloth Market', 'Balaji Mobile Shop', 'Lakshmi Jewellers', 'Aggarwal Pharmacy', 'Yadav Dairy & Sweets',
    'Krishna Textiles', 'New Bharat Traders', 'Singh Hardware Store', 'Jain Book Depot', 'Patel Grocery Mart',
    'Arora Beauty Parlour', 'Chaudhary Tyres', 'Mishra Book Stall', 'Khandelwal Steel Traders', 'Sai Baba Gift Centre'
  ];

  const categories = [
    '', 'Retail', 'Fashion', 'Electronics', 'Grocery', 'Restaurant', 'Auto Parts', 'Beauty', 'Pharmacy',
    'Hardware', 'Jewellery', 'Books & Stationery', 'Footwear', 'Mobile & Accessories', 'Dairy Products', 'Sweets & Bakery',
    'Toys & Gifts', 'Furniture', 'Cosmetics', 'Sports Goods', 'Eyewear'
  ];

  const festivals = ['Diwali', 'Holi', 'Eid', 'Navratri', 'RakshaBandhan', 'GaneshChaturthi', 'Christmas', 'NewYear', 'IndependenceDay', 'MakarSankranti', 'KarwaChauth', 'Janmashtami'];

  const colorPalettes = [
    { name: 'Ocean Blue', hex: '#0ea5e9' },
    { name: 'Midnight Blue', hex: '#191970' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Forest Green', hex: '#228b22' },
    { name: 'Sunset Orange', hex: '#f97316' },
    { name: 'Royal Purple', hex: '#7e22ce' },
    { name: 'Magenta Pink', hex: '#d946ef' },
    { name: 'Crimson Red', hex: '#dc2626' },
    { name: 'Gold Rush', hex: '#fbbf24' },
    { name: 'Sunflower Yellow', hex: '#eab308' },
    { name: 'Teal Breeze', hex: '#14b8a6' },
    { name: 'Cyberpunk Neon', hex: '#ec4899' },
    { name: 'Lavender Mist', hex: '#a855f7' },
    { name: 'Coral Reef', hex: '#f43f5e' },
    { name: 'Indigo Night', hex: '#4f46e5' },
    { name: 'Mint Fresh', hex: '#34d399' },
    { name: 'Ruby Red', hex: '#9f1239' },
    { name: 'Sapphire Blue', hex: '#1d4ed8' },
    { name: 'Tangerine Dream', hex: '#ea580c' },
    { name: 'Charcoal Black', hex: '#333333' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.category || !formData.festival) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      setFormData({ ...formData, generatedText: data.text });
      onNext();
    } catch (error) {
      console.error(error);
      alert('Backend Error! Ensure the backend is running.');
    } finally {
      setIsLoading(false);
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
            <select 
              value={formData.businessName} 
              onChange={(e) => setFormData({...formData, businessName: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none" 
              required
            >
              <option value="" disabled hidden>-- Select a Business Name --</option>
              {businessNames.filter(name => name !== '').map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4 mr-2 text-purple-400" /> Category
            </label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none" 
              required
            >
              <option value="" disabled hidden>-- Select a Category --</option>
              {categories.filter(cat => cat !== '').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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
              <div 
                className="w-12 h-12 rounded cursor-pointer border border-white/20 shadow-inner" 
                style={{ backgroundColor: formData.primaryColor || '#0ea5e9' }}
              ></div>
              <div className="flex-1">
                <select 
                  value={formData.primaryColor || '#0ea5e9'} 
                  onChange={(e) => setFormData({...formData, primaryColor: e.target.value})} 
                  className="w-full bg-transparent border-none text-white font-medium text-sm focus:outline-none appearance-none cursor-pointer" 
                >
                  {colorPalettes.map(palette => (
                    <option key={palette.hex} value={palette.hex} className="bg-slate-900">
                      {palette.name}
                    </option>
                  ))}
                </select>
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
              disabled={!formData.businessName || !formData.category || !formData.festival || isLoading}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating AI Text...</>
              ) : (
                <>Generate Magic <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
