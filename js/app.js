// --- DYNAMIC BACKGROUND (Smooth Gradient Waves) ---
function initGradientBackground() {
  const canvas = document.getElementById('gradient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let time = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawWave(yOffset, amplitude, frequency, phase, colorStart, colorEnd, opacity) {
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    // Draw the wave path
    for (let x = 0; x <= width; x += 20) {
      let y = yOffset 
            + Math.sin(x * frequency + time + phase) * amplitude 
            + Math.cos(x * frequency * 0.7 - time * 0.8 + phase) * amplitude * 0.5;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    // Gradient for the wave
    const grad = ctx.createLinearGradient(0, yOffset - amplitude * 2, 0, height);
    grad.addColorStop(0, colorStart);
    grad.addColorStop(1, colorEnd);
    
    ctx.globalAlpha = opacity;
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }

  function animate() {
    // Fill base
    ctx.fillStyle = '#f0f4f8';
    ctx.fillRect(0, 0, width, height);

    // Wave 1: Deep Blue (background)
    drawWave(height * 0.4, height * 0.15, 0.0015, 0, '#1d5497', '#153f71', 0.8);
    
    // Wave 2: Red
    drawWave(height * 0.55, height * 0.12, 0.002, 2, '#d32f2f', '#9a0007', 0.7);
    
    // Wave 3: Light Blue
    drawWave(height * 0.7, height * 0.1, 0.0018, 4, '#2a73cc', '#1d5497', 0.8);
    
    // Wave 4: White/Gray (foreground)
    drawWave(height * 0.85, height * 0.08, 0.0025, 1, '#ffffff', '#e2e8f0', 0.9);

    time += 0.015;
    requestAnimationFrame(animate);
  }

  animate();
}

// --- CATALOG RENDERING & FILTERING ---
function initCatalog() {
  const catalogContainer = document.getElementById('catalog-list');
  const filterCat = document.getElementById('filter-categoria');
  const filterMarca = document.getElementById('filter-marca');
  const filterEstado = document.getElementById('filter-estado');
  const estadoTabs = document.querySelectorAll('.estado-tab-btn');
  const brandChips = document.querySelectorAll('.brand-chip');
  const btnClearBrand = document.getElementById('btn-clear-brand-filter');

  if (!catalogContainer) return; // Not on the catalog page

  function renderCatalog(items) {
    catalogContainer.innerHTML = '';
    
    if(items.length === 0) {
      catalogContainer.innerHTML = `
        <div style="text-align:center; padding: 3.5rem 1rem; width: 100%; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1; grid-column: 1 / -1;">
          <i class="fas fa-search" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 1rem; display: block;"></i>
          <h3 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 0.5rem;">No se encontraron maquinarias</h3>
          <p style="color: #64748b; font-size: 0.95rem; max-width: 450px; margin: 0 auto 1.25rem;">No hay productos disponibles que coincidan con la combinación de filtros seleccionada.</p>
          <button type="button" class="btn btn-outline" id="btn-reset-filters-empty" style="font-size: 0.88rem; padding: 8px 18px;">
            <i class="fas fa-undo"></i> Restablecer todos los filtros
          </button>
        </div>
      `;
      const btnReset = document.getElementById('btn-reset-filters-empty');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          if (filterCat) filterCat.value = 'todas';
          if (filterMarca) filterMarca.value = 'todas';
          if (filterEstado) filterEstado.value = 'todos';
          applyFilters();
        });
      }
      return;
    }

    items.forEach(item => {
      const priceTag = window.formatAgroPrice ? window.formatAgroPrice(item) : '';
      const isSold = !!item.vendido;
      const soldRibbon = isSold ? `<span class="badge-sold-ribbon"><i class="fas fa-tag"></i> VENDIDO</span>` : '';
      const soldTag = isSold ? `<span class="badge-status-sold">Vendido</span>` : '';
      
      // Condition Badge
      const isNuevo = item.estado === 'Nuevo';
      const conditionBadge = isNuevo 
        ? `<span class="badge-condition-nuevo"><i class="fas fa-certificate"></i> Nuevo</span>`
        : `<span class="badge-condition-usado"><i class="fas fa-tag"></i> Usado</span>`;

      const html = `
        <article class="catalog-item ${isSold ? 'is-sold' : ''}" data-id="${item.id}">
          <div class="catalog-item-img-wrapper">
            ${soldRibbon}
            <img src="${item.imagen}" alt="${item.nombre}" class="catalog-item-img">
          </div>
          <div class="catalog-item-content">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span class="product-category" style="margin-bottom:0;">${item.categoria} &bull; ${item.marca}</span>
                ${conditionBadge}
                ${soldTag}
              </div>
              ${priceTag}
            </div>
            <h3 class="product-title" style="${isSold ? 'color: #991b1b;' : ''}">${item.nombre}</h3>
            <p class="product-desc">${item.descripcionCorta}</p>
            <a href="producto-detalle.html?id=${item.id}" class="btn btn-outline ${isSold ? 'btn-outline-sold' : ''}">
              ${isSold ? 'Ver equipo (Vendido)' : 'Ver detalles'}
            </a>
          </div>
        </article>
      `;
      catalogContainer.innerHTML += html;
    });

    if (window.attachCardAdminControls) {
      window.attachCardAdminControls();
    }
  }

  function syncFilterUI(valCat, valMarca, valEstado) {
    // Sync Estado Tabs
    estadoTabs.forEach(tab => {
      const tabEstado = tab.getAttribute('data-estado');
      if (tabEstado === valEstado) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Sync Brand Chips
    brandChips.forEach(chip => {
      const chipMarca = chip.getAttribute('data-marca');
      if (chipMarca === valMarca) {
        chip.classList.add('active');
        // Scroll chip into view smoothly if container exists
        chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        chip.classList.remove('active');
      }
    });

    // Clear Brand Filter button
    if (btnClearBrand) {
      if (valMarca && valMarca !== 'todas') {
        btnClearBrand.style.display = 'inline-flex';
      } else {
        btnClearBrand.style.display = 'none';
      }
    }

    // Sync Navbar Highlight
    const navNuevos = document.getElementById('nav-btn-nuevos');
    const navUsados = document.getElementById('nav-btn-usados');
    if (navNuevos) navNuevos.classList.toggle('active', valEstado === 'Nuevo');
    if (navUsados) navUsados.classList.toggle('active', valEstado === 'Usado');
  }

  function applyFilters() {
    const currentCatalog = window.getAgroCatalog ? window.getAgroCatalog() : (typeof catalogo !== 'undefined' ? catalogo : []);
    const valCat = filterCat ? filterCat.value : 'todas';
    const valMarca = filterMarca ? filterMarca.value : 'todas';
    const valEstado = filterEstado ? filterEstado.value : 'todos';

    syncFilterUI(valCat, valMarca, valEstado);

    const filtered = currentCatalog.filter(item => {
      const matchCat = valCat === 'todas' || item.categoria === valCat;
      const matchMarca = valMarca === 'todas' || item.marca === valMarca;
      let matchEstado = true;
      if (valEstado === 'Nuevo' || valEstado === 'Usado') {
        matchEstado = item.estado === valEstado;
      } else if (valEstado === 'Disponibles') {
        matchEstado = !item.vendido;
      } else if (valEstado === 'Vendidos') {
        matchEstado = !!item.vendido;
      }
      return matchCat && matchMarca && matchEstado;
    });

    renderCatalog(filtered);
  }

  // Event Listeners for Select Dropdowns
  if(filterCat) filterCat.addEventListener('change', applyFilters);
  if(filterMarca) filterMarca.addEventListener('change', applyFilters);
  if(filterEstado) filterEstado.addEventListener('change', applyFilters);

  // Estado Tabs Click Event
  estadoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetEstado = tab.getAttribute('data-estado');
      if (filterEstado) {
        filterEstado.value = targetEstado;
      }
      applyFilters();
    });
  });

  // Brand Chips Click Event
  brandChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const targetMarca = chip.getAttribute('data-marca');
      if (filterMarca) {
        filterMarca.value = targetMarca;
      }
      applyFilters();
    });
  });

  // Clear Brand Button
  if (btnClearBrand) {
    btnClearBrand.addEventListener('click', () => {
      if (filterMarca) {
        filterMarca.value = 'todas';
      }
      applyFilters();
    });
  }

  // URL Parameters on Load
  const urlParams = new URLSearchParams(window.location.search);
  const paramEstado = urlParams.get('estado');
  const paramMarca = urlParams.get('marca');
  const paramCat = urlParams.get('categoria');

  if (paramEstado && filterEstado) {
    filterEstado.value = paramEstado;
  }
  if (paramMarca && filterMarca) {
    // Check if option exists in select or select it directly
    filterMarca.value = paramMarca;
  }
  if (paramCat && filterCat) {
    filterCat.value = paramCat;
  }

  // View Mode Switcher (List vs Grid 2 items per row)
  const btnList = document.getElementById('view-mode-list');
  const btnGrid = document.getElementById('view-mode-grid');

  function setViewMode(mode) {
    if (mode === 'grid') {
      catalogContainer.classList.add('grid-view');
      if (btnGrid) btnGrid.classList.add('active');
      if (btnList) btnList.classList.remove('active');
      localStorage.setItem('agro_catalog_view', 'grid');
    } else {
      catalogContainer.classList.remove('grid-view');
      if (btnList) btnList.classList.add('active');
      if (btnGrid) btnGrid.classList.remove('active');
      localStorage.setItem('agro_catalog_view', 'list');
    }
  }

  if (btnList) btnList.addEventListener('click', () => setViewMode('list'));
  if (btnGrid) btnGrid.addEventListener('click', () => setViewMode('grid'));

  const savedView = localStorage.getItem('agro_catalog_view');
  if (savedView === 'grid') setViewMode('grid');

  // Initial render with applied filters (including URL params)
  applyFilters();

  // Global event listener for reactive updates
  window.addEventListener('agroCatalogUpdated', () => {
    applyFilters();
  });
}

// --- FEATURED PRODUCTS (Home Page) ---
function initFeatured() {
  const featuredContainer = document.getElementById('featured-grid');
  if(!featuredContainer) return;

  function renderFeatured() {
    const currentCatalog = window.getAgroCatalog ? window.getAgroCatalog() : (typeof catalogo !== 'undefined' ? catalogo : []);
    featuredContainer.innerHTML = '';
    const featured = currentCatalog.slice(0, 3);
    
    featured.forEach(item => {
      const priceTag = window.formatAgroPrice ? window.formatAgroPrice(item) : '';
      const isSold = !!item.vendido;
      const soldRibbon = isSold ? `<span class="badge-sold-ribbon"><i class="fas fa-tag"></i> VENDIDO</span>` : '';

      const html = `
        <a href="producto-detalle.html?id=${item.id}" class="product-card ${isSold ? 'is-sold' : ''}" data-id="${item.id}">
          <div class="product-card-img-wrapper">
            <span class="product-badge">${item.estado}</span>
            ${soldRibbon}
            <img src="${item.imagen}" alt="${item.nombre}" class="product-card-img">
          </div>
          <div class="product-card-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span class="product-category" style="margin-bottom:0;">${item.categoria}</span>
              ${priceTag}
            </div>
            <h3 class="product-title">${item.nombre}</h3>
            <p class="product-desc">${item.descripcionCorta}</p>
            <div style="color: ${isSold ? '#dc2626' : 'var(--brand-blue)'}; font-weight: 600; display:flex; align-items:center; gap: 0.5rem; margin-top: auto;">
              ${isSold ? 'Ver Equipo (Vendido) &rarr;' : 'Ver Detalles &rarr;'}
            </div>
          </div>
        </a>
      `;
      featuredContainer.innerHTML += html;
    });

    if (window.attachCardAdminControls) {
      window.attachCardAdminControls();
    }
  }

  renderFeatured();
  window.addEventListener('agroCatalogUpdated', renderFeatured);
}

// --- PRODUCT DETAILS ---
function initProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  const container = document.getElementById('product-detail-container');
  if(!container || !productId) return;

  const currentCatalog = window.getAgroCatalog ? window.getAgroCatalog() : (typeof catalogo !== 'undefined' ? catalogo : []);
  const product = currentCatalog.find(p => String(p.id) === String(productId));
  
  if(!product) {
    container.innerHTML = '<div class="container section"><h2>Producto no encontrado.</h2><a href="catalogo.html" class="btn btn-primary">Volver al catálogo</a></div>';
    return;
  }

  // Update page title
  document.title = product.nombre + " - Agroguardati";

  let specsRows = '';
  if (product.especificaciones) {
    for (const [key, value] of Object.entries(product.especificaciones)) {
      specsRows += `<tr><th>${key}</th><td>${value}</td></tr>`;
    }
  }

  const isSold = !!product.vendido;
  const soldDetailBadge = isSold ? `<span class="badge-sold-pill"><i class="fas fa-tag"></i> VENDIDO</span>` : '';
  const soldGalleryBadge = isSold ? `<span class="badge-sold-ribbon detail-gallery-sold"><i class="fas fa-tag"></i> EQUIPO VENDIDO</span>` : '';

  // Handle multiple images if they exist
  let galleryHtml = '';
  if (product.imagenes && product.imagenes.length > 0) {
    galleryHtml = `
      <div class="detail-image-gallery">
        <div style="position: relative; width: 100%; border-radius: var(--radius-lg); overflow: hidden;">
          ${soldGalleryBadge}
          <img src="${product.imagen}" alt="${product.nombre}" class="main-img" id="main-product-img">
        </div>
        <div class="gallery-thumbnails">
          ${product.imagenes.map((img, index) => `
            <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
              <img src="${img}" alt="${product.nombre} vista ${index + 1}">
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    galleryHtml = `
      <div class="detail-image-gallery">
        <div style="position: relative; width: 100%; border-radius: var(--radius-lg); overflow: hidden;">
          ${soldGalleryBadge}
          <img src="${product.imagen}" alt="${product.nombre}" class="main-img">
        </div>
      </div>
    `;
  }

  const detailPriceTag = window.formatAgroPrice ? window.formatAgroPrice(product) : '';
  const whatsappMsg = isSold 
    ? `Hola, vi que el equipo ${encodeURIComponent(product.nombre)} figura como VENDIDO. ¿Tienen equipos similares disponibles?`
    : `Hola, estoy interesado en el producto: ${encodeURIComponent(product.nombre)}`;

  container.innerHTML = `
    <div class="detail-hero">
      <div class="container">
        <span class="product-category" style="margin-bottom:1rem; display:block;">
          <a href="catalogo.html">Catálogo</a> / ${product.categoria} / ${product.marca}
        </span>
        <h1 class="product-detail-title" style="font-size: 2.5rem; margin-bottom: 1rem;">
          ${product.nombre}
        </h1>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; flex-wrap: wrap;">
          <span class="product-badge" style="position:static; display:inline-block;">${product.estado}</span>
          ${soldDetailBadge}
          ${detailPriceTag}
        </div>
      </div>
    </div>
    <div class="container section">
      <div class="detail-grid">
        ${galleryHtml}
        <div class="detail-info">
          ${isSold ? `
            <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1rem 1.25rem; border-radius: 10px; margin-bottom: 1.5rem;">
              <strong style="color: #991b1b; display: flex; align-items: center; gap: 6px; font-size: 1rem;">
                <i class="fas fa-info-circle"></i> Este equipo ya ha sido vendido
              </strong>
              <p style="color: #b91c1c; font-size: 0.9rem; margin-top: 4px; margin-bottom: 0;">
                Consultanos si buscás una máquina similar, tenemos más opciones disponibles para ofrecerte.
              </p>
            </div>
          ` : ''}

          <h2 style="margin-bottom: 1rem;">Descripción</h2>
          <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">
            ${product.descripcionLarga}
          </p>
          
          <h2 style="margin-bottom: 1rem;">Especificaciones Técnicas</h2>
          <table class="specs-table">
            <tbody>
              ${specsRows}
            </tbody>
          </table>
          
          <div style="margin-top: 3rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            ${!isSold ? `
              <a href="https://wa.me/5493404638524?text=${whatsappMsg}" target="_blank" class="btn btn-primary" style="background-color: #25D366; color:white;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                Consultar por WhatsApp
              </a>
            ` : `
              <a href="catalogo.html" class="btn btn-primary">
                <i class="fas fa-th-large"></i> Ver Otros Equipos Disponibles
              </a>
            `}
            <a href="catalogo.html" class="btn btn-outline">Volver</a>
          </div>
        </div>
      </div>
    </div>

    ${product.modelo3d ? `
      <div class="container" style="margin-top: 1rem; margin-bottom: 3rem;">
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.6rem; color: var(--brand-blue-dark); display: flex; align-items: center; justify-content: center; gap: 8px;">
            <i class="fas fa-cube" style="color: var(--brand-blue);"></i> Modelo <span class="text-gradient">3D Interactivo</span>
          </h2>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Explorá e interactuá con el equipo en 360&deg;</p>
        </div>
        <div class="model-container" style="height: 480px; border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--border-color, #cbd5e1);">
          <model-viewer 
              src="${product.modelo3d}" 
              alt="Modelo 3D de ${product.nombre}"
              auto-rotate 
              camera-controls 
              shadow-intensity="1" 
              exposure="1"
              ar>
          </model-viewer>
        </div>
      </div>
    ` : ''}
  `;

  // Set up click listeners for thumbnails
  const thumbnails = container.querySelectorAll('.gallery-thumbnail');
  const mainImg = container.querySelector('#main-product-img');
  
  if (mainImg && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        if (thumb.classList.contains('active')) return;
        
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        const newSrc = thumb.querySelector('img').src;
        mainImg.style.opacity = '0';
        
        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 150);
      });
    });
  }
}

// --- COUNTER ANIMATION (Stats Bar) ---
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number, .badge-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// --- TIMELINE SCROLL REVEAL ---
function initTimelineReveal() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 120 * entry.target.dataset.index);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach((item, i) => {
    item.dataset.index = i;
    observer.observe(item);
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initGradientBackground();
  initFeatured();
  initCatalog();
  initProductDetails();
  initCounters();
  initTimelineReveal();
});
