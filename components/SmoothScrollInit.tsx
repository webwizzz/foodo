'use client';
import { useEffect } from 'react';

export default function SmoothScrollInit() {
  useEffect(() => {
    // Enable smooth scrolling behavior
    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';

    // Optional: Add some CSS for smoother scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #1a1a1a;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #404040;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #606060;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
