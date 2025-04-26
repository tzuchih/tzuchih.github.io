// Script to ensure CV link is aligned properly
(function() {
  function fixCVLinkAlignment() {
    // Get all sidebar links to use as reference
    const sidebarLinks = document.querySelectorAll('.sidebar-item-container a:not([href*="cv"])');
    const cvLinks = document.querySelectorAll('.sidebar-item-container a[href*="cv"]');
    
    if (sidebarLinks.length > 0 && cvLinks.length > 0) {
      // Use the first non-CV link as a reference
      const referenceLink = sidebarLinks[0];
      const referenceStyle = window.getComputedStyle(referenceLink);
      
      // Apply the same styles to CV links
      cvLinks.forEach(function(cvLink) {
        // Apply exact same display properties
        cvLink.style.display = 'flex';
        cvLink.style.alignItems = 'center';
        cvLink.style.height = '40px';
        cvLink.style.padding = referenceStyle.padding || '0.5rem 0.5rem 0.5rem 1rem';
        cvLink.style.margin = '0';
        cvLink.style.textIndent = '0';
        cvLink.style.justifyContent = 'flex-start';
        cvLink.style.textAlign = 'left';
        
        // Copy left position properties from reference
        cvLink.style.paddingLeft = referenceStyle.paddingLeft;
        cvLink.style.marginLeft = referenceStyle.marginLeft;
        cvLink.style.left = referenceStyle.left;
        cvLink.style.position = referenceStyle.position;
        cvLink.style.boxSizing = 'border-box';
        
        // Get the menu text
        const menuText = cvLink.querySelector('.menu-text');
        if (menuText) {
          menuText.style.display = 'inline-block';
          menuText.style.margin = '0';
          menuText.style.padding = '0';
          menuText.style.textAlign = 'left';
          menuText.style.textIndent = '0';
          menuText.style.whiteSpace = 'nowrap';
          
          // Find menu text in reference link to match exact position
          const referenceMenuText = referenceLink.querySelector('.menu-text');
          if (referenceMenuText) {
            const refMenuStyle = window.getComputedStyle(referenceMenuText);
            menuText.style.paddingLeft = refMenuStyle.paddingLeft;
            menuText.style.marginLeft = refMenuStyle.marginLeft;
          }
        }
        
        // Apply parent container styles
        const container = cvLink.closest('.sidebar-item-container');
        if (container) {
          container.style.display = 'block';
          container.style.height = 'auto';
          container.style.padding = '0';
          container.style.margin = '0';
          container.style.textAlign = 'left';
          container.style.textIndent = '0';
          
          // Find container for reference link
          const referenceContainer = referenceLink.closest('.sidebar-item-container');
          if (referenceContainer) {
            const refContainerStyle = window.getComputedStyle(referenceContainer);
            container.style.paddingLeft = refContainerStyle.paddingLeft;
            container.style.marginLeft = refContainerStyle.marginLeft;
          }
          
          const item = container.closest('.sidebar-item');
          if (item) {
            item.style.display = 'block';
            item.style.height = 'auto';
            item.style.padding = '0';
            item.style.margin = '0';
            item.style.textAlign = 'left';
            item.style.textIndent = '0';
          }
        }
      });
    }
  }
  
  // Run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixCVLinkAlignment);
  } else {
    fixCVLinkAlignment();
  }
  
  // Also run after load and with short delays
  window.addEventListener('load', fixCVLinkAlignment);
  setTimeout(fixCVLinkAlignment, 100);
  setTimeout(fixCVLinkAlignment, 500);
})(); 