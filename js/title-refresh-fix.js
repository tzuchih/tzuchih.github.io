/**
 * Title Refresh Fix - Minimal script to prevent title glitches on page refresh
 */

// Execute immediately to intercept any rendering glitches
(function() {
  // Store original title contents before any browser rendering changes
  storeOriginalTitleContents();
  
  // Execute on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    fixCardLayout();
    storeOriginalTitleContents();
    fixTitles();
    fixCategoryTags();
  });
  
  // Also run on window load
  window.addEventListener('load', function() {
    fixCardLayout();
    fixTitles();
    fixCategoryTags();
    
    // Final check after everything is loaded
    setTimeout(function() {
      fixTitles();
      fixCategoryTags();
    }, 500);
  });
  
  function storeOriginalTitleContents() {
    document.querySelectorAll('.listing-title, .card-title').forEach(function(title) {
      if (!title.hasAttribute('data-original-text') && title.textContent.trim()) {
        title.setAttribute('data-original-text', title.textContent.trim());
      }
    });
  }
  
  function fixTitles() {
    document.querySelectorAll('.listing-title, .card-title').forEach(function(title) {
      const originalText = title.getAttribute('data-original-text');
      
      // Restore original text if it exists and current text is either empty or different
      if (originalText && 
          (title.textContent.trim() === '' || 
           title.textContent.trim() !== originalText)) {
        title.textContent = originalText;
      }
      
      // Force critical styles directly to prevent flickering
      title.style.display = '-webkit-box';
      title.style.webkitLineClamp = '3';
      title.style.webkitBoxOrient = 'vertical';
      title.style.overflow = 'hidden';
      title.style.textOverflow = 'ellipsis';
      title.style.maxHeight = '5rem';
      title.style.minHeight = '5rem';
      title.style.opacity = '1';
      title.style.visibility = 'visible';
    });
  }
  
  function fixCardLayout() {
    document.querySelectorAll('.quarto-grid-item, .card.h-100').forEach(function(card) {
      // Apply only essential styles for stability
      card.style.height = '480px';
      card.style.overflow = 'hidden';
      
      // Ensure image container has correct height
      const imageContainer = card.querySelector('p.card-img-top');
      if (imageContainer) {
        imageContainer.style.height = '30%';
        imageContainer.style.overflow = 'hidden';
      }
      
      // Ensure card body has correct height
      const cardBody = card.querySelector('.card-body, .post-contents');
      if (cardBody) {
        cardBody.style.height = '70%';
        cardBody.style.position = 'relative';
      }
    });
  }
  
  // Fix category tags styling and alignment
  function fixCategoryTags() {
    // Style the category container
    document.querySelectorAll('.listing-categories, .quarto-categories').forEach(container => {
      container.style.display = 'flex';
      container.style.flexWrap = 'wrap';
      container.style.gap = '0.4rem';
      container.style.alignItems = 'flex-start';
      container.style.justifyContent = 'flex-start';
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '1.2rem';
      container.style.right = '1.2rem';
      container.style.width = 'calc(100% - 2.4rem)';
      container.style.maxHeight = '4rem';
      container.style.marginTop = '10rem';
    });
    
    // Style individual category tags
    document.querySelectorAll('.listing-category, .quarto-category').forEach(tag => {
      tag.style.display = 'inline-flex';
      tag.style.alignItems = 'center';
      tag.style.justifyContent = 'center';
      tag.style.height = '1.4rem';
      tag.style.padding = '0.2rem 0.5rem';
      tag.style.margin = '0';
      tag.style.fontSize = '0.65rem';
      tag.style.fontWeight = '500';
      tag.style.lineHeight = '1';
      tag.style.letterSpacing = '0.02em';
      tag.style.textTransform = 'uppercase';
      tag.style.borderRadius = '4px';
      tag.style.backgroundColor = 'rgba(191, 211, 230, 0.25)';
      tag.style.color = '#4A5568';
      tag.style.whiteSpace = 'nowrap';
      tag.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    });
  }
})(); 