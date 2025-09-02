'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CurveLoader.module.css';

interface CurveLoaderProps {
  onLoadingComplete?: () => void;
  backgroundColor?: string;
  duration?: number;
  delay?: number;
}

export default function CurveLoader({ 
  onLoadingComplete, 
  backgroundColor = '#000000',
  duration = 600,
  delay = 500 
}: CurveLoaderProps) {
  const loader = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const initialCurve = 200;
  let start: number;

  useEffect(() => {
    setPath(initialCurve);
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const animate = (timestamp: number) => {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const newCurve = easeOutQuad(elapsed, initialCurve, -200, duration);
    setPath(newCurve);

    if (loader.current) {
      loader.current.style.top = easeOutQuad(elapsed, 0, -loaderHeight(), duration) + "px";
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      // Animation complete
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete?.();
      }, 100);
    }
  };

  const easeOutQuad = (time: number, start: number, end: number, duration: number) => {
    return -end * (time /= duration) * (time - 2) + start;
  };

  const loaderHeight = () => {
    if (!loader.current) return 0;
    const loaderBounds = loader.current.getBoundingClientRect();
    return loaderBounds.height;
  };

  const setPath = (curve: number) => {
    if (!path.current) return;
    const width = window.innerWidth;
    const height = loaderHeight();
    path.current.setAttributeNS(null, "d",
      `M0 0
      L${width} 0
      L${width} ${height}
      Q${width/2} ${height - curve} 0 ${height}
      L0 0`
    );
  };

  if (!isVisible) return null;

  return (
    <div ref={loader} className={styles.loader} style={{ backgroundColor }}>
      <svg>
        <path ref={path} fill={backgroundColor}></path>
      </svg>
    </div>
  );
}
