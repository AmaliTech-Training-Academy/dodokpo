document.addEventListener('DOMContentLoaded', function () {
  var observer = new MutationObserver(function () {
    document.querySelectorAll('.mermaid:not([data-fs-ready])').forEach(function (el) {
      el.setAttribute('data-fs-ready', 'true');

      var btn = document.createElement('button');
      btn.className = 'mermaid-fullscreen-btn';
      btn.title = 'View fullscreen';
      btn.innerHTML = '&#x26F6;';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openFullscreen(el);
      });

      if (!el.parentElement.classList.contains('mermaid-wrapper')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'mermaid-wrapper';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
      }
      el.parentElement.appendChild(btn);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function openFullscreen(mermaidEl) {
    // Grab the rendered SVG directly
    var svg = mermaidEl.querySelector('svg');
    if (!svg) return;

    var svgClone = svg.cloneNode(true);
    // Remove any inline width/height constraints so CSS can control sizing
    svgClone.removeAttribute('width');
    svgClone.removeAttribute('height');
    svgClone.removeAttribute('style');
    svgClone.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Build overlay
    var overlay = document.createElement('div');
    overlay.className = 'mermaid-fullscreen-overlay';

    var toolbar = document.createElement('div');
    toolbar.className = 'mermaid-fullscreen-toolbar';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'mermaid-fullscreen-close';
    closeBtn.innerHTML = '&times; Close';
    closeBtn.addEventListener('click', function () {
      cleanup();
    });
    toolbar.appendChild(closeBtn);

    var content = document.createElement('div');
    content.className = 'mermaid-fullscreen-content';
    content.appendChild(svgClone);

    overlay.appendChild(toolbar);
    overlay.appendChild(content);

    // Close on backdrop click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === content) {
        cleanup();
      }
    });

    // Close on Escape
    function onKey(e) {
      if (e.key === 'Escape') cleanup();
    }
    document.addEventListener('keydown', onKey);

    function cleanup() {
      if (overlay.parentNode) {
        document.body.removeChild(overlay);
      }
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }
});
