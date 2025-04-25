/**
 * Script to forcibly remove any "Show more" or "Show less" buttons
 */
document.addEventListener('DOMContentLoaded', function() {
  // Function to remove buttons
  const removeButtons = function() {
    // Target by text content
    document.querySelectorAll('button').forEach(button => {
      const text = button.textContent.toLowerCase();
      if (text.includes('show more') || text.includes('show less')) {
        button.remove();
      }
    });
    
    // Target by classes
    const buttonSelectors = [
      '.code-fold-btn',
      '.code-fold-btn-container',
      '[data-text="Show more"]',
      '[data-text="Show less"]',
      '.show-more',
      '.show-less',
      '.btn-fold-more',
      '.btn-fold-less'
    ];
    
    buttonSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.remove();
      });
    });
    
    // Force display of any hidden code
    document.querySelectorAll('.code-fold-hidden-default').forEach(code => {
      code.classList.remove('code-fold-hidden-default');
      code.style.maxHeight = 'none';
      code.style.height = 'auto';
      code.style.display = 'block';
      code.style.visibility = 'visible';
      code.style.overflow = 'visible';
    });
  };
  
  // Run immediately
  removeButtons();
  
  // Also run after a slight delay to catch dynamically added buttons
  setTimeout(removeButtons, 500);
  setTimeout(removeButtons, 1500);
  setTimeout(removeButtons, 3000);
  
  // Monitor for new buttons with MutationObserver
  const observer = new MutationObserver((mutations) => {
    removeButtons();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}); 