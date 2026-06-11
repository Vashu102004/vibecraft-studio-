import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Type, Move, Palette, Layers, Sparkles, Sliders, Maximize2 } from 'lucide-react';

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

  // Core Layers Initialization Engine
  const [layers, setLayers] = useState([
    {
      id: 'brand-name',
      type: 'text',
      content: initialData.businessName || 'Maa Rewa Auto Parts',
      x: 50,
      y: 40,
      w: 400,
      h: 60,
      fontSize: 28,
      color: '#ffffff',
      fontFamily: 'Montserrat',
      fontWeight: '900'
    },
    {
      id: 'festive-heading',
      type: 'text',
      content: FESTIVAL_REGISTRY[selectedFestival].title,
      x: 50,
      y: 120,
      w: 400,
      h: 50,
      fontSize: 22,
      color: FESTIVAL_REGISTRY[selectedFestival].textColor,
      fontFamily: FESTIVAL_REGISTRY[selectedFestival].font,
      fontWeight: 'normal'
    },
    {
      id: 'marketing-body',
      type: 'text',
      content: initialData.generatedText || '🎉 Is Diwali par paiye sabhi parts par bhaari discount! Dhamaka offer limited time tak.',
      x: 50,
      y: 200,
      w: 400,
      h: 100,
      fontSize: 16,
      color: '#e2e8f0',
      fontFamily: 'Poppins',
      fontWeight: 'normal'
    },
    {
      id: 'emoji-asset-pack',
      type: 'asset',
      content: FESTIVAL_REGISTRY[selectedFestival].emojis.join(' '),
      x: 180,
      y: 320,
      w: 150,
      h: 50,
      fontSize: 32
    }
  ]);

  // Sync active canvas when festival layout shifts dynamically
  useEffect(() => {
    setLayers(prev => prev.map(layer => {
      if (layer.id === 'festive-heading') {
        return {
          ...layer,
          content: FESTIVAL_REGISTRY[selectedFestival].title,
          color: FESTIVAL_REGISTRY[selectedFestival].textColor,
          fontFamily: FESTIVAL_REGISTRY[selectedFestival].font
        };
      }
      if (layer.id === 'emoji-asset-pack') {
        return { ...layer, content: FESTIVAL_REGISTRY[selectedFestival].emojis.join(' ') };
      }
      return layer;
    }));
  }, [selectedFestival]);

  // 2030 Semantic Layout Engine: Automatically prevents overlaps and triggers auto-snapping reflow
  const handleSemanticReflow = (id, newX, newY, newWidth = null, newHeight = null) => {
    setLayers(prevLayers => {
      const updated = prevLayers.map(l => {
        if (l.id === id) {
          return { 
            ...l, 
            x: newX, 
            y: newY, 
            w: newWidth || l.w, 
            h: newHeight || l.h 
          };
        }
        return l;
      });

      // AI Context Tracker: Automatically pushes lower elements downwards if top content boundaries expand
      const target = updated.find(l => l.id === id);
      if (target && (id === 'brand-name' || id === 'festive-heading')) {
        return updated.map(l => {
          if (l.id === 'marketing-body' && l.y < target.y + target.h) {
            return { ...l, y: target.y + target.h + 15 };
          }
          if (l.id === 'emoji-asset-pack' && l.y < target.y + target.h) {
            return { ...l, y: target.y + target.h + 110 };
          }
          return l;
        });
      }
      return updated;
    });
  };

  const updateActiveLayerProperty = (key, value) => {
    if (!activeLayerId) return;
    setLayers(prev => prev.map(l => l.id === activeLayerId ? { ...l, [key]: value } : l));
  };

  // High-Resolution Export Handler Engine
  const triggerHighResExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    setActiveLayerId(null); // Unselect active layer to strip out controls from screenshot

    setTimeout(async () => {
      try {
        const dataUrl = await toPng(canvasRef.current, {
          quality: 1.0,
          pixelRatio: 3, // Multiplies output density into ultra crisp 4K layout resolution
          cacheBust: true,
        });
        const link = document.createElement('a');
        link.download = `VibeCraft_${selectedFestival}_Banner.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Export System Failover Matrix Triggered:", error);
      } finally {
        setIsExporting(false);
      }
    }, 300);
  };

  const activeLayer = layers.find(l => l.id === activeLayerId);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6 flex flex-col items-center">
      
      {/* Header Pipeline Control */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 bg-[#131b2e] p-4 rounded-xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-500/30">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VIBECRAFT INTERACTIVE STUDIO v2.0
            </h1>
            <p className="text-xs text-slate-400">Next-Gen Real-Time Engine • Powered by Autonomous State Snapping</p>
          </div>
        </div>

        {/* Festival Quick-Switcher Core Matrix */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#0c1222] px-3 py-1.5 rounded-lg border border-slate-800">
            <Palette size={16} className="text-indigo-400" />
            <select 
              value={selectedFestival} 
              onChange={(e) => setSelectedFestival(e.target.value)}
              className="bg-transparent text-sm focus:outline-none text-slate-200 font-semibold cursor-pointer"
            >
              {Object.keys(FESTIVAL_REGISTRY).map(fest => (
                <option key={fest} value={fest} className="bg-[#131b2e] text-slate-200">{fest}</option>
              ))}
            </select>
          </div>

          <button
            onClick={triggerHighResExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-5 py-2 rounded-lg shadow-lg shadow-emerald-900/20 transition-all text-sm disabled:opacity-50"
          >
            <Download size={16} />
            {isExporting ? 'Generating PNG...' : 'Download High-Res'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side: Real-time Contextual Properties Studio HUD */}
        <div className="lg:col-span-1 bg-[#131b2e] p-5 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders size={18} className="text-purple-400" />
            <h2 className="font-bold text-sm tracking-wider text-slate-300 uppercase">Contextual Editor</h2>
          </div>

          <AnimatePresence mode="wait">
            {activeLayer ? (
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="bg-[#0c1222] p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] uppercase font-black text-indigo-400 tracking-widest">Active Object Layer</span>
                  <p className="text-xs font-mono text-slate-300 truncate mt-0.5">{activeLayer.id}</p>
                </div>

                {activeLayer.type === 'text' && (
                  <>
                    {/* Content Input Editor */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Layer Content Text</label>
                      <textarea
                        value={activeLayer.content}
                        onChange={(e) => updateActiveLayerProperty('content', e.target.value)}
                        className="w-full text-xs bg-[#0c1222] border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200 resize-none h-20"
                      />
                    </div>

                    {/* Font Selector Module */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Font Engine Matrix</label>
                      <select
                        value={activeLayer.fontFamily}
                        onChange={(e) => updateActiveLayerProperty('fontFamily', e.target.value)}
                        className="w-full text-xs bg-[#0c1222] border border-slate-800 p-2.5 rounded-lg focus:outline-none text-slate-200"
                      >
                        <option value="Poppins">Poppins (Modern Clean)</option>
                        <option value="Montserrat">Montserrat (Bold Corporate)</option>
                        <option value="Rozha One">Rozha One (Traditional Heavy)</option>
                        <option value="Yatra One">Yatra One (Festive Folk Calligraphy)</option>
                        <option value="Tiro Devanagari Hindi">Tiro Devanagari (Elegant Script)</option>
                        <option value="Inter">Inter (SaaS Standard)</option>
                      </select>
                    </div>

                    {/* Interactive Typography Metrics Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-400">
                        <label>Font Scaling Size</label>
                        <span className="text-indigo-400 font-mono">{activeLayer.fontSize}px</span>
                      </div>
                      <input
                        type="range" min="12" max="60"
                        value={activeLayer.fontSize}
                        onChange={(e) => updateActiveLayerProperty('fontSize', parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-1 bg-[#0c1222] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Hex Color Palette Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Color Palette Hex Mapping</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={activeLayer.color}
                          onChange={(e) => updateActiveLayerProperty('color', e.target.value)}
                          className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={activeLayer.color}
                          onChange={(e) => updateActiveLayerProperty('color', e.target.value)}
                          className="flex-1 text-xs bg-[#0c1222] border border-slate-800 px-3 rounded-lg text-slate-200 font-mono uppercase"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {activeLayer.type === 'asset' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <label>Graphic Asset Scale</label>
                      <span className="text-indigo-400 font-mono">{activeLayer.fontSize}px</span>
                    </div>
                    <input
                      type="range" min="20" max="80"
                      value={activeLayer.fontSize}
                      onChange={(e) => updateActiveLayerProperty('fontSize', parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-[#0c1222] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                <Move size={32} className="mx-auto mb-3 opacity-30 animate-bounce" />
                Canvas standard mode active.<br />Click any text element to unlock deep typography mechanics.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Canvas Workspace Monitor Pipeline (DOM-Render Layout Engine) */}
        <div className="lg:col-span-3 flex justify-center items-center">
          <div 
            ref={canvasRef}
            id="vibecraft-render-core"
            onClick={() => setActiveLayerId(null)}
            style={{ 
              background: FESTIVAL_REGISTRY[selectedFestival].gradient,
              width: '500px',
              height: '500px'
            }}
            className="relative rounded-2xl shadow-2xl overflow-hidden border border-slate-700 transition-all duration-500 ease-in-out select-none"
          >
            {/* Background Structural Mesh Lines (Visual Blueprint Layout Indicators) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-6 grid-rows-6 border border-slate-400">
              {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border border-slate-500" />)}
            </div>

            {/* Dynamic Map Layers Generator */}
            {layers.map((layer) => (
              <Rnd
                key={layer.id}
                size={{ width: layer.w, height: layer.h }}
                position={{ x: layer.x, y: layer.y }}
                bounds="parent"
                enableResizing={activeLayerId === layer.id && !isExporting}
                disableDragging={isExporting}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents clearing selection mapping matrix
                  setActiveLayerId(layer.id);
                }}
                onDragStop={(e, d) => handleSemanticReflow(layer.id, d.x, d.y)}
                onResizeStop={(e, direction, ref, delta, position) => {
                  handleSemanticReflow(
                    layer.id,
                    position.x,
                    position.y,
                    parseInt(ref.style.width),
                    parseInt(ref.style.height)
                  );
                }}
                className={`flex items-center justify-start transition-shadow ${
                  activeLayerId === layer.id && !isExporting 
                    ? 'border-2 border-dashed border-indigo-400 bg-indigo-500/10 shadow-lg' 
                    : 'border border-transparent'
                }`}
              >
                {layer.type === 'text' ? (
                  <div
                    style={{
                      fontSize: `${layer.fontSize}px`,
                      color: layer.color,
                      fontFamily: layer.fontFamily,
                      fontWeight: layer.fontWeight,
                      width: '100%',
                      height: '100%',
                      lineHeight: '1.2'
                    }}
                    className="p-1 break-words select-none leading-relaxed drop-shadow-md"
                  >
                    {layer.content}
                  </div>
                ) : (
                  <div
                    style={{ fontSize: `${layer.fontSize}px`, width: '100%', height: '100%' }}
                    className="flex items-center justify-center filter drop-shadow-lg tracking-widest"
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
  );
}
