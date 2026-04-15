// This script loads BEFORE mermaid.min.js
// Strip <code> wrappers so Mermaid can parse the content when it auto-initializes

function stripCodeWrappers() {
  document.querySelectorAll('pre.mermaid code').forEach(function (code) {
    var pre = code.parentElement;
    pre.textContent = code.textContent;
  });
}

// Run immediately if DOM is ready, otherwise on DOMContentLoaded
// Must happen BEFORE mermaid's DOMContentLoaded handler
if (document.readyState === 'loading') {
  // Use capture phase to run before mermaid's listener
  document.addEventListener('DOMContentLoaded', stripCodeWrappers, true);
} else {
  stripCodeWrappers();
}
