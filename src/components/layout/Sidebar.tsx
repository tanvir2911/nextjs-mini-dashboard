'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Home, FileText, Users, Menu, X, ChevronLeft, User, LogIn, LogOut } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import Image from 'next/image';

export default function Sidebar() {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/posts', label: 'Posts', icon: FileText },
    { href: '/users', label: 'Users', icon: Users },
    ...(session ? [{ href: '/profile', label: 'Profile', icon: User }] : []),
  ];

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 },
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 },
  };

  const iconVariants = {
    expanded: { scale: 1 },
    collapsed: { scale: 1.1 },
  };

  return (
    <>
      <motion.button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {(isMobileOpen || !isCollapsed) && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="fixed left-0 top-0 h-full bg-white shadow-xl z-50 lg:z-40 border-r border-gray-200"
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        initial={false}
        style={{ 
          backgroundColor: 'white',
          minHeight: '100vh',
          height: '100vh'
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.h1
                  key="logo"
                  className="text-xl font-bold text-gray-900"
                  variants={itemVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.2 }}
                >
                  Mini Dashboard
                </motion.h1>
              )}
            </AnimatePresence>
            
            <div className="flex items-center space-x-2">
              <motion.button
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsCollapsed(!isCollapsed)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  variants={iconVariants}
                  animate={isCollapsed ? 'collapsed' : 'expanded'}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronLeft className={`w-5 h-5 text-gray-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
                </motion.div>
              </motion.button>
              
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <motion.div
                  key={item.href}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <motion.div
                      className={`p-2 rounded-lg ${
                        isActive ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-gray-200'
                      } transition-colors duration-200`}
                      variants={iconVariants}
                      animate={isCollapsed ? 'collapsed' : 'expanded'}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                    </motion.div>
                    
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          key="label"
                          className="ml-3 font-medium"
                          variants={itemVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-2">
            {/* Always show auth buttons for testing */}
            <div className="text-xs text-gray-500 mb-2">
              Auth Status: {session ? 'Logged in' : 'Not logged in'}
            </div>
            {session ? (
              <>
                <motion.div
                  className="flex items-center p-3 rounded-xl bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-8 h-8 rounded-full"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.div
                        key="user-info"
                        className="ml-3"
                        variants={itemVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {session.user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.user?.email}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                
                <motion.button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200"
                    variants={iconVariants}
                    animate={isCollapsed ? 'collapsed' : 'expanded'}
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        key="logout-label"
                        className="ml-3 font-medium"
                        variants={itemVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        transition={{ duration: 0.2 }}
                      >
                        Sign Out
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </>
            ) : (
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/auth/signin"
                  className="w-full flex items-center p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <motion.div
                    className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200"
                    variants={iconVariants}
                    animate={isCollapsed ? 'collapsed' : 'expanded'}
                  >
                    <LogIn className="w-5 h-5 text-gray-600" />
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        key="signin-label"
                        className="ml-3 font-medium"
                        variants={itemVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        transition={{ duration: 0.2 }}
                      >
                        Sign In
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
