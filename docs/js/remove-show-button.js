/**
 * Remove Show Images Button
 * 
 * This script removes any existing "Show Images" buttons from the page.
 */

(function() {
  function removeShowImagesButtons() {
    // Find buttons with text "Show Images"
    const buttons = Array.from(document.querySelectorAll('button')).filter(function(button) {
      return button.textContent.trim() === 'Show Images';
    });
    
    // Also look for buttons that might have been created with specific styles
    const fixedButtons = Array.from(document.querySelectorAll('button[style*="position: fixed"]')).filter(function(button) {
      return button.style.bottom === '20px' && button.style.right === '20px';
    });
    
    // Combine the results
    const allButtons = [...buttons, ...fixedButtons];
    
    // Remove all found buttons
    allButtons.forEach(function(button) {
      if (button && button.parentNode) {
        button.parentNode.removeChild(button);
      }
    });
    
    // Also remove by direct query selector for buttons with specific styling
    document.querySelectorAll('button[style*="z-index: 9999"]').forEach(function(button) {
      if (button && button.parentNode) {
        button.parentNode.removeChild(button);
      }
    });
  }

  // Run immediately
  removeShowImagesButtons();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeShowImagesButtons);
  }
  
  // Run after everything is loaded
  window.addEventListener('load', removeShowImagesButtons);
  
  // Run with delay to ensure it catches any dynamically added buttons
  [100, 500, 1000, 2000].forEach(function(delay) {
    setTimeout(removeShowImagesButtons, delay);
  });
})(); 