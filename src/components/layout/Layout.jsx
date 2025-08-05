import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import StickyNotificationPanel from '../ui/StickyNotificationPanel';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notificationPanelRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} notificationPanelRef={notificationPanelRef} />
      
      {/* Sticky Notification Panel */}
      <StickyNotificationPanel ref={notificationPanelRef} />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="lg:flex-shrink-0">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 