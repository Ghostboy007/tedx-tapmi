import React from 'react';

export function SideNavDock({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'speakers', label: 'Past Speakers', icon: '🎙️' },
    { id: 'quiz', label: 'Speaker Quiz', icon: '⚡' },
    { id: 'timeline', label: 'Timeline', icon: '⏳' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
    { id: 'register', label: 'Register Pass', icon: '🎟️' }
  ];

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center space-y-3 bg-[#0B0B0F]/90 backdrop-blur-xl border border-[#E62B1E]/30 p-2.5 rounded-full shadow-2xl tedx-glow-sm">
      {navItems.map((item, index) => {
        const isActive = currentPage === item.id;
        return (
          <div key={item.id} className="relative group flex items-center">
            {/* Tooltip */}
            <div className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-[#E62B1E]/60 text-white text-[11px] font-bold px-3 py-1 rounded whitespace-nowrap pointer-events-none shadow-xl flex items-center space-x-1">
              <span className="text-[#E62B1E] font-mono">0{index + 1}</span>
              <span>{item.label}</span>
            </div>

            {/* Dock Button */}
            <button
              onClick={() => setCurrentPage(item.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 relative cursor-pointer ${
                isActive
                  ? 'bg-[#E62B1E] text-white scale-110 shadow-lg shadow-[#E62B1E]/40 border-2 border-white'
                  : 'bg-[#14141D] text-gray-400 hover:text-white hover:bg-[#1E1E2C] border border-[#252535]'
              }`}
            >
              {item.icon}
              {isActive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-[#E62B1E] animate-ping" />
              )}
            </button>
          </div>
        );
      })}
    </aside>
  );
}
