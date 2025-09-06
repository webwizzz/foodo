'use client';

import { useEffect } from 'react';

export const useStickyScale = () => {
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const statsSection = document.querySelector('[data-sticky-scale="stats"]') as HTMLElement;
      const clientsSection = document.querySelector('[data-sticky-scale="clients"]') as HTMLElement;
      const shardSection = document.querySelector('[data-sticky-scale="shard"]') as HTMLElement;
      
      if (!statsSection || !clientsSection || !shardSection) return;
      
      const viewportHeight = window.innerHeight;
      
      // Get initial positions
      const statsOffsetTop = statsSection.offsetTop;
      const clientsOffsetTop = clientsSection.offsetTop;
      const shardOffsetTop = shardSection.offsetTop;
      
      // Calculate how much each section is covering the previous one
      const statsRect = statsSection.getBoundingClientRect();
      const clientsRect = clientsSection.getBoundingClientRect();
      const shardRect = shardSection.getBoundingClientRect();
      
      // Handle Stats Section
      if (currentScrollY >= statsOffsetTop) {
        // Stats is sticky - calculate opacity based on clients coverage
        let statsOpacity = 1;
        
        if (clientsRect.top <= viewportHeight && clientsRect.top > 0) {
          // Clients is entering viewport - fade out stats
          const coverageProgress = (viewportHeight - clientsRect.top) / viewportHeight;
          statsOpacity = Math.max(0, 1 - coverageProgress);
        } else if (clientsRect.top <= 0) {
          // Clients has completely covered stats
          statsOpacity = 0;
        }
        
        // Scale down stats slightly (optional)
        const scrollPastStats = Math.max(0, currentScrollY - statsOffsetTop);
        const scaleDistance = 300;
        const scaleProgress = Math.min(scrollPastStats / scaleDistance, 1);
        const scaleValue = Math.max(0.9, 1 - scaleProgress * 0.1);
        
        statsSection.style.setProperty('transform', `scale(${scaleValue})`, 'important');
        statsSection.style.setProperty('opacity', statsOpacity.toString(), 'important');
        
        console.log('Stats opacity:', { statsOpacity, clientsTop: clientsRect.top, coverageProgress: clientsRect.top <= viewportHeight ? (viewportHeight - clientsRect.top) / viewportHeight : 0 });
      } else {
        // Reset stats when not sticky
        statsSection.style.setProperty('transform', 'scale(1)', 'important');
        statsSection.style.setProperty('opacity', '1', 'important');
      }
      
      // Handle Clients Section
      if (currentScrollY >= clientsOffsetTop) {
        // Clients is sticky - calculate opacity based on shard coverage
        let clientsOpacity = 1;
        
        if (shardRect.top <= viewportHeight && shardRect.top > 0) {
          // Shard is entering viewport - fade out clients
          const coverageProgress = (viewportHeight - shardRect.top) / viewportHeight;
          clientsOpacity = Math.max(0, 1 - coverageProgress);
        } else if (shardRect.top <= 0) {
          // Shard has completely covered clients
          clientsOpacity = 0;
        }
        
        // Scale down clients slightly (optional)
        const scrollPastClients = Math.max(0, currentScrollY - clientsOffsetTop);
        const scaleDistance = 300;
        const scaleProgress = Math.min(scrollPastClients / scaleDistance, 1);
        const scaleValue = Math.max(0.9, 1 - scaleProgress * 0.1);
        
        clientsSection.style.setProperty('transform', `scale(${scaleValue})`, 'important');
        clientsSection.style.setProperty('opacity', clientsOpacity.toString(), 'important');
        
        console.log('Clients opacity:', { clientsOpacity, shardTop: shardRect.top, coverageProgress: shardRect.top <= viewportHeight ? (viewportHeight - shardRect.top) / viewportHeight : 0 });
      } else {
        // Reset clients when not sticky
        clientsSection.style.setProperty('transform', 'scale(1)', 'important');
        clientsSection.style.setProperty('opacity', '1', 'important');
      }
    };
    
    // Initial call
    handleScroll();
    
    // Add scroll listener
    const scrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
    };
  }, []);
};
