/**
 * Card Click Fix - ENHANCED VERSION
 * 
 * This script ensures cards are immediately clickable with no delay.
 * Uses direct event capture at the document level for maximum reliability.
 */

(function() {
  // Function to make cards instantly clickable
  function fixCardClicks() {
    console.log("Applying high-priority card click fix");
    
    // Get all cards
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    // Create a mapping of elements to their target URLs
    const clickTargets = new Map();
    
    cards.forEach(function(card) {
      // Skip if already processed with this specific fix
      if (card._clickFixApplied) return;
      card._clickFixApplied = true;
      
      // Apply direct styles for immediate effect
      card.setAttribute('style', 'cursor: pointer !important; position: relative !important; z-index: 1 !important;');
      
      // Find the link for this card
      const cardLink = card.querySelector('a.quarto-grid-link') || 
                      card.querySelector('a.listing-link') ||
                      card.querySelector('.card-title a') ||
                      card.parentElement.querySelector('a.quarto-grid-link');
      
      if (!cardLink) return;
      
      const href = cardLink.getAttribute('href');
      if (!href) return;
      
      // Store reference in the mapping
      clickTargets.set(card, href);
      
      // Create a completely transparent clickable overlay that sits on top of everything
      const overlay = document.createElement('a');
      overlay.href = href; // Make it a real link
      overlay.className = 'card-click-overlay';
      overlay.setAttribute('style', `
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 1000 !important;
        cursor: pointer !important;
        background-color: transparent !important;
        opacity: 0 !important;
        text-decoration: none !important;
      `);
      
      // Add to card
      card.appendChild(overlay);
    });
    
    // Add a document-level event listener for maximum capture reliability
    document.addEventListener('click', function(e) {
      // Find the closest card parent
      const cardEl = e.target.closest('.quarto-grid-item, .card.h-100');
      
      if (!cardEl) return;
      
      // Don't proceed if clicking on an actual link or button
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a:not(.card-click-overlay)') || e.target.closest('button')) {
        return;
      }
      
      // Get the target URL from our mapping
      const targetUrl = clickTargets.get(cardEl);
      if (targetUrl) {
        // Add visual feedback
        cardEl.style.backgroundColor = '#f0f1f2';
        
        // Navigate immediately
        window.location.href = targetUrl;
        
        // Prevent any other handlers
        e.preventDefault();
        e.stopPropagation();
      }
    }, true); // Use capture phase for earliest possible handling
  }
  
  // Function to fix card styles for better clickability
  function fixCardStyles() {
    // Create a style element for high-priority fixes
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      /* Core clickability fixes with maximum priority */
      .quarto-grid-item, .card.h-100 {
        cursor: pointer !important;
        position: relative !important;
        z-index: 1 !important;
      }
      
      /* Make cards visually clickable */
      .quarto-grid-item:hover, .card.h-100:hover {
        background-color: #f8f9fa !important;
      }
      
      /* Ensure links are clickable */
      .quarto-grid-item a, .card.h-100 a {
        position: relative !important;
        z-index: 2 !important;
      }
      
      /* Card click overlay */
      .card-click-overlay {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 1000 !important;
      }
    `;
    
    // Add to document head with high priority
    document.head.insertBefore(styleEl, document.head.firstChild);
  }
  
  // Run immediately
  fixCardStyles();
  fixCardClicks();
  
  // Also run when DOM content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      fixCardStyles();
      fixCardClicks();
    });
  }
  
  // Run after all resources are loaded
  window.addEventListener('load', function() {
    fixCardStyles();
    fixCardClicks();
    
    // Run again with delays to catch any dynamically added cards
    setTimeout(fixCardClicks, 200);
    setTimeout(fixCardClicks, 600);
    setTimeout(fixCardClicks, 1200);
  });
})(); 