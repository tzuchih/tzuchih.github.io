/**
 * Universal Card Click System
 * 
 * Cross-browser compatible solution that works on all devices and browsers.
 * Uses multiple redundant techniques to guarantee clickability.
 */

(function() {
  // Configuration
  const cardSelectors = ['.quarto-grid-item', '.card.h-100', '.listing-card', '.card', '[class*="card"]'];
  const linkSelectors = ['a.quarto-grid-link', 'a.listing-link', '.card-title a', 'h3.listing-title a', 'a', '.card a', '.card-body a'];
  
  // Main function to ensure all cards are navigable
  function makeCardsNavigable() {
    console.log('Applying universal card click system');
    
    // 1. Apply core CSS directly in head for maximum priority
    injectCriticalCSS();
    
    // 2. Process all existing cards
    processAllCards();
    
    // 3. Set up multiple redundant global handlers
    setupGlobalHandlers();
    
    // 4. Watch for new cards
    observeDOMChanges();
    
    // 5. Make cards accessible for keyboard users
    enhanceAccessibility();
  }
  
  // Inject critical CSS at the very top of head
  function injectCriticalCSS() {
    const css = `
      /* Universal click styles with maximum priority */
      ${cardSelectors.join(', ')} {
        cursor: pointer !important;
        position: relative !important;
        z-index: 1 !important;
        -webkit-tap-highlight-color: rgba(0,0,0,0.1) !important;
        user-select: none !important;
        transition: background-color 0.05s ease-out !important;
      }
      
      /* Visual feedback */
      ${cardSelectors.join(', ')}:hover {
        background-color: rgba(0,0,0,0.02) !important;
      }
      
      ${cardSelectors.join(', ')}:active {
        background-color: rgba(0,0,0,0.05) !important;
      }
      
      /* Allow text selection in content */
      ${cardSelectors.join(', ')} p,
      ${cardSelectors.join(', ')} h1,
      ${cardSelectors.join(', ')} h2,
      ${cardSelectors.join(', ')} h3,
      ${cardSelectors.join(', ')} h4,
      ${cardSelectors.join(', ')} h5,
      ${cardSelectors.join(', ')} span,
      ${cardSelectors.join(', ')} div {
        user-select: text;
      }
      
      /* Full-page invisible link overlay */
      .universal-card-overlay {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 999 !important;
        background: transparent !important;
        cursor: pointer !important;
        -webkit-tap-highlight-color: rgba(0,0,0,0.1) !important;
      }
      
      /* Ensure actual links are accessible */
      ${cardSelectors.join(', ')} a:not(.universal-card-overlay),
      ${cardSelectors.join(', ')} button {
        position: relative !important;
        z-index: 1000 !important;
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'universal-card-click-css';
    styleEl.textContent = css;
    
    // Add to very top of head
    if (document.head.firstChild) {
      document.head.insertBefore(styleEl, document.head.firstChild);
    } else {
      document.head.appendChild(styleEl);
    }
  }
  
  // Process all cards on the page
  function processAllCards() {
    // Get all cards with various selectors for maximum coverage
    const allCards = [];
    
    // Add cards from each selector
    cardSelectors.forEach(selector => {
      const cards = document.querySelectorAll(selector);
      cards.forEach(card => {
        if (!allCards.includes(card)) {
          allCards.push(card);
        }
      });
    });
    
    // Process each unique card
    allCards.forEach(card => {
      makeCardClickable(card);
    });
    
    console.log(`Processed ${allCards.length} cards for clickability`);
  }
  
  // Make a single card clickable using multiple techniques
  function makeCardClickable(card) {
    // Skip if already processed
    if (card._universalClickApplied) return;
    card._universalClickApplied = true;
    
    // Find target link
    let targetURL = null;
    
    // Try each link selector in order
    for (let selector of linkSelectors) {
      const links = card.querySelectorAll(selector);
      for (let link of links) {
        if (link && link.href && !link.classList.contains('universal-card-overlay')) {
          targetURL = link.href;
          break;
        }
      }
      if (targetURL) break;
    }
    
    // If no link found, check parent
    if (!targetURL && card.parentElement) {
      for (let selector of linkSelectors) {
        const links = card.parentElement.querySelectorAll(selector);
        for (let link of links) {
          if (link && link.href) {
            targetURL = link.href;
            break;
          }
        }
        if (targetURL) break;
      }
    }
    
    // Skip if no target URL found
    if (!targetURL) return;
    
    // Store URL as data attribute for event delegation
    card.setAttribute('data-card-url', targetURL);
    
    // TECHNIQUE 1: Add transparent anchor overlay
    const overlay = document.createElement('a');
    overlay.href = targetURL;
    overlay.className = 'universal-card-overlay';
    overlay.setAttribute('aria-label', 'View details');
    overlay.setAttribute('title', 'Click to view details');
    overlay.setAttribute('tabindex', '-1'); // Don't interfere with tab navigation
    
    // Set critical inline styles for maximum browser compatibility
    overlay.setAttribute('style', `
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      z-index: 999 !important;
      background: transparent !important;
      opacity: 0.01 !important; /* Nearly invisible but still clickable */
      cursor: pointer !important;
      -webkit-tap-highlight-color: rgba(0,0,0,0.1) !important;
    `);
    
    // Add the overlay to the card
    card.appendChild(overlay);
    
    // TECHNIQUE 2: Add multiple native event handlers directly to card
    // Click event
    card.addEventListener('click', function(e) {
      if (shouldIgnoreEvent(e)) return;
      window.location.href = targetURL;
    });
    
    // Touch events for mobile
    card.addEventListener('touchend', function(e) {
      if (shouldIgnoreEvent(e)) return;
      window.location.href = targetURL;
    });
    
    // TECHNIQUE 3: Add keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', 'Click to view details');
    
    // Keyboard support
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        window.location.href = targetURL;
        e.preventDefault();
      }
    });
    
    // Visual style enhancements
    card.style.cursor = 'pointer';
  }
  
  // Helper to determine if a click/touch should be ignored
  function shouldIgnoreEvent(e) {
    // Don't navigate if clicking on an actual interactive element
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' ||
        e.target.tagName === 'TEXTAREA' || e.target.tagName === 'LABEL' ||
        e.target.closest('a:not(.universal-card-overlay)') || 
        e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('select') ||
        e.target.closest('textarea') ||
        e.target.closest('label')) {
      return true;
    }
    
    // Don't navigate on text selection
    if (window.getSelection && window.getSelection().toString()) {
      return true;
    }
    
    return false;
  }
  
  // Set up global event handlers for maximum coverage
  function setupGlobalHandlers() {
    // Global click delegation (capture phase for earliest interception)
    document.addEventListener('click', function(e) {
      // Find the closest card
      let cardEl = null;
      for (let selector of cardSelectors) {
        const foundCard = e.target.closest(selector);
        if (foundCard) {
          cardEl = foundCard;
          break;
        }
      }
      
      if (!cardEl) return;
      
      // Skip for interactive elements
      if (shouldIgnoreEvent(e)) return;
      
      // Get target URL
      const targetURL = cardEl.getAttribute('data-card-url');
      if (targetURL) {
        // Visual feedback
        cardEl.style.backgroundColor = 'rgba(0,0,0,0.05)';
        
        // Navigate
        window.location.href = targetURL;
        
        // Prevent default behavior
        e.preventDefault();
        e.stopPropagation();
      }
    }, true); // Use capture phase
    
    // Global touch handling for mobile devices
    document.addEventListener('touchend', function(e) {
      // Find the closest card
      let cardEl = null;
      for (let selector of cardSelectors) {
        const foundCard = e.target.closest(selector);
        if (foundCard) {
          cardEl = foundCard;
          break;
        }
      }
      
      if (!cardEl) return;
      
      // Skip for interactive elements
      if (shouldIgnoreEvent(e)) return;
      
      // Get target URL
      const targetURL = cardEl.getAttribute('data-card-url');
      if (targetURL) {
        // Visual feedback
        cardEl.style.backgroundColor = 'rgba(0,0,0,0.05)';
        
        // Navigate
        window.location.href = targetURL;
        
        // Prevent default behavior
        e.preventDefault();
        e.stopPropagation();
      }
    }, true); // Use capture phase
  }
  
  // Watch for DOM changes to process new cards
  function observeDOMChanges() {
    if (!window.MutationObserver) return;
    
    const observer = new MutationObserver(function(mutations) {
      let needsProcessing = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          needsProcessing = true;
        }
      });
      
      if (needsProcessing) {
        setTimeout(processAllCards, 100); // Slight delay to ensure DOM is stable
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Enhance keyboard accessibility
  function enhanceAccessibility() {
    // Add instructions for screen readers
    const srInstruction = document.createElement('div');
    srInstruction.setAttribute('role', 'status');
    srInstruction.setAttribute('aria-live', 'polite');
    srInstruction.className = 'sr-only';
    srInstruction.style.position = 'absolute';
    srInstruction.style.width = '1px';
    srInstruction.style.height = '1px';
    srInstruction.style.overflow = 'hidden';
    srInstruction.textContent = 'Cards are clickable. Press Enter to view details.';
    document.body.appendChild(srInstruction);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(srInstruction);
    }, 3000);
  }
  
  // Execute immediately
  if (document.readyState === 'loading') {
    // DOM not ready, add event listener
    document.addEventListener('DOMContentLoaded', function() {
      makeCardsNavigable();
    });
  } else {
    // DOM is ready, execute now
    makeCardsNavigable();
  }
  
  // Also run on window load
  window.addEventListener('load', makeCardsNavigable);
  
  // Run multiple times to catch dynamic content
  setTimeout(makeCardsNavigable, 500);
  setTimeout(makeCardsNavigable, 1500);
  setTimeout(makeCardsNavigable, 3000);
  
  // Expose function globally so it can be called from elsewhere
  window.makeCardsNavigable = makeCardsNavigable;
})(); 