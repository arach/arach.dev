'use client';

import { motion } from "framer-motion";

// Animation variants for home page components
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const cardHover = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export const buttonHover = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.1 }
  }
};

// Animation utilities
export const createStaggerAnimation = (delay: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
});

export const createFadeInAnimation = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const directionMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };

  return {
    initial: { opacity: 0, ...directionMap[direction] },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.5 }
  };
};


