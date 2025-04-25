/**
 * Post Tag Fix - Ensures tags in post pages appear below the title 
 * and don't overlap with other content
 */

(function() {
  function fixPostTags() {
    // Target post page categories
    const categoriesElements = document.querySelectorAll('.quarto-title .quarto-categories, .quarto-title-block .quarto-categories, #title-block-header .quarto-categories');
    
    categoriesElements.forEach(categoryContainer => {
      // Ensure proper positioning
      categoryContainer.style.position = 'relative';
      categoryContainer.style.display = 'flex';
      categoryContainer.style.flexWrap = 'wrap';
      categoryContainer.style.gap = '0.4rem';
      categoryContainer.style.marginTop = '0.5rem';
      categoryContainer.style.marginBottom = '1.5rem';
      categoryContainer.style.width = 'auto';
      categoryContainer.style.maxWidth = '100%';
      categoryContainer.style.minHeight = '1.8rem';
      categoryContainer.style.height = 'auto';
      categoryContainer.style.padding = '0';
      categoryContainer.style.top = 'auto';
      categoryContainer.style.left = 'auto';
      categoryContainer.style.right = 'auto';
      categoryContainer.style.overflow = 'visible';
      categoryContainer.style.zIndex = '5';
      
      // Fix individual categories
      const categoryItems = categoryContainer.querySelectorAll('.quarto-category');
      categoryItems.forEach(category => {
        category.style.display = 'inline-flex';
        category.style.alignItems = 'center';
        category.style.justifyContent = 'center';
        category.style.padding = '0.25rem 0.6rem';
        category.style.backgroundColor = 'rgba(191, 211, 230, 0.25)';
        category.style.color = '#4A5568';
        category.style.borderRadius = '4px';
        category.style.fontSize = '0.7rem';
        category.style.fontWeight = '500';
        category.style.textTransform = 'uppercase';
        category.style.letterSpacing = '0.02em';
        category.style.margin = '0';
        category.style.height = 'auto';
        category.style.minHeight = '1.5rem';
        category.style.lineHeight = '1';
        category.style.whiteSpace = 'nowrap';
        category.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
      });
    });
    
    // Fix spacing between title and tags
    const titles = document.querySelectorAll('.quarto-title h1.title, .quarto-title-block h1.title, #title-block-header h1.title');
    titles.forEach(title => {
      title.style.marginBottom = '0.5rem';
    });
    
    // Add more space between tags and description
    const descriptions = document.querySelectorAll('.quarto-title .description, .quarto-title-block .description, #title-block-header .description');
    descriptions.forEach(desc => {
      desc.style.marginTop = '1.5rem';
      desc.style.marginBottom = '1.5rem';
      desc.style.paddingTop = '0.5rem';
    });
    
    // Fix spacing for title metadata
    const metaContainers = document.querySelectorAll('.quarto-title-meta');
    metaContainers.forEach(meta => {
      meta.style.marginTop = '2rem';
    });
  }
  
  // Run on page load and after a delay
  document.addEventListener('DOMContentLoaded', function() {
    fixPostTags();
    setTimeout(fixPostTags, 500);
  });
  
  // Run on window load
  window.addEventListener('load', function() {
    fixPostTags();
    setTimeout(fixPostTags, 500);
  });
  
  // Run every time the hash changes (navigation)
  window.addEventListener('hashchange', fixPostTags);
})(); 