// Wait for the document to be fully loaded with all resources
window.addEventListener('DOMContentLoaded', () => {
  console.log("Initial DOM Content loaded");
  
  // Set the document title to ONLY show the desired title
  document.title = "👩🏻‍💻 Lydia's Portfolio";
  
  // Hide all grid containers initially to prevent FOUC
  const gridContainers = document.querySelectorAll('.quarto-grid, .list.grid');
  gridContainers.forEach(container => {
    container.style.visibility = 'hidden';
  });
});

window.addEventListener('load', () => {
  console.log("Custom JS loaded and running");
  
  // Fix images immediately
  fixImages();
  
  // Enhance grid layout
  enforceGridLayout();
  
  // Fix broken image loading
  function fixImages() {
    console.log("Fixing images");
    
    const images = document.querySelectorAll('.listing-image, .thumbnail-image, .card-img-top');
    images.forEach(img => {
      // Force immediate visibility to prevent flashing
      img.style.opacity = '1';
      img.style.visibility = 'visible';
      img.style.display = 'block';
      
      // Apply fixed dimensions to prevent layout shift
      img.style.height = '220px';
      img.style.maxHeight = '220px';
      img.style.width = '100%';
      img.style.objectFit = 'cover';
      
      // Ensure no transform or transition effects
      img.style.transform = 'none';
      img.style.transition = 'none';
      
      // Remove any animation classes
      img.classList.remove('animated', 'fadeIn', 'zoom', 'hover-zoom', 'hover-effect');
    });
  }
  
  function enforceGridLayout() {
    console.log("Enforcing stable grid layout");
    
    // Get all grid items
    const gridItems = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    // Skip if no grid found
    if (gridItems.length === 0) {
      console.log("No grid items found");
      return;
    }
    
    // Add stabilizing styles to the grid
    const grids = document.querySelectorAll('.grid, .quarto-grid');
    grids.forEach(grid => {
      grid.setAttribute('style', `
        display: grid !important;
        grid-template-columns: repeat(3, 1fr) !important;
        grid-gap: 20px !important;
        width: 100% !important;
        margin: 0 !important;
      `);
    });
    
    // Disable masonry mode which can cause layout shifts
    const masonryContainers = document.querySelectorAll('.masonry');
    masonryContainers.forEach(container => {
      container.classList.remove('masonry');
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(3, 1fr)';
      container.style.gridGap = '20px';
    });
    
    gridItems.forEach((item) => {
      // Skip image cards
      if (item.classList.contains('image-card')) {
        return;
      }
      
      // Apply stable card styles with no animations
      item.setAttribute('style', `
        aspect-ratio: auto !important;
        height: 480px !important;
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
        border-radius: 6px !important;
        overflow: hidden !important;
        opacity: 1 !important;
        transform: none !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        transition: none !important;
      `);
      
      // Style images with fixed dimensions to prevent layout shifts
      const image = item.querySelector('.listing-image, .thumbnail-image, .card-img-top');
      if (image) {
        image.setAttribute('style', `
          width: 100% !important;
          height: 220px !important;
          max-height: 220px !important;
          object-fit: cover !important;
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          transition: none !important;
        `);
      }
      
      // Fix title layout
      const title = item.querySelector('.listing-title, .card-title');
      if (title) {
        title.setAttribute('style', `
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
          font-size: 1.1rem !important;
          line-height: 1.4 !important;
          font-weight: 600 !important;
          min-height: 60px !important;
          max-height: 60px !important;
          overflow: hidden !important;
          display: block !important;
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        `);
      }
      
      // Fix description layout
      const description = item.querySelector('.listing-description, .card-text');
      if (description) {
        description.setAttribute('style', `
          font-size: 0.85rem !important;
          line-height: 1.5 !important;
          color: #666 !important;
          max-height: 100px !important;
          overflow: hidden !important;
          margin-bottom: 1rem !important;
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        `);
      }
    });
  }

  // Make sure the title is set correctly even after full load
  document.title = "👩🏻‍💻 Lydia's Portfolio";
  
  // Add dramatic animation to the hero section
  const heroSection = document.querySelector('.hero-banner');
  if (heroSection) {
    setTimeout(() => {
      heroSection.style.opacity = '1';
      heroSection.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Reorganize post card structure - move date to top and hide author
  function reorganizePostCards() {
    const cards = document.querySelectorAll('.quarto-grid-item');
    cards.forEach(card => {
      // Skip image cards
      if (card.classList.contains('image-card')) {
        return;
      }
      
      // Get the card body
      const cardBody = card.querySelector('.card-body');
      if (!cardBody) return;
      
      // Find the date and author elements
      const attribution = card.querySelector('.card-attribution');
      if (!attribution) return;
      
      const dateElement = attribution.querySelector('.listing-date');
      if (!dateElement) return;
      
      // Clone the date element
      const newDateElement = dateElement.cloneNode(true);
      
      // Insert the date at the top of the card body (after the title)
      const cardTitle = cardBody.querySelector('.listing-title');
      if (cardTitle && cardTitle.nextSibling) {
        cardBody.insertBefore(newDateElement, cardTitle.nextSibling);
      } else if (cardTitle) {
        cardBody.insertBefore(newDateElement, cardTitle.nextElementSibling);
      }
      
      // Hide the original attribution section and reading time
      attribution.style.display = 'none';
      const readingTime = cardBody.querySelector('.listing-reading-time');
      if (readingTime) {
        readingTime.style.display = 'none';
      }
    });
  }

  // Run reorganization after a short delay to ensure all cards are rendered
  setTimeout(() => {
    reorganizePostCards();
  }, 100);

  // Ensure image cards are always visible
  const imageCards = document.querySelectorAll('.image-card');
  imageCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
    card.style.transition = 'none';
  });

  // Add smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Improved image loading animation
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Set initial transition property
    img.style.transition = 'opacity 0.3s ease';
    
    // If image is already complete, make it visible immediately
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      // Don't set opacity to 0 initially, start with partial opacity
      img.style.opacity = '0.7';
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
    
    // Always ensure images are visible after a short timeout regardless of load state
    setTimeout(() => {
      img.style.opacity = '1';
    }, 500);
  });

  // Make all grid containers visible after a short delay to allow the styles to be applied
  setTimeout(() => {
    const gridContainers = document.querySelectorAll('.quarto-grid, .list.grid');
    gridContainers.forEach(container => {
      container.style.visibility = 'visible';
    });
  }, 50);

  // Add responsive adjustments based on screen width
  function handleResponsiveLayout() {
    const width = window.innerWidth;
    const grids = document.querySelectorAll('.grid, .quarto-grid');
    
    grids.forEach(grid => {
      if (width <= 576) {
        grid.style.gridTemplateColumns = '1fr';
      } else if (width <= 992) {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      } else {
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      }
    });
  }
  
  // Initialize styles and add event listeners
  handleResponsiveLayout();
  window.addEventListener('resize', handleResponsiveLayout);
  
  function initializeStyles() {
    // Style navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.style.transition = 'color 0.3s ease';
    });
    
    // Add consistency to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      button.style.willChange = 'transform, box-shadow';
      
      // Add hover effect with pure JS
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      });
    });
  }
  
  // Initialize styles
  initializeStyles();
  
  // Animation on scroll function
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  
  // Run initial animation check
  animateOnScroll();
});

// Function to initialize styles
function initializeStyles() {
  const cards = document.querySelectorAll(".card:not(.image-card)");
  const heroSection = document.querySelector(".hero-section");

  if (cards) {
    cards.forEach((card) => {
      card.style.opacity = 0;
      card.style.transform = "translateY(20px)";
    });
  }

  if (heroSection) {
    heroSection.style.opacity = 0;
    heroSection.style.transform = "translateY(20px)";
  }
}

// Function to animate elements when they enter the viewport
function animateOnScroll() {
  const elements = document.querySelectorAll(".card:not(.image-card), .hero-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
}

// Make entire sidebar items clickable
document.addEventListener('DOMContentLoaded', function() {
  // Find all sidebar items
  const sidebarItems = document.querySelectorAll('#quarto-sidebar .sidebar-item');
  
  sidebarItems.forEach(function(item) {
    // Find the link inside this sidebar item
    const link = item.querySelector('a.sidebar-item-text, a.menu-text');
    
    if (link) {
      // Get the href from the link
      const href = link.getAttribute('href');
      
      // Make the entire sidebar item clickable
      item.addEventListener('click', function(event) {
        // Only follow the link if the click wasn't on the link itself
        // (to avoid double-triggering)
        if (!event.target.closest('a')) {
          if (href) {
            window.location.href = href;
          }
        }
      });
      
      // Add pointer cursor to indicate clickability
      item.style.cursor = 'pointer';
    }
  });
}); 