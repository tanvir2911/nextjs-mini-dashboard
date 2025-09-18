'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Users, FileText, BarChart3, Activity, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';
import { User, Post } from '@/types';

export default function Home() {
  const { data: users, loading: usersLoading } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');
  const { data: posts, loading: postsLoading } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');
  
  const stats = [
    { 
      label: 'Total Users', 
      value: usersLoading ? '...' : (users?.length?.toString() || '10'), 
      icon: Users, 
      change: '+12%',
      color: 'blue'
    },
    { 
      label: 'Posts Published', 
      value: postsLoading ? '...' : (posts?.length?.toString() || '100'), 
      icon: FileText, 
      change: '+8%',
      color: 'green'
    },
    { 
      label: 'Active Sessions', 
      value: '2,847', 
      icon: Activity, 
      change: '+15%',
      color: 'purple'
    },
    { 
      label: 'Performance', 
      value: '94%', 
      icon: Zap, 
      change: '+3%',
      color: 'orange'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Mini Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A modern dashboard built with Next.js 15, TypeScript, and Framer Motion.
              Explore posts, users, and analytics in a beautiful, animated interface.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Card className="text-center relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className={`flex items-center justify-center w-14 h-14 ${getColorClasses(stat.color)} rounded-xl mx-auto mb-4 relative z-10`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <motion.div 
                      className="text-3xl font-bold text-gray-900 mb-2 relative z-10"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                    >
                      {stat.value === '...' ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        stat.value
                      )}
                    </motion.div>
                    <p className="text-gray-600 mb-3 font-medium relative z-10">{stat.label}</p>
                    <motion.span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 relative z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                    >
                      {stat.change}
                    </motion.span>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Activity
                  </h2>
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="space-y-4">
                  {[
                    { action: 'New user registered', time: '2 minutes ago', type: 'user' },
                    { action: 'Post published', time: '5 minutes ago', type: 'post' },
                    { action: 'Analytics updated', time: '10 minutes ago', type: 'analytics' },
                    { action: 'System backup completed', time: '1 hour ago', type: 'system' },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.8,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'user' ? 'bg-blue-500' :
                          activity.type === 'post' ? 'bg-green-500' :
                          activity.type === 'analytics' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <span className="text-gray-700 font-medium">{activity.action}</span>
                      </div>
                      <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                        {activity.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'View Posts', href: '/posts', color: 'bg-blue-500', icon: FileText },
                    { label: 'Manage Users', href: '/users', color: 'bg-green-500', icon: Users },
                    { label: 'Analytics', href: '#', color: 'bg-purple-500', icon: BarChart3 },
                    { label: 'Settings', href: '#', color: 'bg-gray-500', icon: TrendingUp },
                  ].map((action, index) => {
                    const Icon = action.icon;
                    const isExternal = action.href.startsWith('#');
                    
                    if (isExternal) {
                      return (
                        <motion.button
                          key={action.label}
                          className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group w-full text-left"
                          whileHover={{ x: 8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: index * 0.1 + 0.8,
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                        >
                          <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                              {action.label}
                            </span>
                            <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                              {action.label === 'View Posts' ? 'Browse all posts' :
                               action.label === 'Manage Users' ? 'User management' :
                               action.label === 'Analytics' ? 'View insights' :
                               'System settings'}
                            </p>
                          </div>
                        </motion.button>
                      );
                    }
                    
                    return (
                      <motion.div
                        key={action.label}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.8,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <Link
                          href={action.href}
                          className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                              {action.label}
                            </span>
                            <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                              {action.label === 'View Posts' ? 'Browse all posts' :
                               action.label === 'Manage Users' ? 'User management' :
                               action.label === 'Analytics' ? 'View insights' :
                               'System settings'}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}