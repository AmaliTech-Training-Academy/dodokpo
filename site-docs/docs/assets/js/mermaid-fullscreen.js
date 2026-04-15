document.addEventListener('DOMContentLoaded', function () {
  // Wait for Mermaid to render
  const observer = new MutationObserver(function () {
    document.querySelectorAll('.mermaid:not([data-fullscreen-ready])').forEach(function (el) {
      el.setAttribute('data-fullscreen-ready', 'true');

      // Create fullscreen button
      var btn = document.createElement('button');
      btn.className = 'mermaid-fullscreen-btn';
      btn.title = 'View fullscreen';
      btn.innerHTML = '&#x26F6;';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openFullscreen(el);
      });

      // Wrap if not already wrapped
      if (!el.parentElement.classList.contains('mermaid-wrapper')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'mermaid-wrapper';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.appendChild(btn);
      } else {
        el.parentElement.appendChild(btn);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function openFullscreen(mermaidEl) {
    var overlay = document.createElement('div');
    overlay.className = 'mermaid-fullscreen-overlay';

    var container = document.createElement('div');
    container.className = 'mermaid-fullscreen-container';

    var clone = mermaidEl.cloneNode(true);
    clone.style.maxWidth = 'none';
    clone.style.maxHeight = 'none';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'mermaid-fullscreen-close';
    closeBtn.innerHTML = '&times; Close';
    closeBtn.addEventListener('click', function () {
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
    });

    container.appendChild(closeBtn);
    container.appendChild(clone);
    overlay.appendChild(container);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        if (document.querySelector('.mermaid-fullscreen-overlay')) {
          document.body.removeChild(overlay);
          document.body.style.overflow = '';
        }
        document.removeEventListener('keydown', handler);
      }
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }
});
