// Mermaid fullscreen viewer with zoom/pan for MkDocs Material
(function () {
  function addFullscreenButtons() {
    document.querySelectorAll('pre.mermaid svg, .mermaid svg').forEach(function (svg) {
      var container = svg.closest('.mermaid') || svg.parentElement;
      if (!container || container.getAttribute('data-fs-ready')) return;
      container.setAttribute('data-fs-ready', 'true');

      if (!container.parentElement.classList.contains('mermaid-wrapper')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'mermaid-wrapper';
        container.parentNode.insertBefore(wrapper, container);
        wrapper.appendChild(container);
      }

      var btn = document.createElement('button');
      btn.className = 'mermaid-fullscreen-btn';
      btn.title = 'Fullscreen (click to zoom & pan)';
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
    var svgSource = svg.outerHTML;

    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'mfs-overlay';

    // Toolbar
    var toolbar = document.createElement('div');
    toolbar.className = 'mfs-toolbar';

    var zoomInfo = document.createElement('span');
    zoomInfo.className = 'mfs-zoom-info';
    zoomInfo.textContent = '100%';

    var btnZoomIn = makeBtn('+', 'Zoom in');
    var btnZoomOut = makeBtn('\u2212', 'Zoom out');
    var btnFit = makeBtn('Fit', 'Fit to screen');
    var btnClose = document.createElement('button');
    btnClose.className = 'mfs-btn mfs-btn-close';
    btnClose.innerHTML = '&times; Close';
    btnClose.addEventListener('click', cleanup);

    toolbar.appendChild(btnZoomOut);
    toolbar.appendChild(zoomInfo);
    toolbar.appendChild(btnZoomIn);
    toolbar.appendChild(btnFit);
    toolbar.appendChild(btnClose);

    // Viewport (scrollable area)
    var viewport = document.createElement('div');
    viewport.className = 'mfs-viewport';

    // Canvas (the thing that gets scaled)
    var canvas = document.createElement('div');
    canvas.className = 'mfs-canvas';
    canvas.innerHTML = svgSource;

    var innerSvg = canvas.querySelector('svg');
    if (innerSvg) {
      innerSvg.removeAttribute('width');
      innerSvg.removeAttribute('height');
      innerSvg.removeAttribute('style');
      innerSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }

    viewport.appendChild(canvas);
    overlay.appendChild(toolbar);
    overlay.appendChild(viewport);

    // Zoom state
    var scale = 1;
    var MIN_SCALE = 0.2;
    var MAX_SCALE = 5;

    function setScale(s) {
      scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
      canvas.style.transform = 'scale(' + scale + ')';
      zoomInfo.textContent = Math.round(scale * 100) + '%';
    }

    function fitToScreen() {
      if (!innerSvg) return;
      var vw = viewport.clientWidth - 48;
      var vh = viewport.clientHeight - 48;
      var bbox = innerSvg.getBBox ? innerSvg.getBBox() : { width: 800, height: 600 };
      var svgW = bbox.width || innerSvg.viewBox.baseVal.width || 800;
      var svgH = bbox.height || innerSvg.viewBox.baseVal.height || 600;
      var fitScale = Math.min(vw / svgW, vh / svgH, 2);
      setScale(fitScale);
      // Center scroll
      viewport.scrollLeft = (canvas.scrollWidth - viewport.clientWidth) / 2;
      viewport.scrollTop = (canvas.scrollHeight - viewport.clientHeight) / 2;
    }

    btnZoomIn.addEventListener('click', function () { setScale(scale * 1.3); });
    btnZoomOut.addEventListener('click', function () { setScale(scale / 1.3); });
    btnFit.addEventListener('click', fitToScreen);

    // Mouse wheel zoom
    viewport.addEventListener('wheel', function (e) {
      e.preventDefault();
      var delta = e.deltaY > 0 ? 0.85 : 1.18;
      setScale(scale * delta);
    }, { passive: false });

    // Drag to pan
    var dragging = false, startX, startY, scrollL, scrollT;
    viewport.addEventListener('mousedown', function (e) {
      if (e.target.tagName === 'BUTTON') return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      scrollL = viewport.scrollLeft;
      scrollT = viewport.scrollTop;
      viewport.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      viewport.scrollLeft = scrollL - (e.clientX - startX);
      viewport.scrollTop = scrollT - (e.clientY - startY);
    });
    document.addEventListener('mouseup', function () {
      dragging = false;
      viewport.style.cursor = 'grab';
    });

    // Keyboard
    function onKey(e) {
      if (e.key === 'Escape') cleanup();
      if (e.key === '+' || e.key === '=') setScale(scale * 1.2);
      if (e.key === '-') setScale(scale / 1.2);
      if (e.key === '0') fitToScreen();
    }
    document.addEventListener('keydown', onKey);

    function cleanup() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Initial fit after render
    requestAnimationFrame(function () {
      requestAnimationFrame(fitToScreen);
    });
  }

  function makeBtn(text, title) {
    var b = document.createElement('button');
    b.className = 'mfs-btn';
    b.textContent = text;
    b.title = title;
    return b;
  }

  var observer = new MutationObserver(addFullscreenButtons);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', addFullscreenButtons);
  if (typeof document$ !== 'undefined') {
    document$.subscribe(addFullscreenButtons);
  }
})();
