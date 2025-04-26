// Script to ensure CV link is fully functional
(function() {
  function fixCVLink() {
    // Find CV links in the sidebar
    const cvLinks = document.querySelectorAll('a[href*="cv.html"], a[href*="cv.qmd"]');
    
    cvLinks.forEach(function(link) {
      // Ensure the link is fully visible and clickable
      link.style.display = 'block';
      link.style.visibility = 'visible';
      link.style.opacity = '1';
      link.style.pointerEvents = 'auto';
      link.style.cursor = 'pointer';
      link.style.position = 'relative';
      link.style.zIndex = '1000';
      link.style.height = 'auto';
      link.style.lineHeight = '1.5';
      link.style.width = '100%';
      
      // Find the menu text and make it visible
      const menuText = link.querySelector('.menu-text');
      if (menuText) {
        menuText.style.display = 'inline-block';
        menuText.style.visibility = 'visible';
        menuText.style.opacity = '1';
      }
      
      // Make sure parent elements are visible and clickable
      let parent = link.parentNode;
      while (parent && parent !== document.body) {
        if (parent.classList && 
            (parent.classList.contains('sidebar-item') || 
             parent.classList.contains('sidebar-item-container'))) {
          parent.style.display = 'block';
          parent.style.visibility = 'visible';
          parent.style.opacity = '1';
          parent.style.pointerEvents = 'auto';
          parent.style.height = 'auto';
        }
        parent = parent.parentNode;
      }
      
      // Re-attach click event to ensure functionality
      link.onclick = function(e) {
        window.location.href = link.getAttribute('href');
        return true;
      };
    });
  }
  
  // Run the function immediately
  fixCVLink();
  
  // Also run when DOM is ready
  document.addEventListener('DOMContentLoaded', fixCVLink);
  
  // And again after a short delay to ensure it works even if other scripts run later
  setTimeout(fixCVLink, 100);
  setTimeout(fixCVLink, 500);
  setTimeout(fixCVLink, 1000);
})(); 