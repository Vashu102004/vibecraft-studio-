import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Type, Move, Palette, Layers, Sparkles, Sliders, Maximize2, 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  ArrowUpToLine, ArrowDownToLine, Trash2
} from 'lucide-react';

// 12 Full Indian Festivals Config Matrix with 2030 Semantic Themes
const FESTIVAL_REGISTRY = {
  Diwali: {
    title: "Shubh Deepawali Special",
    gradient: "linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #1e1b4b 100%)",
    textColor: "#fcd34d",
    emojis: ["🪔", "🎆", "✨", "🌟"],
    font: "Rozha One"
  },
  Holi: {
    title: "Holi Hungama Dhamaka",
    gradient: "linear-gradient(135deg, #db2777 0%, #9333ea 50%, #f59e0b 100%)",
    textColor: "#ffffff",
    emojis: ["🎨", "🪣", "🔫", "🥳"],
    font: "Poppins"
  },
  Eid: {
    title: "Eid Mubarak Mega Sale",
    gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 60%, #115e59 100%)",
    textColor: "#fef08a",
    emojis: ["🌙", "🕌", "✨", "🎁"],
    font: "Tiro Devanagari Hindi"
  },
  Navratri: {
    title: "Dandiya Beats Utsav",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #c2410c 70%, #7c2d12 100%)",
    textColor: "#fdba74",
    emojis: ["🪘", "💃", "🔱", "🏹"],
    font: "Yatra One"
  },
  RakshaBandhan: {
    title: "Rakhi Special Bandhan Offers",
    gradient: "linear-gradient(135deg, #881337 0%, #4c0519 60%, #9d174d 100%)",
    textColor: "#fce7f3",
    emojis: ["🧵", "🎁", "👑", "🍬"],
    font: "Poppins"
  },
  GaneshChaturthi: {
    title: "Ganesh Utsav Maha Sale",
    gradient: "linear-gradient(135deg, #b45309 0%, #78350f 50%, #f59e0b 100%)",
    textColor: "#fffbeb",
    emojis: ["🐘", "🏵️", "🪵", "🍫"],
    font: "Yatra One"
  },
  Christmas: {
    title: "Merry Christmas & Year End Deals",
    gradient: "linear-gradient(135deg, #991b1b 0%, #115e59 50%, #064e3b 100%)",
    textColor: "#ffffff",
    emojis: ["🎄", "🎅", "❄️", "🎁"],
    font: "Montserrat"
  },
  NewYear: {
    title: "Happy New Year Bash Offers",
    gradient: "linear-gradient(135deg, #000000 0%, #1e293b 50%, #020617 100%)",
    textColor: "#e2e8f0",
    emojis: ["🥂", "🎆", "🎈", "🥳"],
    font: "Montserrat"
  },
  IndependenceDay: {
    title: "Azadi Freedom Mega Sale",
    gradient: "linear-gradient(135deg, #c2410c 0%, #ffffff 50%, #15803d 100%)",
    textColor: "#1e293b",
    emojis: ["🇮🇳", "🫡", "🕊️", "🦅"],
    font: "Poppins"
  },
  MakarSankranti: {
    title: "Makar Sankranti Kite Festival",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #eab308 100%)",
    textColor: "#ffffff",
    emojis: ["🪁", "🌾", "🪵", "☀️"],
    font: "Inter"
  },
  KarwaChauth: {
    title: "Karwa Chauth Shringar Special",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #450a0a 60%, #1e1b4b 100%)",
    textColor: "#fef08a",
    emojis: ["🌙", "💍", "💅", "🌹"],
    font: "Rozha One"
  },
  Janmashtami: {
    title: "Krishna Janmashtami Special",
    gradient: "linear-gradient(135deg, #1e40af 0%, #0369a1 50%, #065f46 100%)",
    textColor: "#fef9c3",
    emojis: ["🦚", "🍯", "🪈", "🪵"],
    font: "Tiro Devanagari Hindi"
  }
};

export default function CanvasEditor({ initialData = {} }) {
  const canvasRef = useRef(null);
  const [selectedFestival, setSelectedFestival] = useState(initialData.festival || 'Diwali');
  const [activeLayerId, setActiveLayerId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Core Layers Initialization Engine (with new Z-Index and formatting properties)
  const [layers, setLayers] = useState([
    {
      id: 'brand-name',
      type: 'text',
      content: initialData.businessName || 'Brand Name',
      x: 50,
      y: 40,
      w: 400,
      h: 60,
      fontSize: 28,
      color: '#ffffff',
      fontFamily: 'Montserrat',
      fontWeight: '900',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'left',
      zIndex: 10
    },
    {
      id: 'festive-heading',
      type: 'text',
      content: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].title,
      x: 50,
      y: 120,
      w: 400,
      h: 50,
      fontSize: 22,
      color: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].textColor,
      fontFamily: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].font,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'left',
      zIndex: 10
    },
    {
      id: 'marketing-body',
      type: 'text',
      content: initialData.generatedText || 'AI generated marketing copy will appear here...',
      x: 50,
      y: 200,
      w: 400,
      h: 120,
      fontSize: 16,
      color: '#e2e8f0',
      fontFamily: 'Poppins',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'left',
      zIndex: 10
    },
    {
      id: 'emoji-asset-pack',
      type: 'asset',
      content: FESTIVAL_REGISTRY[initialData.festival || 'Diwali'].emojis.join(' '),
      x: 180,
      y: 350,
      w: 150,
      h: 50,
      fontSize: 32,
      zIndex: 5
    }
  ]);

  const safeFestival = FESTIVAL_REGISTRY[selectedFestival] ? selectedFestival : 'Diwali';

  // Sync active canvas when festival layout shifts dynamically
  useEffect(() => {
    setLayers(prev => prev.map(layer => {
      if (layer.id === 'festive-heading') {
        return {
          ...layer,
          content: FESTIVAL_REGISTRY[safeFestival].title,
          color: FESTIVAL_REGISTRY[safeFestival].textColor,
          fontFamily: FESTIVAL_REGISTRY[safeFestival].font
        };
      }
      if (layer.id === 'emoji-asset-pack') {
        return { ...layer, content: FESTIVAL_REGISTRY[safeFestival].emojis.join(' ') };
      }
      return layer;
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

  const triggerHighResExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    setActiveLayerId(null); 

    setTimeout(async () => {
      try {
        const dataUrl = await toPng(canvasRef.current, {
          quality: 1.0,
          pixelRatio: 3, 
          cacheBust: true,
        });
        const link = document.createElement('a');
        link.download = `VibeCraft_${safeFestival}_Banner.png`;
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
            <p className="text-xs text-slate-400 font-medium mt-0.5">Myntra-Style Advanced Design Engine</p>
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
        <div className="lg:col-span-3 space-y-6">
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
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Typography</label>
                        <select
                          value={activeLayer.fontFamily}
                          onChange={(e) => updateActiveLayerProperty('fontFamily', e.target.value)}
                          className="w-full text-sm font-semibold bg-black/40 border border-white/10 p-3 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 appearance-none"
                        >
                          <option value="Poppins">Poppins</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Rozha One">Rozha One</option>
                          <option value="Yatra One">Yatra One</option>
                          <option value="Tiro Devanagari Hindi">Tiro Devanagari</option>
                          <option value="Inter">Inter</option>
                        </select>
                      </div>

                      {/* Scale & Color */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Size ({activeLayer.fontSize}px)</label>
                          <input
                            type="range" min="12" max="100"
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
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Scale Size ({activeLayer.fontSize}px)</label>
                        <input
                          type="range" min="20" max="150"
                          value={activeLayer.fontSize}
                          onChange={(e) => updateActiveLayerProperty('fontSize', parseInt(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Z-Index Controls */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Layer Arrange</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={bringForward} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-white/10 text-slate-300 text-xs font-bold py-2.5 rounded-xl border border-white/5 transition-all">
                        <ArrowUpToLine size={14} /> Forward
                      </button>
                      <button onClick={sendBackward} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-white/10 text-slate-300 text-xs font-bold py-2.5 rounded-xl border border-white/5 transition-all">
                        <ArrowDownToLine size={14} /> Backward
                      </button>
                    </div>
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
        </div>

        {/* Center Canvas */}
        <div className="lg:col-span-9 flex justify-center items-start">
          <div className="p-4 bg-[#0f1524]/60 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">
            <div 
              ref={canvasRef}
              id="vibecraft-render-core"
              onClick={() => setActiveLayerId(null)}
              style={{ 
                background: FESTIVAL_REGISTRY[safeFestival].gradient,
                width: '1080px', // Standard 1:1 Instagram Post Size Scaled
                height: '1080px',
                transform: 'scale(0.55)', // Scale down for view
                transformOrigin: 'top center'
              }}
              className="relative overflow-hidden shadow-2xl select-none mx-auto"
            >
              {/* Background Geometric Meshes */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

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
                        lineHeight: '1.4'
                      }}
                      className="p-4 break-words select-none drop-shadow-xl"
                    >
                      {layer.content}
                    </div>
                  ) : (
                    <div
                      style={{ fontSize: `${layer.fontSize}px`, width: '100%', height: '100%' }}
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
  );
}
