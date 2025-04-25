/**
 * Same Tab Links
 *
 * This script ensures project post links open in the same tab
 * instead of a new tab by preventing the default behavior
 * and manually navigating to the link.
 */

(function() {
  function fixLinkBehavior() {
    // Target both grid links (for projects page) and other listing links
    const projectLinks = document.querySelectorAll('.quarto-grid-link, .listing-link');
    
    projectLinks.forEach(link => {
      // Remove any existing target attribute
      link.removeAttribute('target');
      
      // Remove the click event listeners by cloning and replacing
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // Add our own click handler
      newLink.addEventListener('click', function(e) {
        // Don't use e.preventDefault() as we want normal link behavior
        // but explicitly ensure we're not opening in a new tab
        window.location.href = this.getAttribute('href');
      });
    });
  }
  
  // Run on document loaded
  document.addEventListener('DOMContentLoaded', fixLinkBehavior);
  
  // Also run after a delay to catch any dynamically added links
  window.addEventListener('load', function() {
    setTimeout(fixLinkBehavior, 500);
    setTimeout(fixLinkBehavior, 1500);
  });
})(); 