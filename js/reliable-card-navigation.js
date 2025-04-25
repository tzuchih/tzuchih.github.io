/**
 * Reliable Card Navigation System
 * 
 * This script uses multiple techniques to ensure cards are immediately clickable:
 * 1. Native anchor overlays for standard link behavior
 * 2. Direct click interception for immediate response
 * 3. Global event delegation for catching all interactions
 * 4. Direct DOM manipulation to pre-enhance card elements
 */

(function() {
  // Configuration
  const cardSelectors = ['.quarto-grid-item', '.card.h-100', '.listing-card'];
  const linkSelectors = ['a.quarto-grid-link', 'a.listing-link', '.card-title a', 'h3.listing-title a'];
  
  // Main function to ensure all cards are navigable
  function makeCardsNavigable() {
    console.log('Applying reliable card navigation system');
    
    // 1. Apply crucial CSS immediately
    applyCardStyles();
    
    // 2. Make all existing cards clickable
    enhanceAllCards();
    
    // 3. Set up global click capture system
    setupGlobalClickHandler();
    
    // 4. Set up mutation observer to catch dynamically added cards
    setupMutationObserver();
  }
  
  // Apply CSS that ensures cards can be clicked
  function applyCardStyles() {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('id', 'reliable-card-navigation-css');
    styleEl.innerHTML = `
      /* Make cards appear clickable */
      ${cardSelectors.join(', ')} {
        cursor: pointer !important;
        position: relative !important;
        z-index: 1 !important;
        transition: background-color 0.1s ease !important;
      }
      
      /* Visual feedback on hover */
      ${cardSelectors.join(', ')}:hover {
        background-color: #f8f9fa !important;
      }
      
      /* Visual feedback on active */
      ${cardSelectors.join(', ')}:active {
        background-color: #f0f1f2 !important;
      }
      
      /* Full-card click overlay (native anchor) */
      .card-click-overlay {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 100 !important;
        opacity: 0 !important;
        cursor: pointer !important;
      }
      
      /* Ensure actual links stay on top of overlay */
      ${cardSelectors.join(', ')} a:not(.card-click-overlay),
      ${cardSelectors.join(', ')} button {
        position: relative !important;
        z-index: 101 !important;
      }
    `;
    
    // Insert at the top of the head for highest priority
    document.head.insertBefore(styleEl, document.head.firstChild);
  }
  
  // Process all cards on the page
  function enhanceAllCards() {
    // Get all card elements
    const cards = document.querySelectorAll(cardSelectors.join(', '));
    
    cards.forEach(card => enhanceSingleCard(card));
  }
  
  // Process a single card to make it reliably clickable
  function enhanceSingleCard(card) {
    // Skip if already processed
    if (card._reliableNavApplied) return;
    card._reliableNavApplied = true;
    
    // Find the destination link
    let destinationLink = null;
    for (let selector of linkSelectors) {
      const link = card.querySelector(selector);
      if (link && link.href) {
        destinationLink = link.href;
        break;
      }
    }
    
    // Skip if no link found
    if (!destinationLink) return;
    
    // 1. Create a native anchor overlay for standard click behavior
    const overlay = document.createElement('a');
    overlay.href = destinationLink;
    overlay.className = 'card-click-overlay';
    overlay.setAttribute('aria-label', 'View details');
    overlay.setAttribute('title', 'Click to view details');
    
    // 2. Set inline styles for maximum reliability
    overlay.setAttribute('style', `
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      z-index: 100 !important;
      opacity: 0 !important;
      cursor: pointer !important;
      background: transparent !important;
    `);
    
    // Add overlay to card
    card.appendChild(overlay);
    
    // 3. Store the destination in a data attribute for global handler
    card.setAttribute('data-card-destination', destinationLink);
    
    // 4. Add direct click handler as fallback
    card.addEventListener('click', function(e) {
      // Don't handle if clicking on actual interactive elements
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a:not(.card-click-overlay)') || 
          e.target.closest('button')) {
        return;
      }
      
      // Navigate immediately
      window.location.href = destinationLink;
    });
    
    // 5. Enhance cursor feedback
    card.style.cursor = 'pointer';
  }
  
  // Setup global event delegation for maximum capture reliability
  function setupGlobalClickHandler() {
    // Use capture phase to intercept clicks early
    document.addEventListener('click', function(e) {
      // Find if the click was on or within a card
      const cardEl = e.target.closest(cardSelectors.join(', '));
      if (!cardEl) return;
      
      // Skip if clicking an actual interactive element
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a:not(.card-click-overlay)') || 
          e.target.closest('button')) {
        return;
      }
      
      // Get destination URL from data attribute
      const destination = cardEl.getAttribute('data-card-destination');
      if (destination) {
        // Navigate immediately
        window.location.href = destination;
        
        // Prevent other handlers
        e.preventDefault();
        e.stopPropagation();
      }
    }, true); // Use capture phase
  }
  
  // Watch for dynamically added cards
  function setupMutationObserver() {
    // Create observer instance
    const observer = new MutationObserver(function(mutations) {
      let needsProcessing = false;
      
      // Check if any mutations added cards
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          needsProcessing = true;
        }
      });
      
      // Process all cards if needed
      if (needsProcessing) {
        enhanceAllCards();
      }
    });
    
    // Start observing the document with configured parameters
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Execute immediately
  makeCardsNavigable();
  
  // Also run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', makeCardsNavigable);
  }
  
  // Run on full page load
  window.addEventListener('load', makeCardsNavigable);
  
  // Run again with delays to catch late additions
  setTimeout(makeCardsNavigable, 300);
  setTimeout(makeCardsNavigable, 1000);
  
  // Expose for external use
  window.makeCardsNavigable = makeCardsNavigable;
})(); 