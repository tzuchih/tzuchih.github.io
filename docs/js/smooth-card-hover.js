/**
 * Card Hover Animations DISABLED
 *
 * This script has been modified to remove all hover animations
 * while maintaining card clickability.
 */

(function() {
  // Empty function that only handles click events but no animations
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
      
      // Add click without any animations
      card.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
          window.location.href = href;
        }
      });
    });
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleCardClicks);
  } else {
    // Already loaded
    handleCardClicks();
  }
  
  // Also run on load
  window.addEventListener('load', handleCardClicks);
  
  // Export function for external use
  window.handleCardClicks = handleCardClicks;
})(); 