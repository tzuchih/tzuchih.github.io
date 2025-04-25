/**
 * Code block toggle functionality
 * Allows collapsing and expanding code blocks
 */
document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('div.sourceCode');
  
  // Add click handler for each
  codeBlocks.forEach(block => {
    block.addEventListener('click', function(e) {
      // Check if clicking the toggle button area (top right corner)
      const rect = block.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      if (clickX >= rect.width - 30 && clickY <= 30) {
        // Toggle the collapsed class
        block.classList.toggle('collapsed');
        e.stopPropagation();
      }
    });
  });
}); 