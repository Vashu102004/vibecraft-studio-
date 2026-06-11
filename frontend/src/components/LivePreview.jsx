import React, { useEffect, useState } from 'react';
import { ArrowLeft, Share2, Copy, Download, RefreshCw, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LivePreview({ formData, onBack }) {
  const [loading, setLoading] = useState(true);
  const [copyData, setCopyData] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate AI generation delay
    setLoading(true);
    const timer = setTimeout(() => {
      generateContent();
      setLoading(false);
      triggerConfetti();
    }, 2500);
    return () => clearTimeout(timer);
  }, [formData]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: [formData.primaryColor, '#ffffff', '#06b6d4', '#f59e0b']
    });
  };

  const generateContent = () => {
    const { businessName, category, festival, primaryColor } = formData;
    
    // Hinglish copy generation
    let caption = `🎉 Shubh ${festival} Alert from ${businessName}!\n\n`;
    caption += `Is ${festival} ke tyohar par, hum lekar aaye hain sabse shandar deals aapke liye! Aapko milega premium ${category.toLowerCase()} products aur best services.\n\n`;
    caption += `✨ Special Festive Offer chalu hai. Aaj hi visit karein aur discount ka fayda uthayen!\n\n`;
    caption += `#${festival.replace(/ /g, '')} #${businessName.replace(/ /g, '')} #Offers #Deals`;
    
    setCopyData(caption);

    // Dynamic Theme Configuration based on Festival
    let bgGradient = `linear-gradient(145deg, #1e1b4b, #0f172a)`; // Default Dark
    let cartoonText = "✨";
    let accentColor = primaryColor;
    let floatAnimation = "";

    switch (festival) {
      case 'Diwali':
        bgGradient = `linear-gradient(145deg, #2e1065, #000000)`;
        cartoonText = `<div style="font-size: 50px; text-shadow: 0 0 20px #f59e0b;">🪔 🎇</div>`;
        break;
      case 'Holi':
        bgGradient = `linear-gradient(145deg, #312e81, #0f172a)`;
        cartoonText = `<div style="font-size: 50px;">👦🎨 💦</div>`;
        accentColor = '#ec4899'; // Pinkish for holi
        break;
      case 'Independence Day':
        bgGradient = `linear-gradient(145deg, #064e3b, #0f172a)`;
        cartoonText = `<div style="font-size: 50px;">🇮🇳 🕊️</div>`;
        accentColor = '#f97316'; // Orange
        break;
      case 'Eid':
        bgGradient = `linear-gradient(145deg, #064e3b, #022c22)`;
        cartoonText = `<div style="font-size: 50px; text-shadow: 0 0 20px #fef08a;">🌙 ✨</div>`;
        accentColor = '#10b981';
        break;
      case 'Christmas':
        bgGradient = `linear-gradient(145deg, #7f1d1d, #020617)`;
        cartoonText = `<div style="font-size: 50px;">🎅 🎄 ❄️</div>`;
        accentColor = '#ef4444';
        break;
      case 'New Year':
        bgGradient = `linear-gradient(145deg, #000000, #1e1e1e)`;
        cartoonText = `<div style="font-size: 50px; text-shadow: 0 0 20px #fef08a;">🎆 🥂</div>`;
        accentColor = '#fbbf24';
        break;
      case 'Monsoon Sale':
        bgGradient = `linear-gradient(145deg, #1e3a8a, #0f172a)`;
        cartoonText = `<div style="font-size: 50px;">🌧️ ☔ ⚡</div>`;
        accentColor = '#3b82f6';
        break;
      default:
        bgGradient = `linear-gradient(145deg, #1e293b, #020617)`;
        cartoonText = `<div style="font-size: 50px;">🎉 🎁</div>`;
    }

    // HTML/CSS Template
    const template = `
<div style="font-family: 'Inter', system-ui, sans-serif; padding: 40px 20px; background: ${bgGradient}; border-radius: 24px; text-align: center; max-width: 400px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid ${accentColor}40; margin: auto; position: relative; overflow: hidden; color: #ffffff;">
  
  <!-- Glowing Background Effects -->
  <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, ${accentColor}30 0%, transparent 60%); pointer-events: none;"></div>
  
  <!-- Top Accent Bar -->
  <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, ${accentColor}, #ffffff, ${accentColor});"></div>
  
  <!-- Logo Initial -->
  <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px auto; border: 2px solid ${accentColor}; box-shadow: 0 0 20px ${accentColor}50; position: relative; z-index: 10;">
    <span style="color: #ffffff; font-weight: 900; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${businessName.charAt(0).toUpperCase()}</span>
  </div>
  
  <h2 style="color: #ffffff; font-size: 26px; margin: 0 0 4px 0; font-weight: 900; letter-spacing: -0.5px; position: relative; z-index: 10; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${businessName}</h2>
  <span style="font-size: 11px; text-transform: uppercase; color: ${accentColor}; font-weight: 800; letter-spacing: 2px; display: block; margin-bottom: 25px; position: relative; z-index: 10;">Premium ${category}</span>
  
  <!-- Cartoon/Graphic Element -->
  <div style="margin-bottom: 10px; position: relative; z-index: 10; animation: bounce 2s infinite;">
    ${cartoonText}
  </div>

  <!-- Festival Box -->
  <div style="background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); padding: 25px 20px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 30px -10px #000; border: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 10;">
    <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: linear-gradient(90deg, ${accentColor}, #ffffff); color: #000; padding: 4px 16px; border-radius: 20px; font-size: 11px; font-weight: 900; letter-spacing: 1px; box-shadow: 0 4px 15px ${accentColor}60;">
      MEGA EVENT
    </div>
    <h3 style="color: #ffffff; font-size: 24px; margin: 15px 0 10px 0; font-weight: 900; text-transform: uppercase; text-shadow: 0 2px 5px rgba(0,0,0,0.8);">${festival} WISHES</h3>
    <p style="color: #d1d5db; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 500;">
      Celebrate with us and enjoy exclusive discounts on all our premium products!
    </p>
  </div>
  
  <button style="background: linear-gradient(135deg, ${accentColor}, #ffffff); color: #000000; padding: 16px 40px; font-size: 14px; font-weight: 900; border-radius: 50px; text-transform: uppercase; border: none; cursor: pointer; box-shadow: 0 10px 20px ${accentColor}60; letter-spacing: 1px; width: 100%; position: relative; z-index: 10; transition: transform 0.2s;">
    Grab Offer Now
  </button>
</div>`;
    setHtmlContent(template);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(copyData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(copyData);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-4 border-blue-500 rounded-full animate-spin opacity-80" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-4 border-t-4 border-purple-500 rounded-full animate-spin opacity-60" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Adding cartoon magic...</h3>
        <p className="text-gray-400 text-sm">Synthesizing dark theme & festive graphics</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Your Animated Dark Assets</h2>
          <p className="text-gray-400">Ready to publish! Share directly to your customers.</p>
        </div>
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl text-sm font-bold bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Redesign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2 text-purple-400" /> Hinglish Copy
            </h3>
            
            <textarea 
              readOnly 
              value={copyData} 
              className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-300 font-medium resize-none focus:outline-none mb-4 shadow-inner"
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleCopyText}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-white transition-colors flex items-center justify-center text-sm"
              >
                {copied ? <span className="text-emerald-400">Copied!</span> : <><Copy className="w-4 h-4 mr-2" /> Copy Text</>}
              </button>
              <button 
                onClick={shareOnWhatsApp}
                className="flex-1 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition-colors flex items-center justify-center text-sm shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <Share2 className="w-4 h-4 mr-2" /> WhatsApp
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h4 className="text-white font-bold text-sm">Need the HTML code?</h4>
              <p className="text-gray-400 text-xs mt-1">Export banner to embed on your website.</p>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(htmlContent)}
              className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors"
              title="Copy HTML Source"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Render */}
        <div className="lg:col-span-7 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#050505] border border-white/10 rounded-3xl p-8 flex items-center justify-center relative overflow-hidden shadow-2xl">
          {/* Subtle background glow matching brand color */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ backgroundColor: formData.primaryColor }}
          ></div>
          
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg flex items-center space-x-2 z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Live Preview</span>
          </div>

          {/* Rendered HTML Container */}
          <div className="w-full h-full flex items-center justify-center z-10 p-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}
