/**
 * Critical Styles Cleanup
 * 
 * This script removes critical CSS that was applied to prevent initial load glitches
 * once the page is fully loaded and initialized.
 */

(function() {
  // Function to remove the critical styles
  function removeCriticalStyles() {
    console.log("Critical styles cleanup running");
    
    // Force show all images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      img.style.opacity = '1';
      img.style.visibility = 'visible';
      img.style.display = 'block';
      img.classList.add('image-loaded');
    });
    
    // Find and remove the critical CSS link
    const criticalLink = document.querySelector('link[href*="critical-image-fix.css"]');
    if (criticalLink) {
      console.log("Disabling critical CSS link");
      criticalLink.disabled = true;
      
      // For extra safety, try to actually remove it
      if (criticalLink.parentNode) {
        criticalLink.parentNode.removeChild(criticalLink);
      }
    }
    
    // Also remove any inline critical styles
    const criticalStyle = document.getElementById('critical-image-styles');
    if (criticalStyle) {
      criticalStyle.disabled = true;
      
      if (criticalStyle.parentNode) {
        criticalStyle.parentNode.removeChild(criticalStyle);
      }
    }
    
    // Re-enable pointer events for cards
    document.querySelectorAll('.quarto-grid-item, .card.h-100').forEach(card => {
      card.style.pointerEvents = 'auto';
      card.classList.add('card-ready');
      
      // Force show images inside cards
      const cardImages = card.querySelectorAll('img');
      cardImages.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
      });
    });
    
    // Add a class to the body to indicate critical styles have been removed
    document.body.classList.add('critical-styles-removed');
  }
  
  // Run immediately
  removeCriticalStyles();
  
  // Wait for window load plus a short delay
  window.addEventListener('load', function() {
    removeCriticalStyles();
    // Run again after a short delay
    setTimeout(removeCriticalStyles, 100);
    setTimeout(removeCriticalStyles, 500);
  });
  
  // Multiple fallback timeouts to ensure cleanup happens
  setTimeout(removeCriticalStyles, 1000);
  setTimeout(removeCriticalStyles, 2000);
  setTimeout(removeCriticalStyles, 3000);
})(); 