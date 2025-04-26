/**
 * Robust Card Click Enhancement Script
 * 
 * This script ensures grid cards are reliably clickable across all devices
 * and browsers by implementing multiple redundant mechanisms.
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Card click fix script loaded");
  
  // Find all cards that should be clickable
  const makeCardsClickable = function() {
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    if (cards.length === 0) {
      console.log("No cards found yet, retrying in 500ms");
      setTimeout(makeCardsClickable, 500);
      return;
    }
    
    console.log(`Found ${cards.length} cards to make clickable`);
    
    cards.forEach(function(card) {
      // Skip if already processed
      if (card.dataset.clickableProcessed === 'true') {
        return;
      }
      
      // Mark as processed to avoid duplicate event listeners
      card.dataset.clickableProcessed = 'true';
      
      // Find the link inside the card
      const cardTitle = card.querySelector('.listing-title, .card-title');
      const existingLinks = card.querySelectorAll('a');
      let targetLink = null;
      
      // Priority 1: Try to find the most appropriate link
      if (cardTitle && cardTitle.querySelector('a')) {
        targetLink = cardTitle.querySelector('a').getAttribute('href');
      } else if (existingLinks.length > 0) {
        // Use the first link if title link not available
        targetLink = existingLinks[0].getAttribute('href');
      }
      
      if (!targetLink) {
        console.log("Could not find link for card", card);
        return;
      }
      
      // Method 1: Set cursor style to indicate clickability
      card.style.cursor = 'pointer';
      
      // Method 2: Set position relative for proper event handling
      card.style.position = 'relative';
      
      // Method 3: Add click event with passive and capture options
      card.addEventListener('click', function(event) {
        // Don't trigger if the click was on a link or button
        if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
          return;
        }
        
        // Don't trigger if user was selecting text
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
          return;
        }
        
        // Navigate to the link
        window.location.href = targetLink;
      }, { passive: false, capture: false });
      
      // Method 4: Create an overlay element for touch devices
      const overlay = document.createElement('div');
      overlay.className = 'card-click-overlay';
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.zIndex = '1';
      
      // Method 5: Add touch events
      overlay.addEventListener('touchend', function(event) {
        // Prevent default to avoid double-triggering
        event.preventDefault();
        window.location.href = targetLink;
      }, { passive: false });
      
      // Method 6: Add pointer events to overlay
      overlay.style.pointerEvents = 'auto';
      
      // Don't block clicks on actual links
      existingLinks.forEach(function(link) {
        link.style.position = 'relative';
        link.style.zIndex = '2';
      });
      
      // Add the overlay to the card
      card.appendChild(overlay);
      
      // Method 7: Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', cardTitle ? cardTitle.textContent.trim() : 'View project');
      
      card.addEventListener('keydown', function(event) {
        // Navigate on Enter or Space key
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          window.location.href = targetLink;
        }
      });
      
      // Log successful processing
      console.log("Card made clickable:", targetLink);
    });
  };
  
  // Execute on DOM ready and after a short delay to catch dynamically loaded cards
  makeCardsClickable();
  setTimeout(makeCardsClickable, 1000);
  setTimeout(makeCardsClickable, 2500);
  
  // Also handle cards that might be loaded dynamically later
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        makeCardsClickable();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Ensure cards are clickable even after any potential page changes or AJAX updates
  window.addEventListener('load', makeCardsClickable);
  
  // Check periodically to ensure all cards are properly clickable
  setInterval(function() {
    // Find any cards that haven't been processed
    const unprocessedCards = document.querySelectorAll('.quarto-grid-item:not([data-clickable-processed]), .card.h-100:not([data-clickable-processed])');
    if (unprocessedCards.length > 0) {
      console.log(`Found ${unprocessedCards.length} unprocessed cards, making them clickable`);
      makeCardsClickable();
    }
  }, 5000);
}); 