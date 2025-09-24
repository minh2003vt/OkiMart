import React from 'react';
import { Home, Package, User } from 'lucide-react';
import { NavigationItem } from '@/types';

interface BottomNavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activePage,
  onNavigate,
}) => {
  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'orders',
      path: '/orders',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'profile',
      path: '/profile',
    },
  ];

  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`;
    
    switch (iconName) {
      case 'home':
        return <Home className={iconClass} />;
      case 'orders':
        return <Package className={iconClass} />;
      case 'profile':
        return <User className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`}
              aria-label={item.label}
            >
              {getIcon(item.icon, isActive)}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
