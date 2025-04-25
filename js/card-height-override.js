// Card Height Override Script
// This script runs after all other scripts to ensure card height is set to 30% taller (377px)
// It addresses any potential conflicts in styles that might be reverting the height

(function() {
  // Run on load and after a delay to catch any late-rendering elements
  window.addEventListener('load', applyCardHeight);
  setTimeout(applyCardHeight, 500);
  setTimeout(applyCardHeight, 1000);
  setTimeout(applyCardHeight, 2000);

  function applyCardHeight() {
    console.log("Forcing card height to 377px (30% taller) with 35%/65% image/content ratio");
    
    // Get all cards
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    cards.forEach(card => {
      // Force height and remove any aspect ratio
      card.style.height = '377px';
      card.style.aspectRatio = 'auto';
      
      // Ensure image container is 35% of the card height (reduced from 50%)
      const imageContainer = card.querySelector('p.card-img-top');
      if (imageContainer) {
        imageContainer.style.height = '35%';
      }
      
      // Ensure the card body is 65% of the card height (increased from 50%)
      const cardBody = card.querySelector('.card-body, .post-contents');
      if (cardBody) {
        cardBody.style.height = '65%';
        cardBody.style.padding = '0.7rem 1rem 1rem'; // Reduced top padding
        
        // Ensure title is fully visible without truncation
        const title = cardBody.querySelector('.listing-title, .card-title.listing-title');
        if (title) {
          title.style.marginTop = '-0.3rem';
          title.style.lineHeight = '1.5';
          title.style.display = 'block'; // Changed from -webkit-box
          title.style.overflow = 'visible'; // Changed from hidden
          title.style.maxHeight = 'none'; // Remove height restriction
          // Remove any line clamping
          title.style.webkitLineClamp = 'none';
          title.style.webkitBoxOrient = 'initial';
        }
      }
      
      // Remove any other conflicting styles
      if (card.hasAttribute('style')) {
        const style = card.getAttribute('style');
        if (style.includes('aspect-ratio: 1')) {
          // Override any inline styles setting square aspect ratio
          const newStyle = style.replace(/aspect-ratio:\s*1[^;]*;?/gi, 'aspect-ratio: auto;');
          card.setAttribute('style', newStyle);
        }
      }
    });
  }
})(); 