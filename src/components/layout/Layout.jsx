import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import StickyNotificationPanel from '../ui/StickyNotificationPanel';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notificationPanelRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} notificationPanelRef={notificationPanelRef} />
      
      {/* Sticky Notification Panel */}
      <StickyNotificationPanel ref={notificationPanelRef} />
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="lg:flex-shrink-0">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 transition-all duration-300">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 