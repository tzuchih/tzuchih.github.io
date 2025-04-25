/**
 * Card Click Enhancement
 *
 * This script improves card clickability by:
 * 1. Making the entire card a clear click target
 * 2. Adding subtle visual feedback on click
 * 3. Immediately triggering navigation on click
 */

(function() {
  // Improved card click handler with better UX
  function handleCardClicks() {
    // Target cards
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    cards.forEach(function(card) {
      // Skip if already processed
      if (card._clickHandled) return;
      card._clickHandled = true;
      
      // Find link
      const cardLink = card.querySelector('a.quarto-grid-link') || 
                      card.querySelector('a.listing-link') ||
                      card.querySelector('.card-title a') ||
                      card.parentElement.querySelector('a.quarto-grid-link');
      
      if (!cardLink) return;
      
      const href = cardLink.getAttribute('href');
      
      // Make card visually clickable by adding cursor style
      card.style.cursor = 'pointer';
      
      // Add visual feedback on hover
      card.style.transition = 'background-color 0.1s ease';
      card.addEventListener('mouseenter', function() {
        card.style.backgroundColor = '#f8f9fa';
      });
      card.addEventListener('mouseleave', function() {
        card.style.backgroundColor = '';
      });
      
      // Add more robust click handling
      card.addEventListener('mousedown', function(e) {
        // Provide visual feedback on click
        card.style.backgroundColor = '#f0f1f2';
      });
      
      card.addEventListener('mouseup', function(e) {
        card.style.backgroundColor = '#f8f9fa';
      });
      
      // Improved click handler
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking on an existing link or button
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
            e.target.closest('a') || e.target.closest('button')) {
          return;
        }
        
        // Immediately navigate to the target page
        window.location.href = href;
      });
    });
  }
  
  // Run immediately
  handleCardClicks();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleCardClicks);
  } else {
    // Already loaded
    handleCardClicks();
  }
  
  // Also run on load
  window.addEventListener('load', handleCardClicks);
  
  // Run again after a delay to catch dynamically added cards
  setTimeout(handleCardClicks, 500);
  setTimeout(handleCardClicks, 1500);
  
  // Export function for external use
  window.handleCardClicks = handleCardClicks;
})(); 