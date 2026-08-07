import React, { useContext } from 'react';
import { CMSContext } from '../context/CMSContext';

export function TimelinePage() {
  const { cmsData } = useContext(CMSContext);
  const timeline = cmsData.timeline || [];

  return (
    <div 
      className="relative min-h-[90vh] bg-cover bg-center bg-fixed animate-page-enter"
      style={{ backgroundImage: "url('/assets/timeline_bg.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0E0E14]/60 backdrop-blur-sm" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 bg-[#E62B1E]/15 border border-[#E62B1E]/40 text-[#E62B1E] font-black text-xs uppercase tracking-widest rounded-full backdrop-blur-md">
            Event Schedule
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">Event Timeline</h1>
          <p className="text-xs sm:text-sm text-gray-300">
            The complete schedule for the 3rd Edition of TEDxTAPMI. Plan your day and get ready for an inspiring experience.
          </p>
        </div>

        <div className="relative border-l-2 border-[#E62B1E]/50 ml-4 sm:ml-40 space-y-12">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#E62B1E] group-hover:bg-[#E62B1E] transition-colors shadow-lg shadow-[#E62B1E]/50" />

              <div className="hidden sm:block absolute -left-44 top-0 text-right w-32 text-2xl font-black text-[#E62B1E] font-heading tracking-tight drop-shadow-md">
                {item.time}
              </div>

              <div className="bg-[#0E0E14]/70 backdrop-blur-md border border-[#242434]/50 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#E62B1E] transition-all shadow-2xl group-hover:-translate-y-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="sm:hidden text-2xl font-black text-[#E62B1E] font-heading drop-shadow-md">{item.time}</span>
                  <h3 className="text-2xl font-black text-white font-heading">{item.title}</h3>
                  <div className="flex space-x-2 text-xs font-bold">
                    <span className="px-3 py-1 bg-[#161622]/80 border border-[#2A2A3E] text-gray-300 rounded-full backdrop-blur-sm">⏱️ {item.duration}</span>
                    <span className="px-3 py-1 bg-[#E62B1E]/20 border border-[#E62B1E]/40 text-[#E62B1E] rounded-full backdrop-blur-sm">📌 {item.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
