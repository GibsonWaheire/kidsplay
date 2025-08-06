import React from 'react';
import { useAuth } from '../../context/AuthContext';

const PageContainer = ({ children, className = "" }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className={`
      ${isAuthenticated() 
        ? "px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 max-w-none" 
        : "max-w-7xl mx-auto px-6"
      } 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default PageContainer;