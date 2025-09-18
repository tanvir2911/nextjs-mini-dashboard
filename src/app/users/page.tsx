'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { User } from '@/types';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Modal from '@/components/layout/Modal';
import { Mail, Phone, Globe, MapPin, Building, Search, ArrowLeft, Home } from 'lucide-react';

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [useInvalidEndpoint, setUseInvalidEndpoint] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const endpoint = useInvalidEndpoint 
    ? 'https://jsonplaceholder.typicode.com/invalid-users'
    : 'https://jsonplaceholder.typicode.com/users';
  
  const { data: users, loading, error, retry } = useFetch<User[]>(endpoint, {
    retryCount: useInvalidEndpoint ? 0 : 0, 
    retryDelay: 1000,
    timeout: 8000
  });

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchTerm) return users;
    
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };


  const rowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Users</h1>
            <p className="text-gray-600 mb-6">
              Manage and view user information. Click on any row to see detailed user information.
            </p>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setUseInvalidEndpoint(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !useInvalidEndpoint
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Load Users
              </button>
              <button
                onClick={() => setUseInvalidEndpoint(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  useInvalidEndpoint
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Simulate Error
              </button>
            </div>
          </motion.div>
          
          <ErrorMessage 
            message={error} 
            onRetry={() => {
              setUseInvalidEndpoint(false);
              retry();
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Users</h1>
          <p className="text-gray-600 mb-6">
            Manage and view user information. Click on any row to see detailed user information.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setUseInvalidEndpoint(false);
                  setSearchTerm('');
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !useInvalidEndpoint
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Load Users
              </button>
              <button
                onClick={() => {
                  setUseInvalidEndpoint(true);
                  setSearchTerm('');
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  useInvalidEndpoint
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Simulate Error
              </button>
            </div>
          </div>
          
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-sm text-gray-600"
            >
              Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} matching &quot;{searchTerm}&quot;
            </motion.div>
          )}
        </motion.div>

        {filteredUsers.length === 0 && searchTerm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers?.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      variants={rowVariants}
                      className="hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                      onClick={() => setSelectedUser(user)}
                      whileHover={{ 
                        scale: 1.005,
                        backgroundColor: 'rgba(249, 250, 251, 0.8)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.998 }}
                      initial="hidden"
                      animate="visible"
                      transition={{ 
                        delay: index * 0.02,
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.company.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.phone}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          </motion.div>
        )}

        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title={selectedUser?.name}
        >
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedUser.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedUser.name}
                  </h3>
                  <p className="text-gray-600">@{selectedUser.username}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{selectedUser.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{selectedUser.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{selectedUser.website}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{selectedUser.company.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {selectedUser.address.city}, {selectedUser.address.zipcode}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Company Info</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedUser.company.catchPhrase}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedUser.company.bs}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
