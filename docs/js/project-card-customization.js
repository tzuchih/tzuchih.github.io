// Project Card Customization Script
document.addEventListener('DOMContentLoaded', function() {
  // Function to customize project cards
  function customizeProjectCards() {
    // Find all project cards
    const projectCards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    projectCards.forEach(card => {
      // 1. Make cards 20% longer
      const currentHeight = parseInt(getComputedStyle(card).height);
      const newHeight = Math.floor(currentHeight * 1.2); // 20% longer
      card.style.height = newHeight + 'px' + ' !important';
      
      // 2. Remove project descriptions
      const description = card.querySelector('.listing-description, .card-text.listing-description');
      if (description) {
        description.style.display = 'none';
        description.style.visibility = 'hidden';
        description.style.height = '0';
        description.style.margin = '0';
        description.style.padding = '0';
        description.textContent = ''; // Clear content
      }
      
      // Add some extra space for the title since we removed description
      const title = card.querySelector('.listing-title, .card-title');
      if (title) {
        title.style.marginBottom = '1rem';
      }
    });
  }
  
  // Run immediately
  customizeProjectCards();
  
  // Run again after a short delay to catch any cards that might be rendered later
  setTimeout(customizeProjectCards, 500);
  // Run again after all content is loaded to ensure changes stick
  setTimeout(customizeProjectCards, 1000);
}); 