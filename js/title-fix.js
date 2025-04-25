// Script to ensure the tab title is exactly "Lydia's Portfolio" with no page prefix
(function() {
  // Set the title immediately
  document.title = "Lydia's Portfolio";
  
  // Use MutationObserver to ensure title doesn't change after DOM modifications
  const observer = new MutationObserver(() => {
    // Check if title has any of the formats we want to override
    if (document.title !== "Lydia's Portfolio" && 
        document.title.includes("Lydia's Portfolio")) {
      document.title = "Lydia's Portfolio";
    }
  });
  
  // Start observing the document title for changes
  observer.observe(document.querySelector('title'), { childList: true });
  
  // Also set the title on DOMContentLoaded and load events for redundancy
  document.addEventListener('DOMContentLoaded', () => {
    document.title = "Lydia's Portfolio";
  });
  
  window.addEventListener('load', () => {
    document.title = "Lydia's Portfolio";
  });
})();

// Title Fix Script - Runs last to ensure titles are fully visible
(function() {
  function fixTitles() {
    console.log("Applying title fix to ensure full visibility");
    
    // Get all titles in cards
    const titles = document.querySelectorAll('.quarto-grid-item .listing-title, .card.h-100 .card-title.listing-title');
    
    titles.forEach(title => {
      // Force display without truncation
      title.style.display = 'block !important';
      title.style.overflow = 'visible !important';
      title.style.textOverflow = 'initial !important';
      title.style.whiteSpace = 'normal !important';
      title.style.maxHeight = 'none !important';
      title.style.minHeight = '0 !important';
      
      // Remove all line clamping
      title.style.webkitLineClamp = 'none !important';
      title.style.webkitBoxOrient = 'initial !important';
      
      // Increase spacing between title and tags/date
      title.style.marginBottom = '1rem !important';
      
      // Just to be sure, use setAttribute with !important flags
      title.setAttribute('style', 
        'display: block !important; ' +
        'overflow: visible !important; ' +
        'text-overflow: initial !important; ' +
        'white-space: normal !important; ' +
        'max-height: none !important; ' +
        'min-height: 0 !important; ' +
        'line-height: 1.5 !important; ' +
        'margin-bottom: 1rem !important; ' +
        '-webkit-line-clamp: none !important; ' +
        '-webkit-box-orient: initial !important;'
      );
    });
  }
  
  // Apply on load and multiple times with delays to catch all rendering phases
  window.addEventListener('load', fixTitles);
  setTimeout(fixTitles, 500);
  setTimeout(fixTitles, 1000);
  setTimeout(fixTitles, 2000);
})(); 