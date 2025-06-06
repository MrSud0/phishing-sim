// Create: src/components/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url("/wallpaper_login.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        imageRendering: 'high-quality'
      }}
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: '#2E3E4B', opacity: 0.3 }}></div>
      
      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;