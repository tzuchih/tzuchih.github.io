// Professional Cards Enhancement Script
// Ensures clean, professional card layout with proper positioning of all elements

document.addEventListener('DOMContentLoaded', function() {
  function enhanceCards() {
    console.log("Applying professional card enhancements - 30% taller with 2-line titles");
    
    // Get all cards
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    cards.forEach(card => {
      // 1. Set base card style
      card.style.height = '377px'; // Changed to 30% taller (290px * 1.3 = 377px)
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.overflow = 'hidden';
      card.style.borderRadius = '8px';
      card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      card.style.backgroundColor = '#fff';
      
      // 2. Fix image container to eliminate white space
      const imageContainer = card.querySelector('p.card-img-top');
      if (imageContainer) {
        imageContainer.style.margin = '0';
        imageContainer.style.padding = '0';
        imageContainer.style.lineHeight = '0';
        imageContainer.style.height = '35%'; // Reduced from 50% to 35% (30% smaller)
        imageContainer.style.overflow = 'hidden';
      }
      
      // 3. Improve image display
      const image = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
      if (image) {
        image.style.height = '100%';
        image.style.width = '100%';
        image.style.objectFit = 'cover';
        image.style.display = 'block';
        image.style.margin = '0';
        image.style.padding = '0';
        image.style.transition = 'transform 0.5s ease';
      }
      
      // 4. Style the card body
      const cardBody = card.querySelector('.card-body, .post-contents');
      if (cardBody) {
        cardBody.style.display = 'flex';
        cardBody.style.flexDirection = 'column';
        cardBody.style.padding = '0.7rem 1rem 1rem'; // Reduced top padding
        cardBody.style.height = '65%'; // Increased from 50% to 65%
        cardBody.style.position = 'relative';
        
        // 5. Hide description
        const description = cardBody.querySelector('.listing-description, .card-text.listing-description');
        if (description) {
          description.style.display = 'none';
          description.style.visibility = 'hidden';
          description.style.height = '0';
        }
        
        // 6. Style title for EXACTLY 2 lines
        const title = cardBody.querySelector('.listing-title, .card-title.listing-title');
        if (title) {
          title.style.fontSize = '1.1rem';
          title.style.lineHeight = '1.5';
          title.style.fontWeight = '600';
          title.style.color = '#2C3E50';
          title.style.marginTop = '-0.3rem';
          title.style.marginBottom = '0.8rem';
          title.style.display = 'block';
          title.style.overflow = 'visible';
          title.style.maxHeight = 'none';
        }
        
        // 7. Style category tags with proper vertical alignment
        const categories = cardBody.querySelector('.listing-categories, .quarto-categories');
        if (categories) {
          categories.style.display = 'flex';
          categories.style.flexWrap = 'wrap';
          categories.style.gap = '0.25rem';
          categories.style.marginBottom = '0.8rem';
          categories.style.alignItems = 'center';
          
          // Style individual category tags
          const categoryTags = categories.querySelectorAll('.listing-category, .quarto-category');
          categoryTags.forEach(tag => {
            tag.style.display = 'inline-flex';
            tag.style.alignItems = 'center';
            tag.style.padding = '0.2rem 0.5rem';
            tag.style.backgroundColor = 'rgba(191, 211, 230, 0.25)';
            tag.style.color = '#4A5568';
            tag.style.borderRadius = '4px';
            tag.style.fontSize = '0.65rem';
            tag.style.fontWeight = '500';
            tag.style.textTransform = 'uppercase';
            tag.style.letterSpacing = '0.02em';
            tag.style.margin = '0 0.2rem 0.2rem 0';
          });
        } else {
          // Create categories container if it doesn't exist but we have data
          createCategories(card, cardBody);
        }
        
        // 8. Position date at the bottom with better vertical alignment
        const date = cardBody.querySelector('.listing-date');
        if (date) {
          date.style.marginTop = 'auto';
          date.style.fontSize = '0.75rem';
          date.style.color = '#94A3B8';
          date.style.paddingTop = '0.5rem';
          date.style.borderTop = '1px solid rgba(0, 0, 0, 0.05)';
          date.style.fontWeight = '400';
          date.style.display = 'flex';
          date.style.alignItems = 'center';
          date.style.width = '100%';
        }
      }
      
      // Ensure titles display fully
      const title = card.querySelector('.listing-title, .card-title.listing-title');
      if (title) {
        title.style.display = 'block';
        title.style.overflow = 'visible';
        title.style.maxHeight = 'none';
        // Remove any line clamping
        title.style.webkitLineClamp = 'none';
        title.style.webkitBoxOrient = 'initial';
      }
    });
  }
  
  // Function to create category tags from data attribute if needed
  function createCategories(card, cardBody) {
    // Try to get categories data
    const categoriesData = card.getAttribute('data-categories');
    if (!categoriesData) return;
    
    try {
      // Create container
      const categoriesContainer = document.createElement('div');
      categoriesContainer.className = 'listing-categories';
      categoriesContainer.style.display = 'flex';
      categoriesContainer.style.flexWrap = 'wrap';
      categoriesContainer.style.gap = '0.25rem';
      categoriesContainer.style.marginBottom = '0.8rem';
      categoriesContainer.style.alignItems = 'center';
      
      // Decode categories from data attribute
      const categoriesArray = atob(categoriesData).split(',');
      
      // Create tags
      categoriesArray.forEach(category => {
        if (!category.trim()) return;
        
        const tag = document.createElement('span');
        tag.className = 'listing-category';
        tag.textContent = category.trim();
        tag.style.display = 'inline-flex';
        tag.style.alignItems = 'center';
        tag.style.padding = '0.2rem 0.5rem';
        tag.style.backgroundColor = 'rgba(191, 211, 230, 0.25)';
        tag.style.color = '#4A5568';
        tag.style.borderRadius = '4px';
        tag.style.fontSize = '0.65rem';
        tag.style.fontWeight = '500';
        tag.style.textTransform = 'uppercase';
        tag.style.letterSpacing = '0.02em';
        tag.style.margin = '0 0.2rem 0.2rem 0';
        
        categoriesContainer.appendChild(tag);
      });
      
      // Insert after title and before date
      const title = cardBody.querySelector('.listing-title, .card-title.listing-title');
      if (title && title.nextSibling) {
        cardBody.insertBefore(categoriesContainer, title.nextSibling);
      } else {
        cardBody.appendChild(categoriesContainer);
      }
    } catch (e) {
      console.error('Error creating categories:', e);
    }
  }
  
  // Run on page load
  enhanceCards();
  
  // Run again after delays to ensure it applies
  setTimeout(enhanceCards, 500);
  setTimeout(enhanceCards, 1000);
  
  // Add hover effects
  const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px)';
      this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
      
      const image = this.querySelector('.listing-image, .thumbnail-image, .card-img-top');
      if (image) {
        image.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      
      const image = this.querySelector('.listing-image, .thumbnail-image, .card-img-top');
      if (image) {
        image.style.transform = '';
      }
    });
  });
});

// Also apply on window load to catch elements rendered later
window.addEventListener('load', function() {
  // Wait a bit for any post-load rendering
  setTimeout(function() {
    // Re-trigger the DOM content loaded event handler
    document.dispatchEvent(new Event('DOMContentLoaded'));
  }, 500);
  
  // Additional check to fix any remaining issues
  setTimeout(function() {
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    cards.forEach(card => {
      // Force card height of 30% taller
      card.style.height = '377px';
      
      // Force image size again
      const imageContainer = card.querySelector('p.card-img-top');
      if (imageContainer) {
        imageContainer.style.height = '35%'; // Reduced from 50% to 35%
      }
      
      // Force card body size again
      const cardBody = card.querySelector('.card-body, .post-contents');
      if (cardBody) {
        cardBody.style.height = '65%'; // Increased from 50% to 65%
      }
      
      // Force title to exactly 2 lines
      const title = card.querySelector('.listing-title, .card-title.listing-title');
      if (title) {
        title.style.webkitLineClamp = '2';
        title.style.maxHeight = '3.4rem'; // Increased from 3.1rem to fit two full lines
        title.style.minHeight = '3.4rem'; // Force consistent height even for short titles
      }
    });
  }, 1500);
}); 