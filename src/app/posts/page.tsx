'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { Post } from '@/types';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Search, ArrowLeft, Home } from 'lucide-react';

export default function PostsPage() {
  const [useInvalidEndpoint, setUseInvalidEndpoint] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const endpoint = useInvalidEndpoint 
    ? 'https://jsonplaceholder.typicode.com/invalid-posts'
    : 'https://jsonplaceholder.typicode.com/posts';
  
  const { data: posts, loading, error, retry } = useFetch<Post[]>(endpoint, {
    retryCount: useInvalidEndpoint ? 0 : 0, 
    retryDelay: 1000,
    timeout: 8000
  });

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!searchTerm) return posts;
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Posts</h1>
            <p className="text-gray-600 mb-6">
              Explore all posts from our community. Click on any post to read more details.
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
                Load Posts
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Posts</h1>
          <p className="text-gray-600 mb-6">
            Explore all posts from our community. Click on any post to read more details.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
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
                Load Posts
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
              Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching &quot;{searchTerm}&quot;
            </motion.div>
          )}
        </motion.div>

        {filteredPosts.length === 0 && searchTerm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts?.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link href={`/posts/${post.id}`}>
                <Card className="h-full cursor-pointer relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.span 
                        className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                      >
                        Post #{post.id}
                      </motion.span>
                      <motion.span 
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                      >
                        User {post.userId}
                      </motion.span>
                    </div>
                    
                    <motion.h2 
                      className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.4 }}
                    >
                      {post.title}
                    </motion.h2>
                    
                    <motion.p 
                      className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.5 }}
                    >
                      {post.body}
                    </motion.p>
                    
                    <motion.div 
                      className="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-800 transition-colors"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.6 }}
                    >
                      <span>Read more</span>
                      <motion.span 
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
