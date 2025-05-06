import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  currentRoute?: 'main' | 'admin';
  onNavigate?: (route: string) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, currentRoute = 'main', onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentRoute={currentRoute} onNavigate={onNavigate} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;