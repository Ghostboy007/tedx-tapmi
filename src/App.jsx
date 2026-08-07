import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { SideNavDock } from './components/SideNavDock';
import { AIChatbot } from './components/AIChatbot';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { SpeakersPage } from './pages/SpeakersPage';
import { QuizPage } from './pages/QuizPage';
import { TimelinePage } from './pages/TimelinePage';
import { GalleryPage } from './pages/GalleryPage';
import { RegisterPage } from './pages/RegisterPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'speakers', 'quiz', 'timeline', 'gallery', 'register'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToPage = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId === 'home' ? '' : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'speakers':
        return <SpeakersPage setCurrentPage={navigateToPage} />;
      case 'quiz':
        return <QuizPage setCurrentPage={navigateToPage} />;
      case 'timeline':
        return <TimelinePage setCurrentPage={navigateToPage} />;
      case 'gallery':
        return <GalleryPage setCurrentPage={navigateToPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={navigateToPage} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#E62B1E] selection:text-white">
      <Navbar currentPage={currentPage} setCurrentPage={navigateToPage} />
      <SideNavDock currentPage={currentPage} setCurrentPage={navigateToPage} />

      <main className="flex-1 relative z-10">
        {renderCurrentPage()}
      </main>

      <AIChatbot />
      <Footer setCurrentView={navigateToPage} />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
