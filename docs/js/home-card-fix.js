// Home Page Card Fix Script
// Ensures Recent Posts cards on home page match the project card design
// This script runs last to override any other styling

(function() {
  // Main function to fix homepage cards
  function fixHomePageCards() {
    console.log("Applying project card design to home page posts (final override)");
    
    // 1. Fix the grid container first
    const gridContainer = document.querySelector('.posts-section .quarto-grid, .posts-section .list.grid');
    if (gridContainer) {
      // Apply exact same grid styling as projects page with !important
      const gridStyle = 
        'display: grid !important; ' +
        'grid-template-columns: repeat(3, 1fr) !important; ' +
        'gap: 2.5rem !important; ' +
        'width: 100% !important; ' +
        'max-width: 1200px !important; ' +
        'margin: 0 auto !important; ' +
        'padding: 0 !important;'; // Remove any padding
      
      gridContainer.setAttribute('style', gridStyle);
      
      // Remove any transform that might be applied
      gridContainer.style.transform = 'none !important';
      
      // Clear any padding applied by CSS
      gridContainer.style.paddingLeft = '0 !important';
      gridContainer.style.paddingRight = '0 !important';
    }
    
    // 2. Get all cards on the home page
    const cards = document.querySelectorAll('.posts-section .quarto-grid-item, .posts-section .card.h-100');
    
    cards.forEach((card, index) => {
      // Ensure we're only modifying the first 3 cards - will be sorted by date later
      if (index < 3) {
        // Base card style to exactly match project cards
        const baseStyle = 
          'height: 480px !important; ' +
          'width: 100% !important; ' +
          'display: flex !important; ' +
          'flex-direction: column !important; ' +
          'overflow: hidden !important; ' +
          'border-radius: 8px !important; ' +
          'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important; ' +
          'aspect-ratio: auto !important; ' +
          'margin: 0 !important; ' +
          'position: relative !important; ' +
          'transition: transform 0.3s ease, box-shadow 0.3s ease !important;';
        
        card.setAttribute('style', baseStyle);
        
        // Fix image container to match project cards exactly
        const imageContainer = card.querySelector('p.card-img-top');
        if (imageContainer) {
          const imageContainerStyle = 
            'margin: 0 !important; ' +
            'padding: 0 !important; ' +
            'line-height: 0 !important; ' +
            'height: 30% !important; ' +
            'overflow: hidden !important;';
          
          imageContainer.setAttribute('style', imageContainerStyle);
        }
        
        // Improve image display - handle both lazy and non-lazy loaded images
        const image = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
        if (image) {
          const imageStyle = 
            'height: 100% !important; ' +
            'width: 100% !important; ' +
            'object-fit: cover !important; ' +
            'display: block !important; ' +
            'margin: 0 !important; ' +
            'padding: 0 !important; ' +
            'transition: transform 0.3s ease !important;';
          
          image.setAttribute('style', imageStyle);
          
          // Force image loading if it's lazy loaded
          if (image.getAttribute('loading') === 'lazy' || image.hasAttribute('data-src')) {
            const dataSrc = image.getAttribute('data-src');
            if (dataSrc) {
              image.setAttribute('src', dataSrc);
              image.removeAttribute('data-src');
            }
            image.setAttribute('loading', 'eager');
          }
        }
        
        // Style the card body
        const cardBody = card.querySelector('.card-body, .post-contents');
        if (cardBody) {
          const cardBodyStyle = 
            'display: flex !important; ' +
            'flex-direction: column !important; ' +
            'padding: 1rem 1.2rem 1.5rem !important; ' +
            'height: 70% !important; ' +
            'position: relative !important;';
          
          cardBody.setAttribute('style', cardBodyStyle);
          
          // Hide description
          const description = cardBody.querySelector('.listing-description, .card-text.listing-description');
          if (description) {
            description.style.display = 'none';
            description.style.visibility = 'hidden';
            description.style.height = '0';
          }
          
          // Style title to match project cards exactly - allow for 3 lines
          const title = cardBody.querySelector('.listing-title, .card-title.listing-title');
          if (title) {
            const titleStyle = 
              'font-size: 1.1rem !important; ' +
              'line-height: 1.5 !important; ' +
              'font-weight: 600 !important; ' +
              'color: #2C3E50 !important; ' +
              'margin-top: 0.5rem !important; ' +
              'margin-bottom: 1.2rem !important; ' +
              'display: -webkit-box !important; ' +
              'overflow: hidden !important; ' +
              '-webkit-line-clamp: 3 !important; ' +
              '-webkit-box-orient: vertical !important; ' +
              'max-height: 5rem !important; ' +
              'text-overflow: ellipsis !important;';
            
            title.setAttribute('style', titleStyle);
          }
          
          // Style category tags to match project cards exactly
          const categories = cardBody.querySelector('.listing-categories, .quarto-categories');
          if (categories) {
            const categoriesStyle = 
              'display: flex !important; ' +
              'flex-wrap: wrap !important; ' +
              'gap: 0.25rem !important; ' +
              'margin-bottom: 2.5rem !important; ' +
              'align-items: center !important; ' +
              'max-height: 5rem !important; ' +
              'overflow-y: auto !important;';
            
            categories.setAttribute('style', categoriesStyle);
            
            // Style individual category tags
            const categoryTags = categories.querySelectorAll('.listing-category, .quarto-category');
            categoryTags.forEach(tag => {
              const tagStyle = 
                'display: inline-flex !important; ' +
                'align-items: center !important; ' +
                'padding: 0.2rem 0.5rem !important; ' +
                'background-color: rgba(191, 211, 230, 0.25) !important; ' +
                'color: #4A5568 !important; ' +
                'border-radius: 4px !important; ' +
                'font-size: 0.65rem !important; ' +
                'font-weight: 500 !important; ' +
                'text-transform: uppercase !important; ' +
                'letter-spacing: 0.02em !important; ' +
                'margin: 0 0.2rem 0.2rem 0 !important;';
              
              tag.setAttribute('style', tagStyle);
            });
          }
          
          // Position date at the bottom to match project cards exactly
          const date = cardBody.querySelector('.listing-date');
          if (date) {
            const dateStyle = 
              'position: absolute !important; ' +
              'bottom: 1.2rem !important; ' +
              'left: 1.2rem !important; ' +
              'right: 1.2rem !important; ' +
              'font-size: 0.75rem !important; ' +
              'color: #94A3B8 !important; ' +
              'padding-top: 0.5rem !important; ' +
              'border-top: 1px solid rgba(0, 0, 0, 0.05) !important; ' +
              'font-weight: 400 !important; ' +
              'display: flex !important; ' +
              'align-items: center !important; ' +
              'width: calc(100% - 2.4rem) !important; ' +
              'background-color: white !important;';
            
            date.setAttribute('style', dateStyle);
          }
        }
        
        // Add hover effects same as project cards
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-6px)';
          card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
          
          const img = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
          if (img) {
            img.style.transform = 'scale(1.05)';
          }
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
          
          const img = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
          if (img) {
            img.style.transform = '';
          }
        });
      } else {
        // Hide any cards beyond the first 3
        card.style.display = 'none';
      }
    });
    
    // Sort and filter posts to show only the 3 most recent by date
    sortPostsByDate();
    
    // Remove pagination elements
    document.querySelectorAll('.quarto-listing-pagination, .pagination, .page-item, .page-link, [aria-label="Page navigation"]').forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.height = '0';
        el.style.width = '0';
        el.style.margin = '0';
        el.style.padding = '0';
        
        // Try to actually remove from DOM
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
    });
  }
  
  // Function to sort and filter posts by date
  function sortPostsByDate() {
    const gridContainer = document.querySelector('.posts-section .quarto-grid, .posts-section .list.grid');
    if (!gridContainer) return;
    
    // Get all post cards
    const cards = Array.from(gridContainer.querySelectorAll('.quarto-grid-item, .card.h-100'));
    if (cards.length <= 3) return; // No need to sort if we have 3 or fewer posts
    
    // Extract dates from cards
    const cardsWithDates = cards.map(card => {
      const dateElement = card.querySelector('.listing-date');
      let dateText = dateElement ? dateElement.textContent.trim() : '';
      
      // Parse date or set to epoch if can't parse
      let date;
      try {
        date = dateText ? new Date(dateText) : new Date(0);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
          date = new Date(0); // Invalid date, use epoch
        }
      } catch (e) {
        date = new Date(0); // Error parsing, use epoch
      }
      
      return { card, date };
    });
    
    // Sort by date descending (newest first)
    cardsWithDates.sort((a, b) => b.date - a.date);
    
    // Reappend cards in the correct order and only show the first 3
    cardsWithDates.forEach((item, index) => {
      // Remove from current position
      if (item.card.parentNode) {
        item.card.parentNode.removeChild(item.card);
      }
      
      // Add back to container
      gridContainer.appendChild(item.card);
      
      // Show only the first 3 cards
      if (index < 3) {
        item.card.style.display = 'flex';
      } else {
        item.card.style.display = 'none';
      }
    });
    
    console.log("Sorted Recent Posts by date, showing only the 3 most recent");
  }
  
  // Create a robust approach to ensure our script runs after everything else
  function initializeCardFixing() {
    console.log("Initializing home card fixing process");
    
    // Apply immediately for fast page loads
    fixHomePageCards();
    
    // First wave of fixing attempts - progressive enhancement
    setTimeout(fixHomePageCards, 50);
    setTimeout(fixHomePageCards, 100);
    
    // Second wave - after likely DOM updates
    setTimeout(fixHomePageCards, 300);
    setTimeout(fixHomePageCards, 500);
    
    // Final fixes - after all other scripts should be complete
    setTimeout(fixHomePageCards, 1000);
    setTimeout(fixHomePageCards, 2000);
    
    // Extra safety for very slow loading or complex pages
    setTimeout(fixHomePageCards, 3000);
  }
  
  // For the most reliable execution, we use multiple event hooks
  
  // 1. On DOM content loaded - early, but might be before some resources
  document.addEventListener('DOMContentLoaded', initializeCardFixing);
  
  // 2. On load - after all resources, but might be too late for some visual elements
  window.addEventListener('load', fixHomePageCards);
  
  // 3. Start immediately if document is already interactive or complete
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initializeCardFixing();
  }
  
  // 4. Mutation observer to catch dynamic content changes
  const observer = new MutationObserver(function(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && 
          (mutation.target.classList.contains('posts-section') || 
           mutation.target.closest('.posts-section'))) {
        fixHomePageCards();
        break;
      }
    }
  });
  
  // Start observing once the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const targetNode = document.querySelector('.posts-section');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  });
})(); 