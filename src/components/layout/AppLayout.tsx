import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  currentRoute?: 'main' | 'admin';
  onNavigate?: (route: string) => void;
  sidebar?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, currentRoute = 'main', onNavigate, sidebar }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentRoute={currentRoute} onNavigate={onNavigate} />
      <div className="flex flex-1 w-full max-w-full">
        <main className="flex-1 px-4 py-8 overflow-y-auto">
          {children}
        </main>
        {sidebar && (
          <aside className="w-[400px] border-l bg-white shadow-lg h-[calc(100vh-64px-64px)] sticky top-[64px] overflow-y-auto hidden lg:block">
            {sidebar}
          </aside>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;