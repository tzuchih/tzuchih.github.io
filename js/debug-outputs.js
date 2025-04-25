/**
 * Debug script for code outputs
 * This script will log information about code outputs to help diagnose display issues
 */
document.addEventListener('DOMContentLoaded', function() {
  // Wait for the page to fully load
  setTimeout(function() {
    // Get all code outputs
    const outputs = document.querySelectorAll('.cell-output, .cell-output-stdout, .cell-output-stderr, .cell-output-display');
    
    console.log(`[DEBUG] Found ${outputs.length} output elements`);
    
    if (outputs.length === 0) {
      console.warn('[DEBUG] No output elements found on the page.');
      
      // Check if code blocks exist
      const codeBlocks = document.querySelectorAll('.sourceCode, .cell-code');
      console.log(`[DEBUG] Found ${codeBlocks.length} code blocks.`);
      
      // Check if there might be hidden output elements
      const hiddenOutputs = document.querySelectorAll('[class*="output"]');
      console.log(`[DEBUG] Found ${hiddenOutputs.length} elements with 'output' in their class names.`);
      
      return;
    }
    
    // Log information about each output
    outputs.forEach((output, index) => {
      // Get computed style
      const style = window.getComputedStyle(output);
      
      console.log(`[DEBUG] Output #${index + 1}:`);
      console.log(`  - Element: ${output.tagName}.${output.className}`);
      console.log(`  - Display: ${style.display}`);
      console.log(`  - Visibility: ${style.visibility}`);
      console.log(`  - Opacity: ${style.opacity}`);
      console.log(`  - Height: ${style.height}`);
      console.log(`  - MaxHeight: ${style.maxHeight}`);
      console.log(`  - Background: ${style.backgroundColor}`);
      console.log(`  - Z-index: ${style.zIndex}`);
      console.log(`  - Position: ${style.position}`);
      
      // Check parent elements for possible issues
      let parent = output.parentElement;
      let depth = 0;
      while (parent && depth < 3) {
        const parentStyle = window.getComputedStyle(parent);
        console.log(`  - Parent (${depth}) ${parent.tagName}.${parent.className}:`);
        console.log(`    - Display: ${parentStyle.display}`);
        console.log(`    - Visibility: ${parentStyle.visibility}`);
        console.log(`    - Height: ${parentStyle.height}`);
        console.log(`    - Overflow: ${parentStyle.overflow}`);
        
        parent = parent.parentElement;
        depth++;
      }
      
      // Add visual marker to help locate the element
      output.setAttribute('data-debug-id', `output-${index + 1}`);
      output.style.border = '2px dashed red';
    });
    
    // Add a toggle button to show debug info
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Output Debug';
    toggleBtn.style.cssText = 'position: fixed; bottom: 10px; right: 10px; z-index: 10000; padding: 5px 10px; background: #7cb342; color: white; border: none; border-radius: 4px; cursor: pointer;';
    
    toggleBtn.addEventListener('click', function() {
      outputs.forEach((output, index) => {
        if (output.style.border === '2px dashed red') {
          output.style.border = '';
        } else {
          output.style.border = '2px dashed red';
        }
      });
    });
    
    document.body.appendChild(toggleBtn);
    
    console.log('[DEBUG] Code output debugging complete. Check console for details.');
  }, 2000); // Wait 2 seconds for everything to load
}); 