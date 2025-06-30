import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Home, Calendar, Heart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/meal-plan', icon: Calendar, label: 'Meal Plan' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <ChefHat className="w-8 h-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SmartChef</span>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon
                        className={cn(
                          'mr-3 h-5 w-5 flex-shrink-0',
                          isActive ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500'
                        )}
                      />
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-emerald-500 rounded-full"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <motion.div
                  className="flex flex-col items-center py-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 mb-1',
                      isActive ? 'text-emerald-600' : 'text-gray-400'
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs',
                      isActive ? 'text-emerald-600 font-medium' : 'text-gray-500'
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 w-8 h-0.5 bg-emerald-600 rounded-full"
                      layoutId="mobileActiveIndicator"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;