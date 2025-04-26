/**
 * Cross-Device Reliable Card Navigation
 * 
 * This script implements multiple redundant approaches to ensure cards
 * are navigable across all devices, browsers, and screen sizes.
 */

(function() {
  // Function to enhance card navigation
  function enhanceCardNavigation() {
    console.log("Enhancing card navigation reliability");
    
    // Get all cards that should be clickable
    const cards = document.querySelectorAll('.quarto-grid-item, .card.h-100');
    
    if (cards.length === 0) {
      console.log("No cards found, will retry later");
      return;
    }
    
    console.log(`Enhancing navigation for ${cards.length} cards`);
    
    // Detect mobile devices for special handling
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    cards.forEach(function(card) {
      // Skip if already enhanced
      if (card.dataset.navigationEnhanced === 'true') {
        return;
      }
      
      // Mark as enhanced
      card.dataset.navigationEnhanced = 'true';
      
      // Find the target URL
      let targetUrl = null;
      
      // Try multiple selectors to find the link
      const possibleLinkContainers = [
        card.querySelector('.listing-title a'),
        card.querySelector('.card-title a'),
        card.querySelector('a.listing-link'),
        card.querySelector('a.card-link'),
        card.querySelector('a'),
        card.parentElement?.querySelector('a[href*="/posts/"]'),
        card.parentElement?.querySelector('a.stretched-link')
      ];
      
      // Find first valid link
      for (const container of possibleLinkContainers) {
        if (container && container.getAttribute('href')) {
          targetUrl = container.getAttribute('href');
          break;
        }
      }
      
      if (!targetUrl) {
        console.log("Could not find navigation target for card:", card);
        return;
      }
      
      // APPROACH 1: Apply data attribute for CSS selection
      card.setAttribute('data-target-url', targetUrl);
      
      // APPROACH 2: Add direct click handler
      const clickHandler = function(e) {
        // Don't trigger if the click was on a link or button
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
          return;
        }
        
        // Provide visual feedback
        card.style.backgroundColor = '#f8f9fa';
        
        // Navigate to the target URL
        window.location.href = targetUrl;
      };
      
      card.addEventListener('click', clickHandler);
      
      // APPROACH 3: Add touch handler for mobile devices
      if (isMobile) {
        card.addEventListener('touchend', function(e) {
          // Only proceed if not touching a link or button
          if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
            return;
          }
          
          // Navigate after a short delay to prevent accidental touches
          setTimeout(function() {
            window.location.href = targetUrl;
          }, 50);
        }, { passive: true });
      }
      
      // APPROACH 4: Create a full-card overlay link
      const overlay = document.createElement('a');
      overlay.href = targetUrl;
      overlay.className = 'card-navigation-overlay';
      overlay.setAttribute('aria-label', 'View details');
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: transparent;
        opacity: 0;
        cursor: pointer;
      `;
      
      // Make sure card has position relative for the overlay
      if (window.getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }
      
      // APPROACH 5: Ensure all links and interactive elements are above the overlay
      const interactiveElements = card.querySelectorAll('a, button, input, select, textarea');
      interactiveElements.forEach(function(el) {
        el.style.position = 'relative';
        el.style.zIndex = '2';
      });
      
      // Add the overlay to the card
      card.appendChild(overlay);
      
      // APPROACH 6: Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `View more details about this project`);
      
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = targetUrl;
        }
      });
      
      // Log success
      console.log("Card navigation enhanced:", targetUrl);
    });
  }
  
  // Run immediately and at various times to catch dynamically loaded content
  enhanceCardNavigation();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceCardNavigation);
  }
  
  window.addEventListener('load', function() {
    enhanceCardNavigation();
    setTimeout(enhanceCardNavigation, 500);
    setTimeout(enhanceCardNavigation, 1500);
  });
  
  // Watch for changes in the DOM that might add new cards
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      let shouldEnhance = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.classList && (node.classList.contains('quarto-grid-item') || node.classList.contains('card'))) {
              shouldEnhance = true;
              break;
            }
            
            if (node.querySelectorAll) {
              const cards = node.querySelectorAll('.quarto-grid-item, .card.h-100');
              if (cards.length > 0) {
                shouldEnhance = true;
                break;
              }
            }
          }
        }
      });
      
      if (shouldEnhance) {
        enhanceCardNavigation();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})(); 