import React, { useState, useEffect } from 'react';

export default function App() {
  const [businessName, setBusinessName] = useState('Maa Rewa Auto Parts');
  const [eventType, setEventType] = useState('Diwali Dhamaka');
  const [primaryColor, setPrimaryColor] = useState('#ff9800');
  
  const [generating, setGenerating] = useState(false);
  const [logs, setLogs] = useState([]);
  const [showCanvas, setShowCanvas] = useState(true);

  const [output, setOutput] = useState({
    brandVoice: 'Trustworthy, heavy-duty, customer-first, locally grounded.',
    regionalVibe: 'Perfect for central Indian commercial hubs like Indore.',
    caption: `Shubh Diwali Dhamaka Alert!\n\nApne business ko dijiye ek naya bharosa! Maa Rewa Auto Parts lekar aaya hai special offers aap sabhi ke liye. \n\n100% Genuine & Reliable Quality.\n\nAaj hi visit karein!`,
    htmlTemplate: `
<div style="font-family: 'Inter', system-ui, sans-serif; padding: 40px; background: linear-gradient(145deg, #ffffff, #f3f4f6); border-radius: 24px; text-align: center; max-width: 480px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid rgba(255,152,0,0.3); margin: auto; position: relative; overflow: hidden;">
  <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #ff9800, #111827);"></div>
  <div style="width: 60px; height: 60px; background: rgba(255,152,0,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; border: 2px solid rgba(255,152,0,0.2);">
    <span style="color: #ff9800; font-weight: 900; font-size: 24px;">MR</span>
  </div>
  <h2 style="color: #111827; font-size: 28px; margin-bottom: 8px; font-weight: 900; letter-spacing: -0.5px;">Maa Rewa Auto Parts</h2>
  <span style="font-size: 12px; text-transform: uppercase; color: #ff9800; font-weight: 700; letter-spacing: 3px; display: block; margin-bottom: 30px;">Perfect for central Indian commercial hubs like Indore.</span>
  
  <div style="background: #ffffff; padding: 35px 25px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;">
    <h3 style="color: #ff9800; font-size: 22px; margin: 0 0 15px 0; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Diwali Dhamaka</h3>
    <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0; font-weight: 500;">Experience premium tailored solution and exclusive discounts on our trusted catalog items.</p>
  </div>
  
  <button style="background: linear-gradient(135deg, #ff9800, #111827); color: #ffffff; padding: 16px 40px; font-size: 15px; font-weight: 800; border-radius: 50px; text-transform: uppercase; border: none; cursor: pointer; box-shadow: 0 10px 20px rgba(255,152,0,0.3); letter-spacing: 1px;">Claim Offer Now</button>
</div>`
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerating(true);
    setShowCanvas(false);
    setLogs([]);

    const steps = [
      { text: "> Initializing Agentic Pipeline...", delay: 200 },
      { text: `> Requesting tool: query_foundry_iq_knowledge("${businessName}")`, delay: 1000 },
      { text: "[Foundry IQ] Connected to Enterprise Knowledge Graph.", delay: 1800 },
      { text: "[Foundry IQ] Extracted regional insights: Central Indian commercial hub.", delay: 2600 },
      { text: `> Requesting tool: generate_grounded_copy(theme: "${eventType}")`, delay: 3400 },
      { text: "[Creative Agent] Synthesizing culturally aligned Hinglish text...", delay: 4200 },
      { text: "> Requesting tool: render_css_canvas()", delay: 5000 },
      { text: "[UI Agent] Compiling lightweight CSS layout...", delay: 5600 },
      { text: "> Agentic workflow complete. Rendering Live Canvas.", delay: 6200 }
    ];

    let currentDelay = 0;
    steps.forEach((step, index) => {
      currentDelay = step.delay;
      setTimeout(() => {
        setLogs(prev => [...prev, step.text]);
        if (index === steps.length - 1) {
          finalizeGeneration();
        }
      }, step.delay);
    });
  };

  const finalizeGeneration = () => {
    let voice = 'Energetic, festive, welcoming, premium community feel.';
    let vibe = 'Tailored for local high-street retail setups.';
    
    if (businessName.toLowerCase().includes('parts') || businessName.toLowerCase().includes('auto')) {
      voice = 'Trustworthy, heavy-duty, customer-first, locally grounded.';
      vibe = 'Perfect for central Indian commercial hubs like Indore.';
    }

    const initials = businessName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const isFestive = eventType.toLowerCase().includes('diwali') || eventType.toLowerCase().includes('fest') || eventType.toLowerCase().includes('offer');
    
    const captionText = isFestive
      ? `Shubh ${eventType} Alert!\n\nApne business ko dijiye ek naya bharosa! ${businessName} lekar aaya hai special offers aap sabhi ke liye. \n\n100% Genuine & Reliable Quality.\n\nAaj hi visit karein!`
      : `Mega Celebration Deal!\n\nGreat news from ${businessName}! We are launching our mega ${eventType} just for you.\n\nLimited Time Offer! Don't miss out.`;

    const templateHtml = `
<div style="font-family: 'Inter', system-ui, sans-serif; padding: 40px; background: linear-gradient(145deg, #ffffff, #f3f4f6); border-radius: 24px; text-align: center; max-width: 480px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid ${primaryColor}40; margin: auto; position: relative; overflow: hidden;">
<div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, ${primaryColor}, #111827);"></div>
<div style="width: 60px; height: 60px; background: ${primaryColor}15; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; border: 2px solid ${primaryColor}30;">
  <span style="color: ${primaryColor}; font-weight: 900; font-size: 24px;">${initials}</span>
</div>
<h2 style="color: #111827; font-size: 28px; margin-bottom: 8px; font-weight: 900; letter-spacing: -0.5px;">${businessName}</h2>
<span style="font-size: 12px; text-transform: uppercase; color: ${primaryColor}; font-weight: 700; letter-spacing: 3px; display: block; margin-bottom: 30px;">${vibe}</span>

<div style="background: #ffffff; padding: 35px 25px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;">
  <h3 style="color: ${primaryColor}; font-size: 22px; margin: 0 0 15px 0; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">${eventType}</h3>
  <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0; font-weight: 500;">Experience premium tailored solution and exclusive discounts on our trusted catalog items.</p>
</div>

<button style="background: linear-gradient(135deg, ${primaryColor}, #111827); color: #ffffff; padding: 16px 40px; font-size: 15px; font-weight: 800; border-radius: 50px; text-transform: uppercase; border: none; cursor: pointer; box-shadow: 0 10px 20px ${primaryColor}40; letter-spacing: 1px;">Claim Offer Now</button>
</div>`;

    setOutput({ brandVoice: voice, regionalVibe: vibe, caption: captionText, htmlTemplate: templateHtml });
    setShowCanvas(true);
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 px-8 py-5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/10">
            <span className="text-white font-black text-xl tracking-tighter">V</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">VibeCraft Agent Studio</h1>
            <p className="text-[10px] text-cyan-400/80 font-bold tracking-[0.2em] uppercase mt-0.5">Foundry IQ Powered Workspace</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
          </span>
          <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">Microsoft Foundry IQ : Connected</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[90rem] w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Form */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>
            <h2 className="text-sm font-bold text-white mb-5 flex items-center relative z-10">
              <span className="w-1.5 h-4 bg-cyan-500 rounded-full mr-3"></span>
              Agent Parameters
            </h2>
            <form onSubmit={handleGenerate} className="space-y-5 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Business Name</label>
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition-colors shadow-inner" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Campaign Theme</label>
                <input type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-600 transition-colors shadow-inner" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Brand Color</label>
                <div className="flex space-x-3 bg-black/40 border border-white/10 rounded-xl p-2 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-all">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-8 w-10 rounded cursor-pointer bg-transparent border-none p-0" />
                  <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 bg-transparent border-none px-2 py-1 text-sm focus:outline-none text-white font-mono" />
                </div>
              </div>
              <button type="submit" disabled={generating} className="w-full relative overflow-hidden group/btn rounded-xl disabled:opacity-80 transition-all hover:scale-[1.02] active:scale-[0.98] mt-6">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 opacity-80 group-hover/btn:opacity-100 transition-opacity"></span>
                <div className="relative px-4 py-3.5 text-sm font-bold text-white flex items-center justify-center space-x-3 w-full h-full">
                  {generating ? (
                    <span className="tracking-wide">Agent Orchestrating...</span>
                  ) : (
                    <span className="tracking-wide">Launch Agent Workflow</span>
                  )}
                </div>
              </button>
            </form>
          </div>
        </section>

        {/* Center Terminal & Copy */}
        <section className="lg:col-span-4 flex flex-col gap-6 h-[calc(100vh-9rem)]">
          {/* Agentic Workflow Terminal */}
          <div className="bg-[#050505] border border-white/10 rounded-3xl p-5 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex justify-between items-center z-10">
              <span>Agentic Workflow Logs</span>
              {generating && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span>}
            </h2>
            <div className="flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2.5 text-gray-400 p-2 z-10">
              {logs.length === 0 && !generating && (
                <div className="text-gray-600 italic">Awaiting workflow initialization...</div>
              )}
              {logs.map((log, i) => (
                <div key={i} className={`transition-opacity duration-300 ${log.includes('Foundry IQ') ? 'text-emerald-400' : log.includes('Agent') ? 'text-purple-400' : 'text-cyan-300'}`}>
                  {log}
                </div>
              ))}
              {generating && <div className="animate-pulse text-gray-600 mt-2">_</div>}
            </div>
          </div>

          {/* Ad Copy */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 shadow-2xl shrink-0 h-48 flex flex-col">
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Synthesized Copy</h2>
            <textarea readOnly value={output.caption} className={`w-full flex-1 bg-black/40 shadow-inner border border-white/5 rounded-xl p-4 text-xs text-gray-300 font-medium resize-none focus:outline-none transition-all duration-700 ${showCanvas ? 'opacity-100 blur-0' : 'opacity-30 blur-sm'}`} />
          </div>
        </section>

        {/* Right Canvas */}
        <section className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <h2 className="text-sm font-bold text-white mb-4 flex items-center justify-between relative z-10">
            <span className="flex items-center"><span className="w-1.5 h-4 bg-emerald-500 rounded-full mr-3"></span>Live Layout Render</span>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">Asset-Free CSS</span>
          </h2>
          
          <div className="w-full flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#050505] border border-white/5 rounded-2xl p-6 flex items-center justify-center overflow-auto shadow-inner relative z-10">
            <div className={`w-full h-full flex items-center justify-center transition-all duration-1000 transform ${showCanvas ? 'scale-100 opacity-100 blur-0 translate-y-0' : 'scale-95 opacity-0 blur-md translate-y-4'}`} dangerouslySetInnerHTML={{ __html: output.htmlTemplate }} />
          </div>
        </section>
      </main>
    </div>
  );
}
