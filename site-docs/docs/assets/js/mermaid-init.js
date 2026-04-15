// Initialize Mermaid after the library loads
// MkDocs Material with superfences creates <pre class="mermaid"><code>...</code></pre>
// We need to extract the code text into the parent and let Mermaid render it

document.addEventListener('DOMContentLoaded', function () {
  // Fix elements: move code content to parent pre/div for Mermaid to pick up
  document.querySelectorAll('pre.mermaid code, div.mermaid code').forEach(function (code) {
    var parent = code.parentElement;
    parent.textContent = code.textContent;
    parent.removeAttribute('class');
    parent.classList.add('mermaid');
  });

  // Initialize Mermaid
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit'
    });
    mermaid.run({ querySelector: '.mermaid' });
  }
});

// Re-run on MkDocs instant navigation
if (typeof document$ !== 'undefined') {
  document$.subscribe(function () {
    setTimeout(function () {
      document.querySelectorAll('pre.mermaid code, div.mermaid code').forEach(function (code) {
        var parent = code.parentElement;
        parent.textContent = code.textContent;
        parent.removeAttribute('class');
        parent.classList.add('mermaid');
      });
      if (typeof mermaid !== 'undefined') {
        mermaid.run({ querySelector: '.mermaid' });
      }
    }, 100);
  });
}
