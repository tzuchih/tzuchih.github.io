/**
 * Card Click Handler - NO ANIMATIONS
 *
 * This script ensures cards are clickable without any animations or transforms
 * that could cause image glitches.
 */

(function() {
  // Simple click handler with zero animations
  function handleCardClicks() {
    console.log("Applying card click handling without animations");
    
    // Target all cards
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100, .card, [class*="card"]');
    
    cards.forEach(function(card) {
      // Skip if already processed
      if (card._clickHandled) return;
      card._clickHandled = true;
      
      // Reset any animation styles
      card.style.transition = 'none';
      card.style.transform = 'none';
      card.style.willChange = 'auto';
      
      // Make sure it's clickable
      card.style.cursor = 'pointer';
      
      // Find the card's link
      const cardLink = card.querySelector('a.quarto-grid-link') || 
                      card.querySelector('a.listing-link') ||
                      card.querySelector('.card-title a') ||
                      card.querySelector('a') ||
                      card.parentElement.querySelector('a.quarto-grid-link');
      
      if (!cardLink || !cardLink.getAttribute('href')) return;
      
      const href = cardLink.getAttribute('href');
      
      // Add click handler without animations
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking on an actual link or button
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
            e.target.closest('a') || e.target.closest('button')) {
          return;
        }
        
        // Immediately navigate to the target page
        window.location.href = href;
      });
      
      // Fix images inside this card
      const images = card.querySelectorAll('img, .listing-image, .thumbnail-image, .card-img-top');
      images.forEach(function(img) {
        img.style.transition = 'none';
        img.style.transform = 'none';
        img.style.willChange = 'auto';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
      });
    });
  }
  
  // Run immediately
  handleCardClicks();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleCardClicks);
  }
  
  // Run after all resources loaded
  window.addEventListener('load', handleCardClicks);
  
  // Run again with a delay to catch any dynamically added cards
  setTimeout(handleCardClicks, 500);
  setTimeout(handleCardClicks, 1500);
})(); 