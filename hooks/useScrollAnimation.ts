'use client';
import { useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "-100px 0px"
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls };
};

export const slideInFromLeft = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const slideInFromRight = {
  hidden: { 
    x: 100, 
    opacity: 0 
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const fadeInUp = {
  hidden: { 
    y: 50, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const fadeIn = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
  },
};

export const scaleIn = {
  hidden: { 
    scale: 0.8, 
    opacity: 0 
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};
