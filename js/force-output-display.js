/**
 * Force code outputs to be visible
 */
document.addEventListener('DOMContentLoaded', function() {
  // Force display of all code outputs
  function showOutputs() {
    // Get all code outputs
    const outputs = document.querySelectorAll('.cell-output, .cell-output-stdout, .cell-output-stderr, .cell-output-display');
    
    if (outputs.length === 0) {
      console.log('No output elements found, will retry later.');
      return; // Will retry later
    }
    
    console.log(`Found ${outputs.length} output elements to style.`);
    
    // Force display
    outputs.forEach(output => {
      // Ensure output is visible at the CSS level
      output.style.cssText = `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        position: relative !important;
        z-index: 100 !important;
        
        background-color: #f8f9fa !important;
        border-left: 2px solid #6B8CAC !important;
        border-radius: 0 !important;
        padding: 0.5rem 1rem !important;
        margin: 0.25rem 0 0.5rem 0 !important;
        color: #444444 !important;
        font-family: monospace !important;
        font-size: 0.9rem !important;
        line-height: 1.4 !important;
        box-shadow: none !important;
      `;
      
      // Fix pre elements inside outputs
      const pres = output.querySelectorAll('pre');
      pres.forEach(pre => {
        pre.style.cssText = `
          margin: 0 !important;
          padding: 0 !important;
          background-color: transparent !important;
          border: none !important;
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
          overflow: visible !important;
          color: #444444 !important;
        `;
      });
      
      // Also style code elements inside pre
      const codes = output.querySelectorAll('pre > code');
      codes.forEach(code => {
        code.style.cssText = `
          display: block !important;
          visibility: visible !important;
          background-color: transparent !important;
          color: #444444 !important;
        `;
      });
      
      // Mute dataframe colors
      const tables = output.querySelectorAll('table, .dataframe, .jupyter-dataframe');
      tables.forEach(table => {
        table.style.color = '#444444';
        
        // Override all cell colors in the table
        const cells = table.querySelectorAll('th, td');
        cells.forEach(cell => {
          cell.style.color = '#444444';
        });
      });
    });
    
    console.log('Output styling applied.');
  }
  
  // Run immediately
  showOutputs();
  
  // Also run after delays to catch dynamically added elements
  setTimeout(showOutputs, 500);
  setTimeout(showOutputs, 1000);
  setTimeout(showOutputs, 2000);
  setTimeout(showOutputs, 3000);
  
  // Monitor for changes
  const observer = new MutationObserver(function(mutations) {
    // Delay execution slightly to allow for any transitions or animations to complete
    setTimeout(showOutputs, 100);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
  
  // Add a small indicator to show the script has run
  const indicator = document.createElement('div');
  indicator.style.cssText = 'position: fixed; bottom: 5px; right: 5px; width: 10px; height: 10px; background-color: #6B8CAC; border-radius: 50%; opacity: 0.5; z-index: 10000;';
  document.body.appendChild(indicator);
  
  console.log('Force output display script initialized.');
}); 