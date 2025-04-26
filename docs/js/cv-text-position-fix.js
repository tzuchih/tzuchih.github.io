// Special fix for CV text position
(function() {
  function matchCVTextPosition() {
    try {
      // Get reference to a regular sidebar link (like Home)
      const homeLink = document.querySelector('.sidebar a[href*="home"], .sidebar a[href*="index"], .sidebar-item-container a:first-child');
      // Get all other regular links for comparison
      const regularLinks = document.querySelectorAll('.sidebar-item-container a:not([href*="cv"])');
      // Get CV link
      const cvLink = document.querySelector('.sidebar-item-container a[href*="cv"]');
      
      if (homeLink && cvLink) {
        // Force the same exact styles as the home link
        const homeLinkStyle = window.getComputedStyle(homeLink);
        
        // Apply all text positioning properties
        cvLink.style.paddingLeft = homeLinkStyle.paddingLeft;
        cvLink.style.marginLeft = homeLinkStyle.marginLeft;
        cvLink.style.textIndent = homeLinkStyle.textIndent;
        cvLink.style.textAlign = homeLinkStyle.textAlign;
        cvLink.style.display = homeLinkStyle.display;
        cvLink.style.alignItems = homeLinkStyle.alignItems;
        
        // Get the text nodes
        const homeText = homeLink.querySelector('.menu-text');
        const cvText = cvLink.querySelector('.menu-text');
        
        if (homeText && cvText) {
          // Get computed style of the home text
          const homeTextStyle = window.getComputedStyle(homeText);
          
          // Apply the exact same styles to CV text
          cvText.style.paddingLeft = homeTextStyle.paddingLeft;
          cvText.style.marginLeft = homeTextStyle.marginLeft;
          cvText.style.textIndent = homeTextStyle.textIndent;
          cvText.style.position = homeTextStyle.position;
          
          // Calculate positions
          const homeRect = homeText.getBoundingClientRect();
          const cvRect = cvText.getBoundingClientRect();
          
          // Measure the difference in left position
          const leftDiff = homeRect.left - cvRect.left;
          
          if (Math.abs(leftDiff) > 1) {
            // Apply adjustment if there's a meaningful difference
            const currentMarginLeft = parseFloat(window.getComputedStyle(cvText).marginLeft) || 0;
            cvText.style.marginLeft = (currentMarginLeft + leftDiff) + 'px';
          }
          
          // Check if there are other regular links to ensure consistency
          if (regularLinks.length > 1) {
            const allLeftPositions = [];
            
            // Collect the left positions of all regular links
            regularLinks.forEach(link => {
              const text = link.querySelector('.menu-text');
              if (text) {
                allLeftPositions.push(text.getBoundingClientRect().left);
              }
            });
            
            // If we have positions, calculate the average left position
            if (allLeftPositions.length > 0) {
              const avgLeft = allLeftPositions.reduce((a, b) => a + b, 0) / allLeftPositions.length;
              const cvLeft = cvText.getBoundingClientRect().left;
              const avgDiff = avgLeft - cvLeft;
              
              if (Math.abs(avgDiff) > 1) {
                // If there's still a difference, apply additional adjustment
                const curMarginLeft = parseFloat(window.getComputedStyle(cvText).marginLeft) || 0;
                cvText.style.marginLeft = (curMarginLeft + avgDiff) + 'px';
              }
            }
          }
        }
        
        // Apply the style directly to parent elements
        const cvContainer = cvLink.closest('.sidebar-item-container');
        const homeContainer = homeLink.closest('.sidebar-item-container');
        
        if (cvContainer && homeContainer) {
          const homeContainerStyle = window.getComputedStyle(homeContainer);
          cvContainer.style.paddingLeft = homeContainerStyle.paddingLeft;
          cvContainer.style.marginLeft = homeContainerStyle.marginLeft;
          cvContainer.style.textIndent = homeContainerStyle.textIndent;
        }
      }
    } catch (e) {
      console.error('Error in CV text position fix:', e);
    }
  }
  
  // Run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      matchCVTextPosition();
      setTimeout(matchCVTextPosition, 100);
      setTimeout(matchCVTextPosition, 500);
    });
  } else {
    matchCVTextPosition();
    setTimeout(matchCVTextPosition, 100);
    setTimeout(matchCVTextPosition, 500);
  }
  
  // Also run after window load
  window.addEventListener('load', function() {
    matchCVTextPosition();
    setTimeout(matchCVTextPosition, 100);
    setTimeout(matchCVTextPosition, 500);
  });
})(); 