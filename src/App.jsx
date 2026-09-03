import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SOSButton from './components/SOSButton';

import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import PlaceDetails from './pages/PlaceDetails';
import AddReview from './pages/AddReview';
import About from './pages/About';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import LegalRights from './pages/LegalRights';
import EmergencyContacts from './pages/EmergencyContacts';
import SafetyTips from './pages/SafetyTips';
import Complaints from './pages/Complaints';

/**
 * ScrollToTop helper component to reset scroll position on route changes
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-violet-500 selection:text-white relative">
        
        {/* Reusable Navigation Header */}
        <Navbar />

        {/* Dynamic Route View Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            <Route path="/add-review" element={<AddReview />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/legal-rights" element={<LegalRights />} />
            <Route path="/emergency-contacts" element={<EmergencyContacts />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Floating Global SOS Emergency Button */}
        <SOSButton variant="floating" />

        {/* Global Dark Blue Footer */}
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}
