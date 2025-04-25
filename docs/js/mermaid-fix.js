// Mermaid diagram initialization and rendering
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize mermaid with proper configuration
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        themeVariables: {
          primaryColor: '#999999',
          primaryTextColor: '#333333',
          primaryBorderColor: '#777777',
          lineColor: '#555555',
          secondaryColor: '#f4f4f4',
          tertiaryColor: '#ffffff'
        },
        flowchart: {
          htmlLabels: true,
          curve: 'basis'
        }
      });
      
      // Wait a bit and force render all diagrams
      setTimeout(function() {
        try {
          // Parse all diagram divs
          document.querySelectorAll('.mermaid').forEach(function(el) {
            // Clean up the content if needed (remove any Quarto directives)
            let content = el.textContent || '';
            if (content.includes('#|')) {
              // Filter out Quarto directives
              content = content.split('\n').filter(line => !line.trim().startsWith('#|')).join('\n');
              el.textContent = content;
            }
          });
          
          // Render all diagrams
          mermaid.run();
        } catch (e) {
          console.error('Error rendering mermaid diagrams:', e);
        }
      }, 1000);
    }
  });
})(); 