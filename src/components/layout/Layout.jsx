import React, { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import StickyNotificationPanel from '../ui/StickyNotificationPanel';

const Layout = ({ children }) => {
  const notificationPanelRef = useRef(null);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Conditional Navigation - Navbar for guests, Sidebar for authenticated users */}
      {!isAuthenticated() ? (
        <>
          {/* Navbar - Only for guests */}
          <Navbar onMenuClick={() => {}} notificationPanelRef={notificationPanelRef} />
          
          {/* Sticky Notification Panel */}
          <StickyNotificationPanel ref={notificationPanelRef} />
          
          {/* Main Content with top padding for fixed navbar */}
          <main className="flex-1 pt-16 transition-all duration-300">
            {children}
          </main>
        </>
      ) : (
        <>
          {/* Sticky Notification Panel for authenticated users */}
          <StickyNotificationPanel ref={notificationPanelRef} />
          
          <div className="flex flex-1">
            {/* Sidebar - Only for authenticated users */}
            <div className="flex-shrink-0">
              <Sidebar />
            </div>
            
            {/* Main Content without top padding (no fixed navbar) */}
            <main className="flex-1 transition-all duration-300">
              {children}
            </main>
          </div>
        </>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 