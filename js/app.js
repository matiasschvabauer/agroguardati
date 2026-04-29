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

  if (!catalogContainer) return; // Not on the catalog page

  function renderCatalog(items) {
    catalogContainer.innerHTML = '';
    
    if(items.length === 0) {
      catalogContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">No se encontraron productos con estos filtros.</p>';
      return;
    }

    items.forEach(item => {
      // The CSS handles the alternating layout automatically using :nth-child(even)
      const html = `
        <article class="catalog-item">
          <div class="catalog-item-img-wrapper">
            <img src="${item.imagen}" alt="${item.nombre}" class="catalog-item-img">
          </div>
          <div class="catalog-item-content">
            <span class="product-category">${item.categoria} &bull; ${item.marca} &bull; ${item.estado}</span>
            <h3 class="product-title">${item.nombre}</h3>
            <p class="product-desc">${item.descripcionCorta}</p>
            <a href="producto-detalle.html?id=${item.id}" class="btn btn-outline">Ver detalles</a>
          </div>
        </article>
      `;
      catalogContainer.innerHTML += html;
    });
  }

  function applyFilters() {
    const valCat = filterCat.value;
    const valMarca = filterMarca.value;
    const valEstado = filterEstado.value;

    const filtered = catalogo.filter(item => {
      return (valCat === 'todas' || item.categoria === valCat) &&
             (valMarca === 'todas' || item.marca === valMarca) &&
             (valEstado === 'todos' || item.estado === valEstado);
    });

    renderCatalog(filtered);
  }

  // Event Listeners
  if(filterCat) filterCat.addEventListener('change', applyFilters);
  if(filterMarca) filterMarca.addEventListener('change', applyFilters);
  if(filterEstado) filterEstado.addEventListener('change', applyFilters);

  // Initial render
  if (typeof catalogo !== 'undefined') {
    renderCatalog(catalogo);
  }
}

// --- FEATURED PRODUCTS (Home Page) ---
function initFeatured() {
  const featuredContainer = document.getElementById('featured-grid');
  if(!featuredContainer || typeof catalogo === 'undefined') return;

  // Show first 3 products
  const featured = catalogo.slice(0, 3);
  
  featured.forEach(item => {
    const html = `
      <a href="producto-detalle.html?id=${item.id}" class="product-card">
        <div class="product-card-img-wrapper">
          <span class="product-badge">${item.estado}</span>
          <img src="${item.imagen}" alt="${item.nombre}" class="product-card-img">
        </div>
        <div class="product-card-content">
          <span class="product-category">${item.categoria}</span>
          <h3 class="product-title">${item.nombre}</h3>
          <p class="product-desc">${item.descripcionCorta}</p>
          <div style="color: var(--brand-blue); font-weight: 600; display:flex; align-items:center; gap: 0.5rem; margin-top: auto;">
            Ver Detalles &rarr;
          </div>
        </div>
      </a>
    `;
    featuredContainer.innerHTML += html;
  });
}

// --- PRODUCT DETAILS ---
function initProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  const container = document.getElementById('product-detail-container');
  if(!container || isNaN(productId) || typeof catalogo === 'undefined') return;

  const product = catalogo.find(p => p.id === productId);
  
  if(!product) {
    container.innerHTML = '<div class="container section"><h2>Producto no encontrado.</h2><a href="catalogo.html" class="btn btn-primary">Volver al catálogo</a></div>';
    return;
  }

  // Update page title
  document.title = product.nombre + " - Agroguardati";

  let specsRows = '';
  for (const [key, value] of Object.entries(product.especificaciones)) {
    specsRows += `<tr><th>${key}</th><td>${value}</td></tr>`;
  }

  container.innerHTML = `
    <div class="detail-hero">
      <div class="container">
        <span class="product-category" style="margin-bottom:1rem; display:block;">
          <a href="catalogo.html">Catálogo</a> / ${product.categoria} / ${product.marca}
        </span>
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${product.nombre}</h1>
        <span class="product-badge" style="position:static; display:inline-block; margin-bottom: 1rem;">${product.estado}</span>
      </div>
    </div>
    <div class="container section">
      <div class="detail-grid">
        <div class="detail-image-gallery">
          <img src="${product.imagen}" alt="${product.nombre}">
        </div>
        <div class="detail-info">
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
          
          <div style="margin-top: 3rem; display: flex; gap: 1rem;">
            <a href="https://wa.me/5493404638524?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.nombre)}" target="_blank" class="btn btn-primary" style="background-color: #25D366; color:white;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Consultar por WhatsApp
            </a>
            <a href="catalogo.html" class="btn btn-outline">Volver</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initGradientBackground();
  initFeatured();
  initCatalog();
  initProductDetails();
});
