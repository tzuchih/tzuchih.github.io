/**
 * Script to neutralize all colors in code outputs
 */
document.addEventListener('DOMContentLoaded', function() {
  function neutralizeColors() {
    // Create a style element with very aggressive overrides
    const style = document.createElement('style');
    style.textContent = `
      /* Universal output color neutralization */
      .cell-output, 
      .cell-output-stdout, 
      .cell-output-stderr, 
      .cell-output-display,
      .cell-output *, 
      .cell-output-stdout *, 
      .cell-output-stderr *, 
      .cell-output-display * {
        color: #444444 !important;
      }
      
      /* Target specific elements that might have bright colors */
      .dataframe,
      .dataframe *,
      .jupyter-dataframe,
      .jupyter-dataframe *,
      table.dataframe,
      table.dataframe *,
      .cell-output table,
      .cell-output table *,
      .cell-output-stdout table,
      .cell-output-stdout table * {
        color: #444444 !important;
      }
      
      /* Force all TD and TH elements to have neutral colors */
      .cell-output td, 
      .cell-output th,
      .cell-output-stdout td,
      .cell-output-stdout th,
      .cell-output-display td,
      .cell-output-display th {
        color: #444444 !important;
      }
      
      /* Target any element with 'dataframe' in the class name */
      [class*="dataframe"],
      [class*="dataframe"] * {
        color: #444444 !important;
      }
      
      /* Override any color attributes inline */
      [style*="color"],
      [data-style*="color"] {
        color: #444444 !important;
      }
    `;
    
    document.head.appendChild(style);
    
    // Apply directly to all elements inside outputs
    const outputs = document.querySelectorAll('.cell-output, .cell-output-stdout, .cell-output-stderr, .cell-output-display');
    outputs.forEach(output => {
      // Force every single element to have neutral color
      const allElements = output.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.setProperty('color', '#444444', 'important');
        
        // Also capture any SVG elements
        if (el.tagName.toLowerCase() === 'svg') {
          const svgElements = el.querySelectorAll('*');
          svgElements.forEach(svgEl => {
            svgEl.style.setProperty('fill', '#444444', 'important');
            svgEl.style.setProperty('stroke', '#444444', 'important');
          });
        }
      });
    });
    
    console.log('Output color neutralization applied');
  }
  
  // Run immediately
  neutralizeColors();
  
  // And again after delays to catch dynamically loaded content
  setTimeout(neutralizeColors, 500);
  setTimeout(neutralizeColors, 1000);
  setTimeout(neutralizeColors, 2000);
  
  // Also observe DOM changes to reapply when new content is added
  const observer = new MutationObserver(mutations => {
    setTimeout(neutralizeColors, 100);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}); 