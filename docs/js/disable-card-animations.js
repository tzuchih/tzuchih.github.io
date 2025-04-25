/**
 * Disable Card Animations
 * 
 * This script explicitly removes and prevents all hover animations
 * on card elements throughout the site.
 */

(function() {
  // Function to disable all card animations
  function disableCardAnimations() {
    // First, override the CSS variables
    document.documentElement.style.setProperty('--hover-timing', 'none');
    document.documentElement.style.setProperty('--hover-duration', '0ms');
    
    // Target all card elements
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    // Remove all animations and transitions
    cards.forEach(function(card) {
      // Remove animation-related properties
      card.style.transition = 'none';
      card.style.transform = 'none';
      card.style.willChange = 'auto';
      
      // Remove event listeners that might be causing hover effects
      // by cloning and replacing the element
      const clone = card.cloneNode(true);
      
      // Make sure the card stays clickable
      const cardLink = card.querySelector('a.quarto-grid-link') || 
                      card.querySelector('a.listing-link') ||
                      card.querySelector('.card-title a') ||
                      card.parentElement.querySelector('a.quarto-grid-link');
      
      if (cardLink && cardLink.getAttribute('href')) {
        const href = cardLink.getAttribute('href');
        
        // Add a simple click handler with no animations
        clone.addEventListener('click', function(e) {
          if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
            window.location.href = href;
          }
        });
      }
      
      // Replace the original with the clone
      if (card.parentNode) {
        card.parentNode.replaceChild(clone, card);
      }
      
      // Find all images inside cards and disable their animations too
      const images = document.querySelectorAll('.quarto-grid-item img, .card.h-100 img, .listing-image, .thumbnail-image, .card-img-top');
      images.forEach(function(img) {
        img.style.transition = 'none';
        img.style.transform = 'none';
        img.style.willChange = 'auto';
      });
    });
    
    // Remove specific animation classes if they exist
    document.querySelectorAll('.hover-animation, .card-hover-effect, .animate-on-hover').forEach(function(el) {
      el.classList.remove('hover-animation', 'card-hover-effect', 'animate-on-hover');
    });
    
    // Override any hover styles with !important flags using a style tag
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .quarto-grid-item, .card.h-100 {
        transition: none !important;
        transform: none !important;
        animation: none !important;
      }
      .quarto-grid-item:hover, .card.h-100:hover {
        transform: none !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
      }
      .quarto-grid-item img, .card.h-100 img, .listing-image, .thumbnail-image, .card-img-top,
      .quarto-grid-item:hover img, .card.h-100:hover img, .quarto-grid-item:hover .listing-image,
      .quarto-grid-item:hover .thumbnail-image, .card.h-100:hover .card-img-top {
        transform: none !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(styleTag);
  }
  
  // Run immediately
  disableCardAnimations();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', disableCardAnimations);
  }
  
  // Run after load with a delay to catch any dynamically added elements
  window.addEventListener('load', function() {
    disableCardAnimations();
    // Run again with delays to catch any late additions
    setTimeout(disableCardAnimations, 500);
    setTimeout(disableCardAnimations, 1500);
  });
})(); 