/**
 * Page Load Anti-Glitch Fix
 * 
 * This script prevents white flashes and glitches when loading the projects page
 * by applying critical styles immediately during page load.
 */

(function() {
  // Inject critical CSS as early as possible
  const criticalCSS = `
    .quarto-grid-item, .card.h-100 {
      opacity: 0 !important;
      visibility: hidden !important;
      transform: translateZ(0) !important;
      will-change: opacity, transform !important;
      transition: none !important;
    }
    
    body::before {
      content: "" !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background-color: white !important;
      z-index: 9999 !important;
      opacity: 1 !important;
      transition: opacity 0.3s ease !important;
    }
  `;

  // Create and inject style tag immediately
  const styleTag = document.createElement('style');
  styleTag.id = 'anti-glitch-critical-css';
  styleTag.textContent = criticalCSS;
  document.head.appendChild(styleTag);

  // Function to reveal content smoothly
  function revealContent() {
    // First remove the overlay
    const overlay = document.querySelector('#anti-glitch-critical-css');
    if (overlay) {
      overlay.textContent = `
        body::before {
          opacity: 0 !important;
        }
        
        .quarto-grid-item, .card.h-100 {
          opacity: 0 !important;
          transform: translateY(10px) translateZ(0) !important;
          transition: opacity 0.4s ease, transform 0.4s ease !important;
        }
      `;
      
      // After a short delay, reveal cards with staggered animation
      setTimeout(() => {
        const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.transform = 'translateY(0) translateZ(0)';
          }, index * 30); // Staggered effect
        });
        
        // Remove the overlay style completely after animations
        setTimeout(() => {
          overlay.remove();
        }, cards.length * 30 + 500);
      }, 50);
    }
  }
  
  // Helper function to ensure styles are properly applied
  function applyComprehensiveCardStyles() {
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    cards.forEach(card => {
      // Force stable card properties during load
      card.style.cssText = `
        height: 480px !important;
        min-height: 480px !important;
        max-height: 480px !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        position: relative !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        background-color: white !important;
        transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important;
        transform: translateZ(0) !important;
        backface-visibility: hidden !important;
        will-change: transform, box-shadow !important;
        perspective: 1000px !important;
      `;
    });
  }

  // Run on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyComprehensiveCardStyles();
      setTimeout(revealContent, 100);
    });
  } else {
    // If DOMContentLoaded already fired, run immediately
    applyComprehensiveCardStyles();
    setTimeout(revealContent, 100);
  }
  
  // Also run on full page load to catch any late resources
  window.addEventListener('load', function() {
    applyComprehensiveCardStyles();
  });
})(); 