/**
 * Force Show Images
 * 
 * This is a failsafe script that runs independently to ensure
 * all images are displayed regardless of other scripts.
 */

(function() {
  console.log("Force show images script activated");
  
  // Simple function to force all images to be visible
  function showAllImages() {
    // Target all images on the page
    const images = document.querySelectorAll('img');
    console.log(`Found ${images.length} images to force display`);
    
    // Apply important styles to make images visible
    images.forEach(function(img) {
      img.style.cssText = 
        "opacity: 1 !important; " +
        "visibility: visible !important; " +
        "display: block !important; " +
        "position: relative !important;";
    });
    
    // Also make sure cards are clickable
    document.querySelectorAll('.quarto-grid-item, .card.h-100').forEach(function(card) {
      card.style.pointerEvents = 'auto';
    });
  }
  
  // Run immediately
  showAllImages();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showAllImages);
  }
  
  // Run after everything is loaded
  window.addEventListener('load', showAllImages);
  
  // Run multiple times with delays as failsafe
  [100, 500, 1000, 2000, 3000].forEach(function(delay) {
    setTimeout(showAllImages, delay);
  });
})(); 