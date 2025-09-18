import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export default function Skeleton({ className = '', animate = true }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      animate={animate ? {
        opacity: [0.5, 1, 0.5],
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
