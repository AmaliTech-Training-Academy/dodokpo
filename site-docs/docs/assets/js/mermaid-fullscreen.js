// Mermaid fullscreen viewer for MkDocs Material
// Watches for rendered SVGs inside .mermaid containers and adds expand buttons

(function () {
  function addFullscreenButtons() {
    // MkDocs Material renders mermaid into <pre class="mermaid"> -> <svg>
    // Also check for <div class="mermaid"> -> <svg>
    document.querySelectorAll('pre.mermaid svg, .mermaid svg').forEach(function (svg) {
      var container = svg.closest('.mermaid');
      if (!container || container.getAttribute('data-fs-ready')) return;
      container.setAttribute('data-fs-ready', 'true');

      // Wrap in relative container for button positioning
      if (!container.parentElement.classList.contains('mermaid-wrapper')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'mermaid-wrapper';
        container.parentNode.insertBefore(wrapper, container);
        wrapper.appendChild(container);
      }

      var btn = document.createElement('button');
      btn.className = 'mermaid-fullscreen-btn';
      btn.title = 'View fullscreen';
      btn.textContent = '\u26F6';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openFullscreen(svg);
      });
      container.parentElement.appendChild(btn);
    });
  }

  function openFullscreen(svg) {
    // Get the original viewBox for proper scaling
    var viewBox = svg.getAttribute('viewBox');
    var svgClone = svg.cloneNode(true);

    // Clear all size constraints — let CSS handle it
    svgClone.removeAttribute('width');
    svgClone.removeAttribute('height');
    svgClone.removeAttribute('style');
    svgClone.style.width = '100%';
    svgClone.style.height = '100%';
    if (viewBox) {
      svgClone.setAttribute('viewBox', viewBox);
    }
    svgClone.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'mermaid-fullscreen-overlay';

    // Toolbar
    var toolbar = document.createElement('div');
    toolbar.className = 'mermaid-fullscreen-toolbar';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'mermaid-fullscreen-close';
    closeBtn.innerHTML = '&times; Close';
    closeBtn.addEventListener('click', cleanup);
    toolbar.appendChild(closeBtn);

    // Content area
    var content = document.createElement('div');
    content.className = 'mermaid-fullscreen-content';
    content.appendChild(svgClone);

    overlay.appendChild(toolbar);
    overlay.appendChild(content);

    // Close handlers
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) cleanup();
    });

    function onKey(e) {
      if (e.key === 'Escape') cleanup();
    }
    document.addEventListener('keydown', onKey);

    function cleanup() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  // Run on load and watch for dynamic rendering
  var observer = new MutationObserver(addFullscreenButtons);
  observer.observe(document.body, { childList: true, subtree: true });

  // Also run on page navigation (MkDocs instant loading)
  document.addEventListener('DOMContentLoaded', addFullscreenButtons);
  if (typeof document$ !== 'undefined') {
    document$.subscribe(addFullscreenButtons);
  }
})();
