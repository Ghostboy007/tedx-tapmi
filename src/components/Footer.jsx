import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer({ setCurrentPage }) {
  const scrollToPage = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] border-t border-[#22222D] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Disclaimer */}
          <div className="space-y-4 md:col-span-2">
            <div className="bg-white/90 p-2 rounded-xl inline-block shadow-lg">
              <img 
                src="/assets/logos/tedx_tapmi_logo.png" 
                alt="TEDxTAPMI Logo" 
                className="h-10 sm:h-12 w-auto object-contain" 
              />
            </div>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              TEDxTapmi is an independently organized TED event operated under official license from TED. Hosted at T. A. Pai Management Institute (TAPMI), Manipal, bringing together thought leaders, visionaries, and delegates.
            </p>
            <div className="text-[11px] font-bold text-[#E62B1E] uppercase tracking-widest pt-2 font-mono">
              Ideas Worth Spreading @ TAPMI Manipal
            </div>

            {/* IT Partner / Matrix Logo */}
            <div className="pt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">Official Technology Partner</span>
              <div className="bg-white/90 p-2 rounded-xl inline-block shadow-lg">
                <img 
                  src="/assets/logos/matrix_logo_tech_partner_solid.png" 
                  alt="Matrix - We make IT happen" 
                  className="h-10 sm:h-14 w-auto object-contain" 
                />
              </div>
            </div>
          </div>

          {/* Col 2: Site Pages Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 font-heading">Explore Pages</h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-400">
              <li><button onClick={() => scrollToPage('home')} className="hover:text-[#E62B1E] cursor-pointer">Home</button></li>
              <li><button onClick={() => scrollToPage('speakers')} className="hover:text-[#E62B1E] cursor-pointer">Past Speakers</button></li>
              <li><button onClick={() => scrollToPage('quiz')} className="hover:text-[#E62B1E] cursor-pointer">Speaker Quiz</button></li>
              <li><button onClick={() => scrollToPage('timeline')} className="hover:text-[#E62B1E] cursor-pointer">Past Event Timeline</button></li>
              <li><button onClick={() => scrollToPage('gallery')} className="hover:text-[#E62B1E] cursor-pointer">Photo Gallery</button></li>
              <li><button onClick={() => scrollToPage('register')} className="hover:text-[#E62B1E] cursor-pointer">Register Pass</button></li>
            </ul>
          </div>

          {/* Col 3: Social & Contact */}
          <div className="footer-social space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-300 font-heading">Connect With Us</h3>
            <div className="footer-icons flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/matrixtapmi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Matrix TAPMI on LinkedIn"
                title="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A35] text-gray-300 transition-all hover:border-[#E62B1E] hover:bg-[#E62B1E] hover:text-white hover:-translate-y-1"
              >
                <Linkedin size={19} strokeWidth={2} />
              </a>
              <a
                href="https://www.instagram.com/matrix_tapmi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Matrix TAPMI on Instagram"
                title="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A35] text-gray-300 transition-all hover:border-[#E62B1E] hover:bg-[#E62B1E] hover:text-white hover:-translate-y-1"
              >
                <Instagram size={19} strokeWidth={2} />
              </a>
              <a
                href="mailto:matrix@tapmi.edu.in"
                aria-label="Email Matrix TAPMI"
                title="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A35] text-gray-300 transition-all hover:border-[#E62B1E] hover:bg-[#E62B1E] hover:text-white hover:-translate-y-1"
              >
                <Mail size={19} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C1C24] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} TEDxTapmi. All rights reserved. This independent TEDx event is operated under license from TED.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">TED Guidelines</a>
            <a href="#" className="hover:text-white">TAPMI Manipal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
