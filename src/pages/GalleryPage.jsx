import React, { useContext, useState } from 'react';
import { CMSContext } from '../context/CMSContext';

export function GalleryPage() {
  const { cmsData } = useContext(CMSContext);
  const gallery = cmsData.gallery || [];

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = gallery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-page-enter">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242434] pb-8">
        <div className="space-y-2">
          <span className="px-4 py-1.5 bg-[#E62B1E]/15 border border-[#E62B1E]/40 text-[#E62B1E] font-black text-xs uppercase tracking-widest rounded-full">
            Visual Chronicles
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">Event Photo Gallery</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map(photo => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="relative rounded-2xl overflow-hidden group cursor-pointer border border-[#242434] bg-[#0E0E14] aspect-[4/3]"
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <span className="text-[10px] font-black text-[#E62B1E] uppercase tracking-wider">{photo.category}</span>
              <h3 className="text-base font-bold text-white mt-1 font-heading">{photo.title}</h3>
              <p className="text-xs text-gray-300 line-clamp-2 mt-1">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-page-enter">
          <div className="relative max-w-4xl w-full bg-[#0E0E14] border border-[#E62B1E]/50 rounded-3xl overflow-hidden shadow-2xl text-white">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-[#E62B1E] cursor-pointer"
            >
              ✕
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} className="max-h-[75vh] w-auto object-contain" />
            </div>

            <div className="p-6 bg-[#0E0E14] space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-[#E62B1E]/20 text-[#E62B1E] text-[10px] font-extrabold uppercase rounded-full">{selectedPhoto.category}</span>
                <h3 className="text-lg font-bold text-white font-heading">{selectedPhoto.title}</h3>
              </div>
              <p className="text-xs text-gray-300">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
