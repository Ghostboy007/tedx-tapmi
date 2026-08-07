import React, { useContext, useState } from 'react';
import { CMSContext } from '../context/CMSContext';

export function SpeakersPage() {
  const { cmsData } = useContext(CMSContext);
  const speakers = cmsData.speakers || [];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpeakerModal, setActiveSpeakerModal] = useState(null);

  const categories = ['All', 'Technology', 'Design', 'Business', 'Entertainment'];

  const filteredSpeakers = speakers.filter(sp => {
    const matchesCategory = selectedCategory === 'All' || sp.category === selectedCategory;
    const matchesSearch = sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sp.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sp.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-page-enter">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-4 py-1.5 bg-[#E62B1E]/15 border border-[#E62B1E]/40 text-[#E62B1E] font-black text-xs uppercase tracking-widest rounded-full">
          TEDxTapmi Alumni Roster
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">Past Speakers & Visionaries</h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Discover the distinguished thought leaders, researchers, creative strategists, and venture founders who have delivered inspiring keynotes at previous editions of TEDxTapmi.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#0E0E14] border border-[#242434] p-4 rounded-2xl">
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="🔍 Search past speakers or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#161622] border border-[#2B2B3E] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E62B1E]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E62B1E] text-white shadow-lg shadow-[#E62B1E]/30'
                  : 'bg-[#151520] text-gray-400 hover:text-white border border-[#272738]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredSpeakers.length === 0 ? (
        <div className="p-16 text-center text-gray-500 bg-[#0E0E14] border border-[#242432] rounded-2xl space-y-2">
          <p className="text-lg font-bold text-gray-300">No past speakers found matching your search.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} 
            className="text-xs text-[#E62B1E] font-bold underline cursor-pointer"
          >
            Clear Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredSpeakers.map(sp => (
            <div
              key={sp.id}
              onClick={() => setActiveSpeakerModal(sp)}
              className="bg-[#0E0E14] border border-[#242432] rounded-2xl overflow-hidden hover:border-[#E62B1E] transition-all cursor-pointer group hover:-translate-y-2 shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={sp.image}
                  alt={sp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/80 border border-[#E62B1E]/50 text-[#E62B1E] text-[10px] font-black uppercase tracking-wider rounded-full">
                  {sp.category}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#E62B1E] transition-colors font-heading">{sp.name}</h3>
                  <p className="text-xs text-gray-400 font-semibold">{sp.role}</p>
                </div>
                <div className="pt-3 border-t border-[#1C1C28]">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Keynote Topic</span>
                  <p className="text-xs text-gray-200 font-medium italic line-clamp-2 mt-0.5">"{sp.topic}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {activeSpeakerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-page-enter">
          <div className="relative w-full max-w-2xl bg-[#0E0E14] border border-[#E62B1E]/60 rounded-3xl overflow-hidden shadow-2xl text-white grid grid-cols-1 md:grid-cols-2">
            <button
              onClick={() => setActiveSpeakerModal(null)}
              className="absolute top-4 right-4 z-10 bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-[#E62B1E] cursor-pointer"
            >
              ✕
            </button>

            <div className="relative aspect-square md:aspect-auto bg-black">
              <img
                src={activeSpeakerModal.image}
                alt={activeSpeakerModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-[#E62B1E]/20 text-[#E62B1E] text-xs font-black uppercase tracking-wider rounded-full">{activeSpeakerModal.category}</span>
                <h3 className="text-2xl font-black text-white font-heading">{activeSpeakerModal.name}</h3>
                <p className="text-xs font-bold text-gray-400">{activeSpeakerModal.role}</p>
                
                <div className="p-3 bg-[#151520] border border-[#272738] rounded-xl">
                  <p className="text-[10px] font-bold text-[#E62B1E] uppercase tracking-wider">Keynote Talk</p>
                  <p className="text-xs font-semibold text-white italic mt-1">"{activeSpeakerModal.topic}"</p>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed pt-1">{activeSpeakerModal.bio}</p>
              </div>

              <div className="pt-4 border-t border-[#222230] flex items-center justify-between text-xs">
                <span className="text-gray-500 font-bold">Social Handles</span>
                <div className="flex space-x-3">
                  <a href={activeSpeakerModal.linkedin || '#'} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E62B1E]">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
