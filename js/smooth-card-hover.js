/**
 * Smooth Card Hover and Full-Card Click
 *
 * This script fixes two issues:
 * 1. Makes hover animations smooth and prevents glitches
 * 2. Makes the entire card clickable, not just the link elements
 */

(function() {
  // Debug setting
  const DEBUG = false;
  
  function log(message) {
    if (DEBUG) {
      console.log(`[Smooth Card] ${message}`);
    }
  }
  
  function fixCardHoverAndClick() {
    log('Applying smooth hover and full-card click fixes');
    
    // Target both grid items on projects page and cards on homepage
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    cards.forEach(card => {
      // Find the link that the card should navigate to
      const cardLink = card.querySelector('a.quarto-grid-link') || 
                       card.parentElement.querySelector('a.quarto-grid-link');
      
      if (!cardLink) return; // Skip if no link found
      
      // Store the href for later use
      const href = cardLink.getAttribute('href');
      
      // 1. Fix hover glitches by ensuring consistent transitions
      const imageElement = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
      
      // First, clean up any existing event listeners by cloning elements
      if (card._hoverFixed) return; // Skip if already fixed
      
      // Remove existing mouseover/mouseout events by cloning and replacing
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);
      card = newCard; // Update our reference
      
      // Remove all inline animations that might be conflicting
      card.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
      card.style.willChange = 'transform, box-shadow';
      card.style.transformStyle = 'preserve-3d';
      card.style.backfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
      card.style.transform = 'translateZ(0)';
      
      // Find the image in the cloned card
      const newImageElement = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
      if (newImageElement) {
        newImageElement.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
        newImageElement.style.willChange = 'transform';
        newImageElement.style.backfaceVisibility = 'hidden';
      }
      
      // 2. Make the entire card clickable
      // Set cursor to pointer to indicate clickability
      card.style.cursor = 'pointer';
      
      // Add click event to the entire card
      card.addEventListener('click', function(e) {
        // Don't trigger if the click was on an actual link or button
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          return;
        }
        
        // Navigate to the card's link
        window.location.href = href;
      });
      
      // 3. Add smooth hover effect with better timing function
      card.addEventListener('mouseenter', function() {
        // Use requestAnimationFrame for smoother transitions
        requestAnimationFrame(() => {
          this.style.transform = 'translateY(-6px) translateZ(0)';
          this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.1)';
          
          if (newImageElement) {
            newImageElement.style.transform = 'scale(1.05)';
          }
        });
      });
      
      card.addEventListener('mouseleave', function() {
        requestAnimationFrame(() => {
          this.style.transform = 'translateZ(0)';
          this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
          
          if (newImageElement) {
            newImageElement.style.transform = 'scale(1)';
          }
        });
      });
      
      // Mark as fixed to avoid duplicate processing
      card._hoverFixed = true;
    });
  }
  
  // Run on DOM content loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initial fix
    fixCardHoverAndClick();
    
    // Run again after delays to catch dynamically added cards
    setTimeout(fixCardHoverAndClick, 500);
    setTimeout(fixCardHoverAndClick, 1000);
    setTimeout(fixCardHoverAndClick, 1500);
  });
  
  // Run again when window loads to catch any late-loaded content
  window.addEventListener('load', function() {
    fixCardHoverAndClick();
    setTimeout(fixCardHoverAndClick, 500);
  });
  
  // Also make the function available globally for manual calls
  window.fixCardHoverAndClick = fixCardHoverAndClick;
})(); 