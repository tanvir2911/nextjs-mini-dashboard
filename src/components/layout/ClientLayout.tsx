'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

interface ClientLayoutProps {
  children: ReactNode;
}

function MainContent({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <main 
      className={`min-h-screen transition-all duration-300 ease-in-out bg-gray-50 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-80'
      }`}
      style={{ 
        backgroundColor: '#f9fafb',
        minHeight: '100vh'
      }}
    >
      <div className="w-full min-h-screen bg-gray-50">
        {children}
      </div>
    </main>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </SidebarProvider>
  );
}
