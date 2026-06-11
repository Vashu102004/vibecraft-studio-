import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Type, Move, Palette, Layers, Sparkles, Sliders, Maximize2, 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  ArrowUpToLine, ArrowDownToLine, Trash2, LayoutTemplate, Image as ImageIcon, Square
} from 'lucide-react';

const FESTIVAL_REGISTRY = {
  Diwali: {
    title: "Shubh Deepawali Special",
    quote: "May the divine light of Diwali bring peace, prosperity, and happiness to your life.",
    gradient: "linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #1e1b4b 100%)",
    bgImage: "https://images.unsplash.com/photo-1542157585-ef208ce528f4?auto=format&fit=crop&w=1080&q=80",
    textColor: "#fcd34d",
    emojis: ["🪔", "🎆", "✨", "🌟"],
    stickers: ["1fa94", "2728"],
    font: "Rozha One"
  },
  Holi: {
    title: "Holi Hungama Dhamaka",
    quote: "Wishing you a colorful, joyous, and vibrant Holi filled with love and laughter!",
    gradient: "linear-gradient(135deg, #db2777 0%, #9333ea 50%, #f59e0b 100%)",
    bgImage: "https://images.unsplash.com/photo-1554032115-3841c1921319?auto=format&fit=crop&w=1080&q=80",
    textColor: "#ffffff",
    emojis: ["🎨", "🪣", "🔫", "🥳"],
    stickers: ["1f3a8", "1f973"],
    font: "Poppins"
  },
  Eid: {
    title: "Eid Mubarak Mega Sale",
    quote: "May Allah bless your life with joy, prosperity, and peace. Eid Mubarak!",
    gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 60%, #115e59 100%)",
    bgImage: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=1080&q=80",
    textColor: "#fef08a",
    emojis: ["🌙", "🕌", "✨", "🎁"],
    stickers: ["1f319", "2728"],
    font: "Playfair Display"
  },
  Navratri: {
    title: "Dandiya Beats Utsav",
    quote: "Let the divine blessings of Maa Durga bring you strength and good fortune.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #c2410c 70%, #7c2d12 100%)",
    bgImage: "https://images.unsplash.com/photo-1600085811342-9ee684176cc3?auto=format&fit=crop&w=1080&q=80",
    textColor: "#fdba74",
    emojis: ["🪘", "💃", "🔱", "🏹"],
    stickers: ["1f483", "2728"],
    font: "Yatra One"
  },
  RakshaBandhan: {
    title: "Rakhi Special Bandhan Offers",
    quote: "Celebrating the unbreakable bond of love and protection. Happy Raksha Bandhan!",
    gradient: "linear-gradient(135deg, #881337 0%, #4c0519 60%, #9d174d 100%)",
    bgImage: "https://images.unsplash.com/photo-1596489376483-e18e88e235e1?auto=format&fit=crop&w=1080&q=80",
    textColor: "#fce7f3",
    emojis: ["🧵", "🎁", "👑", "🍬"],
    stickers: ["1f381", "1f451"],
    font: "Great Vibes"
  },
  GaneshChaturthi: {
    title: "Ganesh Utsav Maha Sale",
    quote: "May Lord Ganesha remove all obstacles and bless you with wisdom and success.",
    gradient: "linear-gradient(135deg, #b45309 0%, #78350f 50%, #f59e0b 100%)",
    bgImage: "https://images.unsplash.com/photo-1567360216669-0260429fec8b?auto=format&fit=crop&w=1080&q=80",
    textColor: "#fffbeb",
    emojis: ["🐘", "🏵️", "🪵", "🍫"],
    stickers: ["1f418", "2728"],
    font: "Yatra One"
  },
  Christmas: {
    title: "Merry Christmas & Year End Deals",
    quote: "Wishing you a season of joy, warmth, and wonderful moments. Merry Christmas!",
    gradient: "linear-gradient(135deg, #991b1b 0%, #115e59 50%, #064e3b 100%)",
    bgImage: "https://images.unsplash.com/photo-1512389142860-2949481923db?auto=format&fit=crop&w=1080&q=80",
    textColor: "#ffffff",
    emojis: ["🎄", "🎅", "❄️", "🎁"],
    stickers: ["1f384", "1f381"],
    font: "Bebas Neue"
  },
  NewYear: {
    title: "Happy New Year Bash Offers",
    quote: "Cheers to new beginnings, endless opportunities, and a spectacular New Year!",
    gradient: "linear-gradient(135deg, #000000 0%, #1e293b 50%, #020617 100%)",
    bgImage: "https://images.unsplash.com/photo-1483321580126-77884d619934?auto=format&fit=crop&w=1080&q=80",
    textColor: "#e2e8f0",
    emojis: ["🥂", "🎆", "🎈", "🥳"],
    stickers: ["1f386", "1f389"],
    font: "Outfit"
  },
  IndependenceDay: {
    title: "Azadi Freedom Mega Sale",
    quote: "Proud to be an Indian. Let's celebrate the spirit of freedom and unity!",
    gradient: "linear-gradient(135deg, #c2410c 0%, #ffffff 50%, #15803d 100%)",
    bgImage: "https://images.unsplash.com/photo-1598463959556-324392945d8b?auto=format&fit=crop&w=1080&q=80",
    textColor: "#1e293b",
    emojis: ["🇮🇳", "🫡", "🕊️", "🦅"],
    stickers: ["1f1e9_1f1f3", "1f985"],
    font: "Poppins"
  },
  MakarSankranti: {
    title: "Makar Sankranti Kite Festival",
    quote: "May your life soar high with success like a kite. Happy Makar Sankranti!",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #eab308 100%)",
    bgImage: "https://images.unsplash.com/photo-1516089327599-2c7c59db62c9?auto=format&fit=crop&w=1080&q=80",
    textColor: "#ffffff",
    emojis: ["🪁", "🌾", "🪵", "☀️"],
    stickers: ["1fa81", "2600"],
    font: "Inter"
  },
  KarwaChauth: {
    title: "Karwa Chauth Shringar Special",
    quote: "A celebration of love, devotion, and togetherness. Happy Karwa Chauth!",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #450a0a 60%, #1e1b4b 100%)",
    bgImage: "https://images.unsplash.com/photo-1511210452655-b4618e7d2358?auto=format&fit=crop&w=1080&q=80",
    textColor: "#fef08a",
    emojis: ["🌙", "💍", "💅", "🌹"],
    stickers: ["1f48d", "1f319"],
    font: "Playfair Display"
  },
  Janmashtami: {
    title: "Krishna Janmashtami Special",
    quote: "May Lord Krishna's divine tunes fill your life with eternal bliss and joy.",
    gradient: "linear-gradient(135deg, #1e40af 0%, #0369a1 50%, #065f46 100%)",
    bgImage: "https://images.unsplash.com/photo-1629858547285-0dd5ecf362aa?auto=format&fit=crop&w=1080&q=80",
    textColor: "#fef9c3",
    emojis: ["🦚", "🍯", "🪈", "🪵"],
    stickers: ["1f9da", "2728"],
    font: "Tiro Devanagari Hindi"
  }
};

const PRESET_LAYOUTS = {
  Centered: {
    'brand-name': { x: 240, y: 100, w: 600, h: 80, textAlign: 'center', fontSize: 32 },
    'festive-heading': { x: 90, y: 200, w: 900, h: 180, textAlign: 'center', fontSize: 72 },
    'marketing-body': { x: 140, y: 420, w: 800, h: 180, textAlign: 'center', fontSize: 30 },
    'emoji-asset-pack': { x: 440, y: 620, w: 200, h: 120 }
  },
  Split: {
    'brand-name': { x: 100, y: 120, w: 450, h: 80, textAlign: 'left', fontSize: 32 },
    'festive-heading': { x: 100, y: 220, w: 550, h: 220, textAlign: 'left', fontSize: 64 },
    'marketing-body': { x: 100, y: 460, w: 500, h: 200, textAlign: 'left', fontSize: 28 },
    'emoji-asset-pack': { x: 680, y: 250, w: 250, h: 250 }
  },
  BottomHeavy: {
    'emoji-asset-pack': { x: 440, y: 160, w: 200, h: 150 },
    'brand-name': { x: 240, y: 380, w: 600, h: 80, textAlign: 'center', fontSize: 32 },
    'festive-heading': { x: 90, y: 480, w: 900, h: 180, textAlign: 'center', fontSize: 64 },
    'marketing-body': { x: 140, y: 680, w: 800, h: 180, textAlign: 'center', fontSize: 28 }
  }
};

const PREMIUM_FONTS = [
  "Poppins", "Montserrat", "Inter", "Playfair Display", 
  "Bebas Neue", "Great Vibes", "Outfit", "Rozha One", 
  "Yatra One", "Tiro Devanagari Hindi"
];

export default function CanvasEditor({ initialData = {} }) {
  const canvasRef = useRef(null);
  const [selectedFestival, setSelectedFestival] = useState(initialData.festival || 'Diwali');
  const [activeLayerId, setActiveLayerId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'layouts'
  const [showFrame, setShowFrame] = useState(true);

  // Core Layers Initialization
  const [layers, setLayers] = useState([
    {
      id: 'brand-name',
      type: 'text',
      content: initialData.businessName || 'Brand Name',
      x: 340,
      y: 100,
      w: 400,
      h: 60,
      fontSize: 28,
      color: '#ffffff',
      fontFamily: 'Montserrat',
      fontWeight: '900',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'center',
      zIndex: 10
    },
    {
      id: 'festive-heading',
      type: 'text',
      content: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].title,
      x: 140,
      y: 220,
      w: 800,
      h: 80,
      fontSize: 60,
      color: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].textColor,
      fontFamily: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].font,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'center',
      zIndex: 10
    },
    {
      id: 'marketing-body',
      type: 'text',
      content: initialData.generatedText || 'AI generated marketing copy will appear here...',
      x: 140,
      y: 400,
      w: 800,
      h: 120,
      fontSize: 24,
      color: '#e2e8f0',
      fontFamily: 'Outfit',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'center',
      zIndex: 10
    },
    {
      id: 'emoji-asset-pack',
      type: 'asset',
      content: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].emojis.join(' '),
      x: 440,
      y: 650,
      w: 200,
      h: 100,
      fontSize: 48,
      zIndex: 5
    }
  ]);

  const safeFestival = FESTIVAL_REGISTRY[selectedFestival] ? selectedFestival : 'Diwali';

  // Sync active canvas when festival layout shifts dynamically
  useEffect(() => {
    const fest = FESTIVAL_REGISTRY[safeFestival];
    const preset = PRESET_LAYOUTS['Centered'];

    setLayers(prev => prev.map(layer => {
      let l = { ...layer };
      
      // 1. Update text contents & styles
      if (l.id === 'festive-heading') {
        l.content = fest.title;
        l.color = fest.textColor;
        l.fontFamily = fest.font;
      }
      if (l.id === 'emoji-asset-pack') {
        l.content = fest.emojis.join(' ');
      }
      if (l.id === 'marketing-body' && fest.quote) {
        l.content = fest.quote;
      }

      // 2. Auto-Snap to Centered Layout
      if (preset[l.id]) {
        l = { ...l, ...preset[l.id] };
      }

      return l;
    }));
  }, [safeFestival]);

  const handleSemanticReflow = (id, newX, newY, newWidth = null, newHeight = null) => {
    setLayers(prevLayers => {
      return prevLayers.map(l => {
        if (l.id === id) {
          return { ...l, x: newX, y: newY, w: newWidth || l.w, h: newHeight || l.h };
        }
        return l;
      });
    });
  };

  const updateActiveLayerProperty = (key, value) => {
    if (!activeLayerId) return;
    setLayers(prev => prev.map(l => l.id === activeLayerId ? { ...l, [key]: value } : l));
  };

  const bringForward = () => {
    if (!activeLayerId) return;
    setLayers(prev => prev.map(l => l.id === activeLayerId ? { ...l, zIndex: l.zIndex + 1 } : l));
  };

  const sendBackward = () => {
    if (!activeLayerId) return;
    setLayers(prev => prev.map(l => l.id === activeLayerId ? { ...l, zIndex: Math.max(0, l.zIndex - 1) } : l));
  };

  const toggleStyle = (property, activeValue, normalValue) => {
    if (!activeLayerId) return;
    const layer = layers.find(l => l.id === activeLayerId);
    if (!layer) return;
    updateActiveLayerProperty(property, layer[property] === activeValue ? normalValue : activeValue);
  };

  const deleteActiveLayer = () => {
    if (!activeLayerId) return;
    setLayers(prev => prev.filter(l => l.id !== activeLayerId));
    setActiveLayerId(null);
  };

  const applyLayout = (layoutName) => {
    const preset = PRESET_LAYOUTS[layoutName];
    setLayers(prev => prev.map(l => {
      if (preset[l.id]) {
        return { ...l, ...preset[l.id] };
      }
      return l;
    }));
  };

  const addSticker = (unicode) => {
    const newId = `sticker-${Date.now()}`;
    setLayers(prev => [
      ...prev,
      {
        id: newId,
        type: 'image',
        content: `https://fonts.gstatic.com/s/e/notoemoji/latest/${unicode}/512.gif`,
        x: 440,
        y: 440,
        w: 200,
        h: 200,
        zIndex: 20
      }
    ]);
    setActiveLayerId(newId);
  };

  const triggerHighResExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    setActiveLayerId(null); 

    setTimeout(async () => {
      try {
        const dataUrl = await toPng(canvasRef.current, {
          quality: 1.0,
          pixelRatio: 1, 
          style: { transform: 'scale(1)' },
          cacheBust: true,
        });
        const link = document.createElement('a');
        link.download = `VibeCraft_${safeFestival}_Professional.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Export Error:", error);
      } finally {
        setIsExporting(false);
      }
    }, 300);
  };

  const activeLayer = layers.find(l => l.id === activeLayerId);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 p-4 lg:p-8 flex flex-col items-center font-sans selection:bg-indigo-500/30">
      
      {/* Header Pipeline Control */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center mb-8 bg-[#0f1524]/80 backdrop-blur-md p-5 rounded-2xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              CANVAS STUDIO PRO
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Professional Poster Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-colors">
            <Palette size={16} className="text-indigo-400" />
            <select 
              value={safeFestival} 
              onChange={(e) => setSelectedFestival(e.target.value)}
              className="bg-transparent text-sm focus:outline-none text-slate-200 font-bold cursor-pointer"
            >
              {Object.keys(FESTIVAL_REGISTRY).map(fest => (
                <option key={fest} value={fest} className="bg-[#0f1524] text-slate-200">{fest}</option>
              ))}
            </select>
          </div>

          <button
            onClick={triggerHighResExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-white text-black hover:bg-indigo-50 font-black px-6 py-2.5 rounded-xl shadow-xl shadow-white/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50"
          >
            <Download size={18} />
            {isExporting ? 'Exporting...' : 'Download 4K'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Toolbar (Myntra/Canva Style Floating Panels) */}
        <div className="lg:col-span-3 space-y-6 lg:max-h-[850px] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-white/10">
          <div className="bg-[#0f1524]/80 backdrop-blur-md p-4 rounded-3xl border border-white/5 shadow-2xl flex gap-2">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-2.5 text-xs font-black tracking-widest uppercase rounded-xl transition-all ${activeTab === 'editor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <Sliders size={14} className="inline mr-1.5 -mt-0.5" /> Editor
            </button>
            <button 
              onClick={() => setActiveTab('layouts')}
              className={`flex-1 py-2.5 text-xs font-black tracking-widest uppercase rounded-xl transition-all ${activeTab === 'layouts' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <LayoutTemplate size={14} className="inline mr-1.5 -mt-0.5" /> Layouts
            </button>
          </div>

          {activeTab === 'layouts' && (
            <div className="bg-[#0f1524]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl space-y-6">
              <h2 className="font-black text-sm tracking-widest text-slate-300 uppercase">Pre-Built Layouts</h2>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => applyLayout('Centered')} className="bg-black/40 hover:bg-white/10 border border-white/5 p-4 rounded-xl text-left transition-all group">
                  <div className="h-20 w-full bg-white/5 rounded-lg mb-3 flex flex-col items-center justify-center p-2 gap-1 group-hover:border-indigo-500 border border-transparent">
                    <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                    <div className="w-3/4 h-3 bg-white/40 rounded"></div>
                    <div className="w-full h-8 bg-white/10 rounded mt-1"></div>
                  </div>
                  <h3 className="text-sm font-bold text-white">Modern Centered</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Perfect for Instagram posts</p>
                </button>
                <button onClick={() => applyLayout('Split')} className="bg-black/40 hover:bg-white/10 border border-white/5 p-4 rounded-xl text-left transition-all group">
                  <div className="h-20 w-full bg-white/5 rounded-lg mb-3 flex items-center p-2 gap-2 group-hover:border-indigo-500 border border-transparent">
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                      <div className="w-full h-3 bg-white/40 rounded"></div>
                      <div className="w-full h-8 bg-white/10 rounded mt-1"></div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  </div>
                  <h3 className="text-sm font-bold text-white">Classic Split</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Great for WhatsApp sharing</p>
                </button>
                <button onClick={() => applyLayout('BottomHeavy')} className="bg-black/40 hover:bg-white/10 border border-white/5 p-4 rounded-xl text-left transition-all group">
                  <div className="h-20 w-full bg-white/5 rounded-lg mb-3 flex flex-col items-center justify-end p-2 gap-1 group-hover:border-indigo-500 border border-transparent relative">
                    <div className="absolute top-2 w-8 h-8 rounded-full bg-white/20"></div>
                    <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                    <div className="w-3/4 h-3 bg-white/40 rounded"></div>
                  </div>
                  <h3 className="text-sm font-bold text-white">Bottom Heavy</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Hero graphic focus</p>
                </button>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <h2 className="font-black text-sm tracking-widest text-slate-300 uppercase flex items-center">
                  <ImageIcon size={16} className="mr-2 text-pink-400" /> Animated Stickers
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {FESTIVAL_REGISTRY[safeFestival].stickers.map((unicode, i) => (
                    <button 
                      key={i}
                      onClick={() => addSticker(unicode)}
                      className="bg-black/40 hover:bg-white/10 border border-white/5 p-2 rounded-xl flex items-center justify-center transition-all h-20"
                    >
                      <img src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${unicode}/512.gif`} alt="Sticker" className="w-12 h-12 object-contain drop-shadow-lg" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="bg-[#0f1524]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-sm tracking-widest text-slate-300 uppercase flex items-center">
                  <Sliders size={16} className="mr-2 text-indigo-400" /> Editor
                </h2>
                {activeLayer && (
                  <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                    {activeLayer.type} Selected
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {activeLayer ? (
                  <motion.div
                    key={activeLayer.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    
                    {activeLayer.type === 'text' && (
                      <>
                        {/* Formatting Action Bar */}
                        <div className="bg-black/30 p-1.5 rounded-xl border border-white/5 flex items-center justify-between">
                          <div className="flex gap-1">
                            <button onClick={() => toggleStyle('fontWeight', '900', 'normal')} className={`p-2 rounded-lg transition-colors ${activeLayer.fontWeight === '900' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                              <Bold size={16} />
                            </button>
                            <button onClick={() => toggleStyle('fontStyle', 'italic', 'normal')} className={`p-2 rounded-lg transition-colors ${activeLayer.fontStyle === 'italic' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                              <Italic size={16} />
                            </button>
                            <button onClick={() => toggleStyle('textDecoration', 'underline', 'none')} className={`p-2 rounded-lg transition-colors ${activeLayer.textDecoration === 'underline' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                              <Underline size={16} />
                            </button>
                          </div>
                          <div className="w-px h-6 bg-white/10"></div>
                          <div className="flex gap-1">
                            <button onClick={() => updateActiveLayerProperty('textAlign', 'left')} className={`p-2 rounded-lg transition-colors ${activeLayer.textAlign === 'left' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                              <AlignLeft size={16} />
                            </button>
                            <button onClick={() => updateActiveLayerProperty('textAlign', 'center')} className={`p-2 rounded-lg transition-colors ${activeLayer.textAlign === 'center' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                              <AlignCenter size={16} />
                            </button>
                            <button onClick={() => updateActiveLayerProperty('textAlign', 'right')} className={`p-2 rounded-lg transition-colors ${activeLayer.textAlign === 'right' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                              <AlignRight size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Content Field */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Text Content</label>
                          <textarea
                            value={activeLayer.content}
                            onChange={(e) => updateActiveLayerProperty('content', e.target.value)}
                            className="w-full text-sm bg-black/40 border border-white/10 p-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 resize-none h-24 transition-all"
                          />
                        </div>

                        {/* Typography */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Premium Typography</label>
                          <select
                            value={activeLayer.fontFamily}
                            onChange={(e) => updateActiveLayerProperty('fontFamily', e.target.value)}
                            className="w-full text-sm font-semibold bg-black/40 border border-white/10 p-3 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 appearance-none"
                          >
                            {PREMIUM_FONTS.map(font => (
                              <option key={font} value={font}>{font}</option>
                            ))}
                          </select>
                        </div>

                        {/* Scale & Color */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Size ({activeLayer.fontSize}px)</label>
                            <input
                              type="range" min="12" max="150"
                              value={activeLayer.fontSize}
                              onChange={(e) => updateActiveLayerProperty('fontSize', parseInt(e.target.value))}
                              className="w-full accent-indigo-500 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Color</label>
                            <div className="flex bg-black/40 border border-white/10 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
                              <input
                                type="color"
                                value={activeLayer.color}
                                onChange={(e) => updateActiveLayerProperty('color', e.target.value)}
                                className="w-10 h-10 cursor-pointer border-0 p-0 bg-transparent"
                              />
                              <input
                                type="text"
                                value={activeLayer.color}
                                onChange={(e) => updateActiveLayerProperty('color', e.target.value)}
                                className="flex-1 w-full bg-transparent text-xs font-mono font-bold text-slate-300 px-2 focus:outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activeLayer.type === 'asset' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Emoji Size ({activeLayer.fontSize}px)</label>
                          <input
                            type="range" min="20" max="250"
                            value={activeLayer.fontSize || 50}
                            onChange={(e) => updateActiveLayerProperty('fontSize', parseInt(e.target.value))}
                            className="w-full accent-indigo-500 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {activeLayer.type === 'image' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-xs text-slate-400">Animated Sticker Selected. Drag edges to resize on canvas.</p>
                        </div>
                      </div>
                    )}

                    {/* Z-Index Controls */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Layer Arrange</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={bringForward} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-white/10 text-slate-300 text-xs font-bold py-2.5 rounded-xl border border-white/5 transition-all">
                          <ArrowUpToLine size={14} /> Forward
                        </button>
                        <button onClick={sendBackward} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-white/10 text-slate-300 text-xs font-bold py-2.5 rounded-xl border border-white/5 transition-all">
                          <ArrowDownToLine size={14} /> Backward
                        </button>
                      </div>
                      <button onClick={() => setShowFrame(!showFrame)} className={"w-full flex items-center justify-center gap-2 " + (showFrame ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "bg-white/5 text-slate-400 border-white/10") + " hover:bg-white/10 text-xs font-bold py-2.5 rounded-xl border transition-all mt-4"}>
                        <Square size={14} /> {showFrame ? 'Frame Enabled' : 'Frame Disabled'}
                      </button>
                      <button onClick={deleteActiveLayer} className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold py-2.5 rounded-xl border border-red-500/20 transition-all mt-2">
                        <Trash2 size={14} /> Delete Layer
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <div className="text-center py-12 text-slate-600 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                      <Move size={24} className="opacity-50 animate-bounce" />
                    </div>
                    <p className="text-sm font-semibold text-slate-400">No Layer Selected</p>
                    <p className="text-xs mt-1 text-slate-500">Click any text or graphic on the canvas to edit</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Center Canvas */}
        <div className="lg:col-span-9 flex justify-center items-start">
          <div className="p-4 bg-[#0f1524]/60 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">
            {/* Bounding Box to prevent Transform Scale DOM Ghosting */}
            <div style={{ width: '594px', height: '594px' }} className="relative">
              <div 
                ref={canvasRef}
                id="vibecraft-render-core"
                onClick={() => setActiveLayerId(null)}
                style={{ 
                  background: FESTIVAL_REGISTRY[safeFestival].gradient,
                  width: '1080px', // Standard 1:1 Instagram Post Size Scaled
                  height: '1080px',
                  transform: 'scale(0.55)', // Scale down for view (594px visual)
                  transformOrigin: 'top left'
                }}
                className="absolute top-0 left-0 overflow-hidden shadow-2xl select-none rounded-xl"
              >
              {/* Premium Background Image with Blend */}
              {FESTIVAL_REGISTRY[safeFestival].bgImage && (
                <div 
                  className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                  style={{ 
                    backgroundImage: "url('" + FESTIVAL_REGISTRY[safeFestival].bgImage + "')", 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                ></div>
              )}

              {/* Boundary / Frame Design */}
              {showFrame && (
                <div className="absolute inset-8 border-[6px] border-white/20 pointer-events-none rounded-2xl z-50 shadow-inner">
                  <div className="absolute inset-2 border-2 border-white/40 rounded-xl"></div>
                  {/* Corner Accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-[6px] border-l-[6px] border-[#fcd34d]/80 rounded-tl-xl drop-shadow-md"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-[6px] border-r-[6px] border-[#fcd34d]/80 rounded-tr-xl drop-shadow-md"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-[6px] border-l-[6px] border-[#fcd34d]/80 rounded-bl-xl drop-shadow-md"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-[6px] border-r-[6px] border-[#fcd34d]/80 rounded-br-xl drop-shadow-md"></div>
                </div>
              )}

              {/* Professional Background Overlays */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

              {layers.map((layer) => (
                <Rnd
                  key={layer.id}
                  size={{ width: layer.w, height: layer.h }}
                  position={{ x: layer.x, y: layer.y }}
                  bounds="parent"
                  enableResizing={activeLayerId === layer.id && !isExporting}
                  disableDragging={isExporting}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLayerId(layer.id);
                  }}
                  onDragStop={(e, d) => handleSemanticReflow(layer.id, d.x, d.y)}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    handleSemanticReflow(layer.id, position.x, position.y, parseInt(ref.style.width), parseInt(ref.style.height));
                  }}
                  style={{ zIndex: layer.zIndex }}
                  className={`flex items-center justify-start transition-all duration-200 ${
                    activeLayerId === layer.id && !isExporting 
                      ? 'ring-4 ring-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)] bg-indigo-500/10' 
                      : 'hover:ring-2 hover:ring-white/30'
                  }`}
                >
                  {layer.type === 'text' ? (
                    <div
                      style={{
                        fontSize: `${layer.fontSize}px`,
                        color: layer.color,
                        fontFamily: layer.fontFamily,
                        fontWeight: layer.fontWeight,
                        fontStyle: layer.fontStyle,
                        textDecoration: layer.textDecoration,
                        textAlign: layer.textAlign,
                        width: '100%',
                        height: '100%',
                        lineHeight: '1.3',
                        textShadow: '0 4px 12px rgba(0,0,0,0.5)'
                      }}
                      className="px-4 py-1 break-words select-none drop-shadow-2xl flex flex-col justify-center"
                    >
                      {layer.content}
                    </div>
                  ) : layer.type === 'image' ? (
                    <div className="w-full h-full p-2">
                      <img src={layer.content} alt="Sticker" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                  ) : (
                    <div
                      style={{ fontSize: `${layer.fontSize || 50}px`, width: '100%', height: '100%' }}
                      className="flex items-center justify-center filter drop-shadow-2xl tracking-widest"
                    >
                      {layer.content}
                    </div>
                  )}
                </Rnd>
              ))}
            </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
