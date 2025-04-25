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
  
  // Force 3x2 layout for grid items
  function enforceGridLayout() {
    console.log("Enforcing grid layout");
    const gridContainer = document.querySelector('.quarto-grid, .list.grid');
    console.log("Grid container found:", gridContainer);
    
    if (gridContainer) {
      // Apply styles directly with !important to override any conflicting styles
      gridContainer.setAttribute('style', `
        display: grid !important;
        grid-template-columns: repeat(3, 1.035fr) !important;
        gap: 1.5rem !important;
        width: 100% !important;
        max-width: none !important;
        visibility: visible !important;
      `);
      
      // Special styling for homepage
      if (document.querySelector('.posts-section')) {
        gridContainer.style.width = '100%';
        gridContainer.style.marginLeft = '-8%';
        gridContainer.style.marginRight = '-8%';
        gridContainer.style.transform = 'translateX(0)';
        gridContainer.style.paddingLeft = '4rem';
        gridContainer.style.paddingRight = '4rem';
        gridContainer.style.justifyContent = 'center';
        
        // Adjust gap to make cards align perfectly with hero banner edges
        const viewportWidth = window.innerWidth;
        const gridWidth = viewportWidth * 1.0; // 100% of viewport
        const effectiveWidth = gridWidth - 8*16; // Minus padding (4rem = 64px = 8*16px)
        
        // Calculate grid item width and gap to ensure 3 items fit perfectly
        // For three items with two gaps, we have: 3*itemWidth + 2*gap = effectiveWidth
        // With square aspect ratio, we want optimal gap to make it fit perfectly
        const gap = Math.max(1.5, (effectiveWidth - (effectiveWidth * 1.035)) / 2); // in rem, 15% bigger cards
        gridContainer.style.gap = gap + 'rem';
      }
      
      // Add loaded class to indicate styling is applied
      gridContainer.classList.add('loaded');
      
      // Ensure all grid items are equal width
      const gridItems = document.querySelectorAll('.quarto-grid-item, .card');
      console.log("Number of grid items found:", gridItems.length);
      
      gridItems.forEach((item, index) => {
        // Skip image cards from animation and style changes
        if (item.classList.contains('image-card')) {
          return;
        }
        
        // Apply all item styles at once with !important
        item.setAttribute('style', `
          aspect-ratio: auto !important;
          height: 290px !important;
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
          border-radius: 6px !important;
          overflow: hidden !important;
          opacity: 0 !important;
          transform: translateY(15px) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.25s ease !important;
        `);
        
        // Staggered animation
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50 + (index * 50));
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-5px)';
          item.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0)';
          item.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
        
        // Style images with fixed height - make smaller for larger content area
        const image = item.querySelector('.listing-image, .thumbnail-image, .card-img-top');
        if (image) {
          image.setAttribute('style', `
            height: 140px !important; 
            width: 100% !important;
            object-fit: cover !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
            display: block !important;
            border-top-left-radius: 6px !important;
            border-top-right-radius: 6px !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          `);
        }
        
        // Style card body with adjusted padding
        const cardBody = item.querySelector('.card-body, .post-contents');
        if (cardBody) {
          cardBody.setAttribute('style', `
            padding: 0.9rem 1rem 0.8rem !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 0.4rem !important;
            flex: 1 !important;
            background-color: #FFFFFF !important;
          `);
        }
        
        // Style titles - positioned higher
        const title = item.querySelector('.listing-title, .card-title');
        if (title) {
          title.setAttribute('style', `
            font-size: 0.95rem !important;
            font-weight: 600 !important;
            color: #2C3E50 !important;
            margin-top: -0.2rem !important;
            margin-bottom: 0.3rem !important;
            line-height: 1.3 !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            max-height: 2.6rem !important;
          `);
        }
        
        // Style descriptions - fewer lines
        const description = item.querySelector('.listing-description, .card-text');
        if (description) {
          description.setAttribute('style', `
            color: #64748B !important;
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
            margin-top: 0 !important;
            margin-bottom: 0.25rem !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            max-height: 2.15rem !important;
          `);
        }
        
        // Style dates - smaller padding
        const date = item.querySelector('.listing-date');
        if (date) {
          date.setAttribute('style', `
            color: #94A3B8 !important;
            font-size: 0.7rem !important;
            font-weight: 400 !important;
            margin-top: auto !important;
            margin-bottom: 0 !important;
            padding-top: 0.4rem !important;
            border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
            display: block !important;
            visibility: visible !important;
          `);
        } else {
          // If date not found, try to find it in attribution area and clone it to card body
          const attribution = item.querySelector('.card-attribution');
          if (attribution) {
            const attributionDate = attribution.querySelector('.listing-date');
            if (attributionDate && cardBody) {
              const clonedDate = attributionDate.cloneNode(true);
              clonedDate.setAttribute('style', `
                color: #94A3B8 !important;
                font-size: 0.7rem !important;
                font-weight: 400 !important;
                margin-top: auto !important;
                margin-bottom: 0 !important;
                padding-top: 0.4rem !important;
                border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
                display: block !important;
                visibility: visible !important;
              `);
              cardBody.appendChild(clonedDate);
            }
          }
        }
        
        // Style categories - smaller
        const categories = item.querySelectorAll('.listing-category');
        categories.forEach(category => {
          category.setAttribute('style', `
            display: inline-block !important;
            padding: 0.15rem 0.4rem !important;
            margin-right: 0.2rem !important;
            margin-bottom: 0.2rem !important;
            background-color: rgba(203, 213, 225, 0.3) !important;
            color: #475569 !important;
            border-radius: 4px !important;
            font-size: 0.6rem !important;
            font-weight: 500 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.02em !important;
          `);
        });
      });
      
      // Style project header and intro if on projects page
      if (window.location.pathname.includes('projects')) {
        const projectsHeader = document.querySelector('.projects-header');
        if (projectsHeader) {
          projectsHeader.style.marginBottom = '1rem';
          projectsHeader.style.paddingBottom = '0.5rem';
        }
        
        const projectsIntro = document.querySelector('.projects-intro');
        if (projectsIntro) {
          projectsIntro.style.marginBottom = '3rem';
          projectsIntro.style.fontSize = '1.1rem';
          projectsIntro.style.lineHeight = '1.6';
          projectsIntro.style.color = '#5D6D7E';
          projectsIntro.style.maxWidth = '900px';
        }
      }
      
      // Also shift the post heading on homepage
      const postHeading = document.querySelector('.docs-list-title-container');
      if (postHeading && document.querySelector('.posts-section')) {
        postHeading.style.transform = 'translateX(0)';
        postHeading.style.marginBottom = '1rem';
        postHeading.style.textAlign = 'center';
        
        // Center the heading title
        const heading = postHeading.querySelector('.docs-list-title');
        if (heading) {
          heading.style.textAlign = 'center';
          heading.style.margin = '0 auto';
          heading.style.display = 'inline-block';
        }
      }
    } else {
      console.warn("Grid container not found!");
    }
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
    enforceGridLayout();
  }, 100);

  // Ensure image cards are always visible
  const imageCards = document.querySelectorAll('.image-card');
  imageCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
    card.style.transition = 'none';
  });

  // Add dramatic hover effect to navigation items
  const navItems = document.querySelectorAll('.sidebar-item');
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (!item.classList.contains('active')) {
        item.style.backgroundColor = 'rgba(178, 93, 76, 0.1)';
        item.style.transform = 'translateX(5px)';
      }
    });
    item.addEventListener('mouseleave', () => {
      if (!item.classList.contains('active')) {
        item.style.backgroundColor = '';
        item.style.transform = 'translateX(0)';
      }
    });
  });

  // Make code blocks expandable with smooth animation
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(block => {
    if (block.offsetHeight > 300) {
      block.style.maxHeight = '300px';
      block.style.overflow = 'hidden';
      block.style.position = 'relative';
      block.style.transition = 'max-height 0.5s ease';
      
      const expandButton = document.createElement('button');
      expandButton.textContent = 'Show more';
      expandButton.classList.add('code-expand-button');
      expandButton.style.position = 'absolute';
      expandButton.style.bottom = '0';
      expandButton.style.right = '0';
      expandButton.style.margin = '0.5rem';
      expandButton.style.padding = '0.5rem 1rem';
      expandButton.style.backgroundColor = 'rgba(178, 93, 76, 0.1)';
      expandButton.style.color = '#B25D4C';
      expandButton.style.border = '1px solid rgba(178, 93, 76, 0.2)';
      expandButton.style.borderRadius = '0.5rem';
      expandButton.style.cursor = 'pointer';
      expandButton.style.transition = 'all 0.3s ease';
      expandButton.style.fontSize = '0.9rem';
      
      expandButton.addEventListener('mouseenter', () => {
        expandButton.style.backgroundColor = 'rgba(178, 93, 76, 0.2)';
        expandButton.style.transform = 'translateY(-2px)';
      });
      
      expandButton.addEventListener('mouseleave', () => {
        expandButton.style.backgroundColor = 'rgba(178, 93, 76, 0.1)';
        expandButton.style.transform = 'translateY(0)';
      });
      
      expandButton.addEventListener('click', () => {
        if (block.style.maxHeight === '300px') {
          block.style.maxHeight = block.scrollHeight + 'px';
          expandButton.textContent = 'Show less';
        } else {
          block.style.maxHeight = '300px';
          expandButton.textContent = 'Show more';
        }
      });
      
      block.appendChild(expandButton);
    }
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