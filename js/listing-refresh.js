/**
 * Listing Refresh Script
 * 
 * This script forces Quarto listings to refresh and capture all posts,
 * including newly added ones that might not be included in the initial render.
 */

(function() {
  const DEBUG = true; // Set to true to enable console logging
  
  function log(message) {
    if (DEBUG) {
      console.log(`[Listing Refresh] ${message}`);
    }
  }
  
  // Force refresh all listings
  function refreshAllListings() {
    log('Attempting to refresh all listings');
    
    // Refresh the quarto-listings if available
    if (window['quarto-listings']) {
      log('Found quarto-listings object');
      const listingIds = Object.keys(window['quarto-listings']);
      
      listingIds.forEach(id => {
        log(`Refreshing listing: ${id}`);
        try {
          window['quarto-listings'][id].update();
        } catch (e) {
          log(`Error updating listing ${id}: ${e.message}`);
        }
      });
      
      // Also try to trigger the quarto-listing-loaded callback
      if (window['quarto-listing-loaded']) {
        log('Calling quarto-listing-loaded callback');
        try {
          window['quarto-listing-loaded']();
        } catch (e) {
          log(`Error in quarto-listing-loaded callback: ${e.message}`);
        }
      }
    } else {
      log('quarto-listings object not found');
    }
    
    // Apply consistent styling to all cards
    fixCardStyling();
  }
  
  // Fix card styling for consistency
  function fixCardStyling() {
    log('Fixing card styling');
    
    // Apply the title-hard-fix styling to cards
    document.querySelectorAll('.quarto-grid-item, .card.h-100').forEach(function(card) {
      card.style.height = '480px';
      card.style.minHeight = '480px';
      card.style.maxHeight = '480px';
      card.style.overflow = 'hidden';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      
      // Fix image container
      const imageContainer = card.querySelector('p.card-img-top');
      if (imageContainer) {
        imageContainer.style.height = '30%';
        imageContainer.style.minHeight = '30%';
        imageContainer.style.maxHeight = '30%';
        imageContainer.style.overflow = 'hidden';
      }
      
      // Fix card body
      const cardBody = card.querySelector('.card-body, .post-contents');
      if (cardBody) {
        cardBody.style.height = '70%';
        cardBody.style.minHeight = '70%';
        cardBody.style.maxHeight = '70%';
        cardBody.style.position = 'relative';
      }
      
      // Fix title
      const title = card.querySelector('.listing-title, .card-title');
      if (title) {
        title.style.display = '-webkit-box';
        title.style.webkitLineClamp = '3';
        title.style.webkitBoxOrient = 'vertical';
        title.style.maxHeight = '5rem';
        title.style.minHeight = '5rem';
        title.style.overflow = 'hidden';
        title.style.textOverflow = 'ellipsis';
        
        // Special handling for Smart Job title
        if (title.textContent.includes('Smart Job') || title.textContent.includes('💼')) {
          title.style.webkitLineClamp = '2';
          title.style.maxHeight = '2.8rem';
          title.style.minHeight = '2.8rem';
        }
      }
    });
  }
  
  // Add the script entries to the page
  function setupRefresh() {
    log('Setting up refresh timers');
    
    // Run on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      refreshAllListings();
      
      // Run again after a delay to catch any late-loaded content
      setTimeout(refreshAllListings, 500);
      setTimeout(refreshAllListings, 1500);
    });
    
    // Run on window load
    window.addEventListener('load', function() {
      refreshAllListings();
      setTimeout(refreshAllListings, 500);
    });
    
    // Also run when URL hash changes (navigation)
    window.addEventListener('hashchange', refreshAllListings);
    
    // Hook into the existing quarto-listing-loaded function
    const originalCallback = window['quarto-listing-loaded'];
    window['quarto-listing-loaded'] = function() {
      if (originalCallback) originalCallback();
      setTimeout(refreshAllListings, 100);
    };
  }
  
  // Initialize the refresh mechanism
  setupRefresh();
  
  // Make the functions globally available
  window.quartoListingRefresh = {
    refreshAllListings: refreshAllListings,
    fixCardStyling: fixCardStyling
  };
})(); 