/**
 * Project Cards Fix - Addresses hover animation inconsistencies and title glitches
 * This script focuses specifically on fixing:
 * 1. Smooth hover animation between card and image
 * 2. Preventing title glitches on page load/refresh
 */

document.addEventListener('DOMContentLoaded', function() {
  // Apply fixes with a slight delay to ensure other scripts have run
  setTimeout(fixProjectCards, 300);
  
  // Apply again after a longer delay for slower page loads
  setTimeout(fixProjectCards, 1000);
});

function fixProjectCards() {
  console.log("Applying project card animation fixes");
  
  // Fix all cards
  const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
  
  cards.forEach(card => {
    // Apply consistent card styles for animations
    applyStyle(card, {
      'height': '480px', // Match the CSS height
      'transition': 'transform 0.3s ease, box-shadow 0.3s ease',
      'will-change': 'transform',
      'backface-visibility': 'hidden',
      'transform': 'translateZ(0)', // Force GPU acceleration for smoother animations
      'opacity': '1',
      'visibility': 'visible'
    });
    
    // Ensure images have matching transition timing
    const image = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
    if (image) {
      applyStyle(image, {
        'height': '100%',
        'transition': 'transform 0.3s ease', // Match card transition timing exactly
        'transform-origin': 'center',
        'backface-visibility': 'hidden',
        'will-change': 'transform'
      });
    }
    
    // Adjust image container height
    const imageContainer = card.querySelector('p.card-img-top');
    if (imageContainer) {
      applyStyle(imageContainer, {
        'height': '30%',
        'overflow': 'hidden'
      });
    }
    
    // Fix card body
    const cardBody = card.querySelector('.card-body, .post-contents');
    if (cardBody) {
      applyStyle(cardBody, {
        'height': '70%',
        'padding': '1rem 1.2rem 1.5rem'
      });
    }
    
    // Fix title styling to prevent glitches
    const title = card.querySelector('.listing-title, .card-title.listing-title');
    if (title) {
      applyStyle(title, {
        'display': '-webkit-box',
        '-webkit-line-clamp': '3',
        '-webkit-box-orient': 'vertical',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'max-height': '5rem',
        'margin-top': '0.5rem',
        'margin-bottom': '1.2rem',
        'opacity': '1',
        'visibility': 'visible',
        'transform': 'none'
      });
    }
    
    // Fix categories 
    const categories = card.querySelector('.listing-categories, .quarto-categories');
    if (categories) {
      applyStyle(categories, {
        'margin-bottom': '2.5rem',
        'max-height': '5rem'
      });
    }
    
    // Fix date positioning
    const date = card.querySelector('.listing-date');
    if (date) {
      applyStyle(date, {
        'position': 'absolute',
        'bottom': '1.2rem',
        'left': '1.2rem',
        'right': '1.2rem',
        'background-color': 'white'
      });
    }
    
    // Add smooth hover effects
    addSmoothHoverEffects(card);
  });
}

// Apply styles without overriding existing styles
function applyStyle(element, styles) {
  if (!element) return;
  
  for (const [property, value] of Object.entries(styles)) {
    element.style[property] = value;
  }
}

// Add hover effects that synchronize card and image movement
function addSmoothHoverEffects(card) {
  // Remove any existing event listeners
  card.removeEventListener('mouseenter', handleMouseEnter);
  card.removeEventListener('mouseleave', handleMouseLeave);
  
  // Add new event listeners
  card.addEventListener('mouseenter', handleMouseEnter);
  card.addEventListener('mouseleave', handleMouseLeave);
}

// Handle mouse enter with synchronized animations
function handleMouseEnter(e) {
  const card = e.currentTarget;
  
  // Smoothly animate the card
  card.style.transform = 'translateY(-6px)';
  card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
  
  // Animate the image with the same timing
  const image = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
  if (image) {
    image.style.transform = 'scale(1.05)';
  }
}

// Handle mouse leave with synchronized animations
function handleMouseLeave(e) {
  const card = e.currentTarget;
  
  // Reset card styling
  card.style.transform = 'translateY(0)';
  card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
  
  // Reset image styling
  const image = card.querySelector('.listing-image, .thumbnail-image, .card-img-top');
  if (image) {
    image.style.transform = 'scale(1)';
  }
} 