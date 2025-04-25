/**
 * Card Glitch Fix - Prevents title and card size glitches
 * This script applies stable styles with priority and ensures consistent rendering
 */

(function() {
  // Run immediately to prevent FOUC (Flash of Unstyled Content)
  applyStableStyles();
  
  // Also run after DOM content loaded
  document.addEventListener('DOMContentLoaded', function() {
    applyStableStyles();
    
    // Run multiple times to ensure styles are applied consistently
    setTimeout(applyStableStyles, 100);
    setTimeout(applyStableStyles, 300);
    setTimeout(applyStableStyles, 1000);
  });
  
  // Run on window load as well
  window.addEventListener('load', applyStableStyles);
  
  function applyStableStyles() {
    console.log('Applying stable card styles to prevent glitches');
    
    // Target all cards
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    cards.forEach(card => {
      // Force stable card size with !important
      card.style.cssText = `
        height: 480px !important;
        min-height: 480px !important;
        max-height: 480px !important;
        display: flex !important;
        flex-direction: column !important;
        position: relative !important;
        overflow: hidden !important;
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        opacity: 1 !important;
        visibility: visible !important;
      `;
      
      // Force stable image container size
      const imageContainer = card.querySelector('p.card-img-top');
      if (imageContainer) {
        imageContainer.style.cssText = `
          height: 30% !important;
          min-height: 30% !important;
          max-height: 30% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          line-height: 0 !important;
        `;
      }
      
      // Force stable image rendering
      const image = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
      if (image) {
        image.style.cssText = `
          height: 100% !important;
          width: 100% !important;
          object-fit: cover !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          transition: transform 0.3s ease !important;
        `;
      }
      
      // Force stable card body
      const cardBody = card.querySelector('.card-body, .post-contents');
      if (cardBody) {
        cardBody.style.cssText = `
          height: 70% !important;
          min-height: 70% !important;
          max-height: 70% !important;
          padding: 1rem 1.2rem 1.5rem !important;
          display: flex !important;
          flex-direction: column !important;
          position: relative !important;
        `;
      }
      
      // Force stable title rendering
      const title = card.querySelector('.listing-title, .card-title.listing-title');
      if (title) {
        // Save original text in a data attribute if not already saved
        if (!title.hasAttribute('data-original-text')) {
          title.setAttribute('data-original-text', title.textContent);
        }
        
        // Force stable title styles
        title.style.cssText = `
          display: -webkit-box !important;
          -webkit-line-clamp: 3 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          max-height: 5rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 1.2rem !important;
          font-size: 1.1rem !important;
          line-height: 1.5 !important;
          font-weight: 600 !important;
          color: #2C3E50 !important;
          opacity: 1 !important;
          visibility: visible !important;
        `;
        
        // Restore original text to prevent glitches
        title.textContent = title.getAttribute('data-original-text');
      }
      
      // Force stable categories
      const categories = card.querySelector('.listing-categories, .quarto-categories');
      if (categories) {
        categories.style.cssText = `
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 0.25rem !important;
          margin-bottom: 2.5rem !important;
          align-items: center !important;
          max-height: 5rem !important;
          overflow-y: auto !important;
        `;
      }
      
      // Force stable date positioning
      const date = card.querySelector('.listing-date');
      if (date) {
        date.style.cssText = `
          position: absolute !important;
          bottom: 1.2rem !important;
          left: 1.2rem !important;
          right: 1.2rem !important;
          width: calc(100% - 2.4rem) !important;
          padding-top: 0.5rem !important;
          margin-top: auto !important;
          font-size: 0.75rem !important;
          color: #94A3B8 !important;
          border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
          background-color: white !important;
          z-index: 2 !important;
        `;
      }
    });
  }
})(); 