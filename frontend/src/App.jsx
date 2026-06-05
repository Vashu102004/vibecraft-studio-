import React, { useState } from 'react';

export default function App() {
  // UI State Management
  const [businessName, setBusinessName] = useState('Maa Rewa Auto Parts');
  const [eventType, setEventType] = useState('Diwali Dhamaka Offer');
  const [primaryColor, setPrimaryColor] = useState('#ff9800');
  const [loading, setLoading] = useState(false);

  // VibeCraft Core Mock Engine (Same as Backend Logic)
  const [output, setOutput] = useState({
    brandVoice: 'Trustworthy, heavy-duty, customer-first, locally grounded.',
    regionalVibe: 'Perfect for central Indian commercial hubs like Indore.',
    caption: `Shubh Diwali Dhamaka Offer Alert!\n\nApne business ko dijiye ek naya bharosa! Maa Rewa Auto Parts lekar aaya hai special offers aap sabhi ke liye. \n\n100% Genuine & Reliable Quality.\n\nAaj hi visit karein!`,
    htmlTemplate: `
<div style="font-family: 'Segoe UI', system-ui, sans-serif; padding: 35px; background: #ffffff; border-radius: 20px; text-align: center; max-width: 450px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 2px solid #f0f0f0; margin: auto;">
  <div style="height: 8px; background: linear-gradient(90deg, #ff9800, #ffeb3b); margin: -35px -35px 25px -35px; border-radius: 20px 20px 0 0;"></div>
  <h2 style="color: #1a1a1a; font-size: 26px; margin-bottom: 5px; font-weight: 800;">Maa Rewa Auto Parts</h2>
  <span style="font-size: 11px; text-transform: uppercase; color: #ff9800; font-weight: bold; letter-spacing: 2px; display: block; margin-bottom: 25px;">Perfect for central Indian commercial hubs like Indore.</span>
  <div style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%); padding: 30px 20px; border-radius: 16px; margin-bottom: 25px; border: 1px solid #eef2f3;">
    <h3 style="color: #ff9800; font-size: 24px; margin: 0 0 12px 0; font-weight: 700;">Diwali Dhamaka Offer</h3>
    <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0;">Experience premium tailored solution and exclusive discounts on our trusted catalog items.</p>
  </div>
  <div style="display: inline-block; background: #ff9800; color: #ffffff; padding: 14px 36px; font-size: 14px; font-weight: 700; border-radius: 50px; text-transform: uppercase;">Claim Offer Now</div>
</div>`
  });

  // Handle Dynamic Generation Trigger
  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);

    // Dynamic generation simulation
    setTimeout(() => {
      let voice = 'Energetic, festive, welcoming, premium community feel.';
      let vibe = 'Tailored for local high-street retail setups.';
      
      if (businessName.toLowerCase().includes('parts') || businessName.toLowerCase().includes('auto')) {
        voice = 'Trustworthy, heavy-duty, customer-first, locally grounded.';
        vibe = 'Perfect for central Indian commercial hubs like Indore.';
      }

      const isFestive = eventType.toLowerCase().includes('diwali') || eventType.toLowerCase().includes('fest') || eventType.toLowerCase().includes('offer');
      const captionText = isFestive
        ? `Shubh ${eventType} Alert!\n\nApne business ko dijiye ek naya bharosa! ${businessName} lekar aaya hai special offers aap sabhi ke liye. \n\n100% Genuine & Reliable Quality.\n\nAaj hi visit karein!`
        : `Mega Celebration Deal!\n\nGreat news from ${businessName}! We are launching our mega ${eventType} just for you.\n\nLimited Time Offer! Don't miss out.`;

      const templateHtml = `
<div style="font-family: 'Segoe UI', system-ui, sans-serif; padding: 35px; background: #ffffff; border-radius: 20px; text-align: center; max-width: 450px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 2px solid #f0f0f0; margin: auto;">
  <div style="height: 8px; background: linear-gradient(90deg, ${primaryColor}, #ffeb3b); margin: -35px -35px 25px -35px; border-radius: 20px 20px 0 0;"></div>
  <h2 style="color: #1a1a1a; font-size: 26px; margin-bottom: 5px; font-weight: 800;">${businessName}</h2>
  <span style="font-size: 11px; text-transform: uppercase; color: ${primaryColor}; font-weight: bold; letter-spacing: 2px; display: block; margin-bottom: 25px;">${vibe}</span>
  <div style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%); padding: 30px 20px; border-radius: 16px; margin-bottom: 25px; border: 1px solid #eef2f3;">
    <h3 style="color: ${primaryColor}; font-size: 24px; margin: 0 0 12px 0; font-weight: 700; text-transform: capitalize;">${eventType}</h3>
    <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0;">Experience premium tailored solution and exclusive discounts on our trusted catalog items.</p>
  </div>
  <div style="display: inline-block; background: ${primaryColor}; color: #ffffff; padding: 14px 36px; font-size: 14px; font-weight: 700; border-radius: 50px; text-transform: uppercase;">Claim Offer Now</div>
</div>`;

      setOutput({ brandVoice: voice, regionalVibe: vibe, caption: captionText, htmlTemplate: templateHtml });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Premium Glassmorphic Header */}
      <header className="border-b border-gray-800 bg-[#0f172a]/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-sm">V</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">VibeCraft Studio</h1>
            <p className="text-[10px] text-indigo-400 font-semibold tracking-widest uppercase">Creative Apps Ad-Layer</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-medium text-gray-400 tracking-wider">MCP Foundry IQ Active</span>
        </div>
      </header>

      {/* Main Studio Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Side: Parameters Form Panel */}
        <section className="lg:col-span-4 bg-[#111827]/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Business / Brand Name</label>
              <input 
                type="text" 
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-[#1f2937]/50 border border-gray-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-gray-500"
                placeholder="e.g. Maa Rewa Auto Parts"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Campaign / Event Theme</label>
              <input 
                type="text" 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-[#1f2937]/50 border border-gray-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-gray-500"
                placeholder="e.g. Diwali Dhamaka, Monsoon Sale"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Brand Identity Color</label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-12 bg-transparent border-0 cursor-pointer rounded"
                />
                <input 
                  type="text" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="bg-[#1f2937]/50 border border-gray-700/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-gray-300 font-mono"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="border-2 border-white/30 border-t-white h-4 w-4 rounded-full animate-spin"></span>
              ) : (
                <span>Generate Creative Layer</span>
              )}
            </button>
          </form>

          {/* Core Grounding Metadata Monitor */}
          <div className="mt-8 pt-5 border-t border-gray-800/80 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold block">Foundry IQ Metadata Monitor</span>
            <div className="bg-[#030712]/50 rounded-xl p-3 border border-gray-800 text-xs font-mono space-y-2 text-gray-400">
              <p><span className="text-purple-400">brandVoice:</span> "{output.brandVoice}"</p>
              <p><span className="text-purple-400">targetRegion:</span> "{output.regionalVibe}"</p>
            </div>
          </div>
        </section>

        {/* Right Side: Split Previews Container */}
        <section className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
          {/* Ad Copy Pane */}
          <div className="bg-[#111827]/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Grounded Marketing Copy</span>
            <textarea 
              readOnly 
              value={output.caption}
              className="w-full flex-1 bg-[#030712]/40 border border-gray-800 rounded-xl p-4 text-sm text-gray-300 font-sans leading-relaxed resize-none focus:outline-none focus:border-gray-800"
            />
          </div>

          {/* Design Live Canvas Pane */}
          <div className="bg-[#111827]/40 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-sm flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Live Canvas Sandbox Preview</span>
            <div className="w-full flex-1 bg-[#030712]/30 border border-gray-800/60 rounded-xl p-4 flex items-center justify-center overflow-auto">
              <div 
                className="w-full h-full flex items-center justify-center transition-all duration-300 transform scale-95"
                dangerouslySetInnerHTML={{ __html: output.htmlTemplate }} 
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
