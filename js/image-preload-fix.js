/**
 * Image Preload Fix
 * 
 * This script prevents image glitches in card grids by:
 * 1. Adding a "loading" class to images initially
 * 2. Preloading images before applying animations
 * 3. Adding fade-in transitions once loaded
 */

(function() {
  // Debug mode - set to true to troubleshoot
  const DEBUG = true;
  function log(message) {
    if (DEBUG) console.log(`[Image-Preload] ${message}`);
  }

  // Immediately run to add loading class
  function initializeImageLoading() {
    // Target all card images
    const cardImages = document.querySelectorAll(
      '.quarto-grid-item img, .card.h-100 img, .listing-image, .thumbnail-image, .card-img-top'
    );
    
    log(`Found ${cardImages.length} card images to preload`);
    
    // Add loading class to all images
    cardImages.forEach(img => {
      if (img._preloadInitialized) return;
      
      // Mark as initialized
      img._preloadInitialized = true;
      
      // Add loading class
      img.classList.add('image-loading');
      
      // Force image to be visible with important flag
      img.style.cssText = "opacity: 1 !important; visibility: visible !important; display: block !important;";
      
      // Function to handle when image is loaded
      function handleImageLoaded() {
        // Check if image is actually loaded
        if (img.complete) {
          log(`Image loaded: ${img.src}`);
          // Remove loading class
          img.classList.remove('image-loading');
          img.classList.add('image-loaded');
          
          // Force image to be visible
          img.style.cssText = "opacity: 1 !important; visibility: visible !important; display: block !important;";
        }
      }
      
      // Handle cases where image is already loaded
      if (img.complete) {
        log(`Image already loaded: ${img.src}`);
        handleImageLoaded();
      } else {
        // Listen for load event
        img.addEventListener('load', handleImageLoaded);
        
        // Set a timeout to force show image even if load event doesn't fire
        setTimeout(() => {
          log(`Forcing image to show: ${img.src}`);
          handleImageLoaded();
          // Additional force to ensure visibility
          img.style.cssText = "opacity: 1 !important; visibility: visible !important; display: block !important;";
        }, 500);
      }
    });
  }
  
  // Fix for preventing animation glitches on hover
  function fixHoverGlitches() {
    // Apply to all cards
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    cards.forEach(card => {
      // Only apply once
      if (card._hoverGlitchFixed) return;
      card._hoverGlitchFixed = true;
      
      // Re-enable pointer events
      card.style.pointerEvents = 'auto';
      
      // Force show any images inside
      const images = card.querySelectorAll('img');
      images.forEach(img => {
        img.style.cssText = "opacity: 1 !important; visibility: visible !important; display: block !important;";
      });
    });
  }
  
  // Force show all images function for recovery
  function forceShowAllImages() {
    const allImages = document.querySelectorAll('img');
    log(`Force showing ${allImages.length} images`);
    
    allImages.forEach(img => {
      img.style.cssText = "opacity: 1 !important; visibility: visible !important; display: block !important;";
    });
    
    // Also enable pointer events on all cards
    document.querySelectorAll('.quarto-grid-item, .card.h-100').forEach(card => {
      card.style.pointerEvents = 'auto';
    });
  }
  
  // Run both fixes
  function applyFixes() {
    initializeImageLoading();
    fixHoverGlitches();
    
    // Safety timeout to force show all images
    setTimeout(forceShowAllImages, 1000);
  }
  
  // Run immediately to ensure images are visible
  applyFixes();
  
  // Run as early as possible
  if (document.readyState === 'loading') {
    // Wait for DOM to be ready before initial processing
    document.addEventListener('DOMContentLoaded', applyFixes);
  } else {
    // DOM already loaded, run immediately
    applyFixes();
  }
  
  // Set up mutation observer to catch dynamically added content
  function setupObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldRun = false;
      
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          shouldRun = true;
        }
      });
      
      if (shouldRun) {
        applyFixes();
      }
    });
    
    observer.observe(document.body, {
      childList: true, 
      subtree: true
    });
    
    return observer;
  }
  
  // Wait for DOM to be ready before setting up observer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    setupObserver();
  }
  
  // Run again after everything is loaded
  window.addEventListener('load', function() {
    applyFixes();
    forceShowAllImages();
  });
  
  // Run multiple times with increasing delays to ensure images appear
  setTimeout(applyFixes, 100);
  setTimeout(applyFixes, 500);
  setTimeout(forceShowAllImages, 1000);
  setTimeout(forceShowAllImages, 2000);
})(); 