import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/ui/BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/orders')) return 'orders';
    if (path.startsWith('/profile')) return 'profile';
    return 'home';
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-24 pt-0">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <BottomNavigation
          activePage={getActivePage()}
          onNavigate={handleNavigation}
        />
      </div>
    </div>
  );
};

export default MainLayout;
