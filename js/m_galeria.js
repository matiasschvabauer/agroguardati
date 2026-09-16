/**
 * AGROGUARDATI - Controlador de Galería Móvil (m_galeria.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  let activeSeccion = 'todas';
  let activeTipo = 'todos';

  const chipsContainer = document.getElementById('galeria-chips-container-m');
  const gridContainer = document.getElementById('galeria-items-grid-m');
  const emptyStateEl = document.getElementById('galeria-empty-state-m');
  const formatButtons = document.querySelectorAll('.btn-format-filter-m');

  // Modals
  const lightboxModal = document.getElementById('galeria-lightbox-modal-m');
  const lightboxImg = document.getElementById('lightbox-img-m');
  const lightboxTitle = document.getElementById('lightbox-title-m');
  const lightboxDesc = document.getElementById('lightbox-desc-m');
  const lightboxDate = document.getElementById('lightbox-date-m');
  const lightboxSection = document.getElementById('lightbox-section-m');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox-m');

  const videoModal = document.getElementById('galeria-video-modal-m');
  const videoPlayerContainer = document.getElementById('video-player-container-m');
  const videoTitle = document.getElementById('video-modal-title-m');
  const videoDesc = document.getElementById('video-modal-desc-m');
  const videoDate = document.getElementById('video-modal-date-m');
  const videoSection = document.getElementById('video-modal-section-m');
  const btnCloseVideo = document.getElementById('btn-close-video-m');

  function isAdmin() {
    return (window.isAgroAdmin && window.isAgroAdmin()) || localStorage.getItem('agro_admin_session') === 'true';
  }

  // --- RENDER CHIPS MOBILE ---
  function renderSeccionChips() {
    if (!chipsContainer) return;
    const secciones = window.AgroGaleriaStore ? window.AgroGaleriaStore.getSecciones() : [];
    const allItems = window.AgroGaleriaStore ? window.AgroGaleriaStore.getItems() : [];

    let html = `
      <div class="galeria-chip-m ${activeSeccion === 'todas' ? 'active' : ''}" data-seccion="todas">
        <i class="fas fa-th-large"></i>
        <span>Todas (${allItems.length})</span>
      </div>
    `;

    secciones.forEach(sec => {
      const count = allItems.filter(i => i.seccionId === sec.id).length;
      const isActive = activeSeccion === sec.id ? 'active' : '';
      const icon = sec.icono || 'fa-folder';
      html += `
        <div class="galeria-chip-m ${isActive}" data-seccion="${sec.id}">
          <i class="fas ${icon}"></i>
          <span>${sec.nombre} (${count})</span>
        </div>
      `;
    });

    chipsContainer.innerHTML = html;

    chipsContainer.querySelectorAll('.galeria-chip-m').forEach(chip => {
      chip.addEventListener('click', () => {
        activeSeccion = chip.getAttribute('data-seccion');
        renderSeccionChips();
        renderGalleryItems();
      });
    });
  }

  // --- RENDER ITEMS MOBILE ---
  function renderGalleryItems() {
    if (!gridContainer) return;
    const items = window.AgroGaleriaStore ? window.AgroGaleriaStore.getItems(activeSeccion, activeTipo) : [];
    const secciones = window.AgroGaleriaStore ? window.AgroGaleriaStore.getSecciones() : [];
    const secMap = {};
    secciones.forEach(s => secMap[s.id] = s.nombre);

    if (items.length === 0) {
      gridContainer.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';

    gridContainer.innerHTML = items.map(item => {
      const secName = secMap[item.seccionId] || 'Galería';
      const isPhoto = item.tipo === 'foto';
      const isVideo = item.tipo === 'video';
      const isYoutube = item.tipo === 'youtube';

      let thumbUrl = item.url;
      if (isYoutube) {
        const yId = item.youtubeId || window.AgroGaleriaStore.extractYouTubeId(item.url);
        thumbUrl = item.thumbnail || window.AgroGaleriaStore.getYouTubeThumbnail(yId) || 'https://res.cloudinary.com/pfskomq5/image/upload/v1786455504/ndmgt78pqca9fihxfu1e.jpg';
      }

      let typeBadge = '';
      if (isPhoto) typeBadge = '<span class="galeria-badge-type galeria-badge-foto" style="font-size:0.68rem; padding:3px 8px;"><i class="fas fa-camera"></i> Foto</span>';
      if (isVideo) typeBadge = '<span class="galeria-badge-type galeria-badge-video" style="font-size:0.68rem; padding:3px 8px;"><i class="fas fa-video"></i> Video</span>';
      if (isYoutube) typeBadge = '<span class="galeria-badge-type galeria-badge-youtube" style="font-size:0.68rem; padding:3px 8px;"><i class="fab fa-youtube"></i> YouTube</span>';

      let playOverlay = '';
      if (isVideo || isYoutube) {
        playOverlay = `
          <div class="galeria-play-overlay">
            <div class="galeria-play-icon" style="width:46px; height:46px; font-size:1.2rem;">
              <i class="fas fa-play" style="margin-left: 2px;"></i>
            </div>
          </div>
        `;
      }

      let adminActions = '';
      if (isAdmin()) {
        adminActions = `
          <div class="galeria-card-admin-bar">
            <button class="btn-icon btn-delete-gal-item-m" data-id="${item.id}" title="Eliminar" style="background:#fef2f2; color:#dc2626; width:34px; height:34px; border-radius:8px; border:none; cursor:pointer;"><i class="fas fa-trash-alt"></i></button>
          </div>
        `;
      }

      return `
        <div class="galeria-card-m" data-id="${item.id}">
          <div class="galeria-media-wrapper-m" data-action="open-media" data-id="${item.id}">
            <img src="${thumbUrl}" alt="${item.titulo || 'Galería'}" class="galeria-media-thumb-m" loading="lazy">
            ${playOverlay}
            ${typeBadge}
            ${item.fecha ? `<span class="galeria-badge-date" style="font-size:0.7rem; padding:3px 8px;">${item.fecha}</span>` : ''}
          </div>
          <div class="galeria-content-m">
            <span class="galeria-section-pill-m"><i class="fas fa-folder-open"></i> ${secName}</span>
            <h3 class="galeria-title-m">${item.titulo || 'Sin título'}</h3>
            ${item.descripcion ? `<p class="galeria-desc-m">${item.descripcion}</p>` : ''}
            ${adminActions}
          </div>
        </div>
      `;
    }).join('');

    gridContainer.querySelectorAll('[data-action="open-media"]').forEach(el => {
      el.addEventListener('click', () => {
        openMediaViewer(el.getAttribute('data-id'));
      });
    });

    gridContainer.querySelectorAll('.btn-delete-gal-item-m').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('¿Eliminar esta publicación de la galería?')) {
          window.AgroGaleriaStore.deleteItem(btn.getAttribute('data-id'));
          renderSeccionChips();
          renderGalleryItems();
        }
      });
    });
  }

  // --- VISOR LIGHTBOX MOBILE ---
  function openMediaViewer(itemId) {
    const items = window.AgroGaleriaStore ? window.AgroGaleriaStore.getItems() : [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const secciones = window.AgroGaleriaStore.getSecciones();
    const sec = secciones.find(s => s.id === item.seccionId);
    const secName = sec ? sec.nombre : 'Galería';

    if (item.tipo === 'foto') {
      lightboxImg.src = item.url;
      lightboxTitle.textContent = item.titulo || 'Agroguardati';
      lightboxDesc.textContent = item.descripcion || '';
      lightboxDate.textContent = item.fecha || '';
      lightboxSection.innerHTML = `<i class="fas fa-folder"></i> ${secName}`;
      lightboxModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } else if (item.tipo === 'video') {
      videoPlayerContainer.innerHTML = `
        <video controls autoplay playsinline style="width:100%; height:100%; object-fit:contain; background:#000;">
          <source src="${item.url}" type="video/mp4">
        </video>
      `;
      videoTitle.textContent = item.titulo || 'Video';
      videoDesc.textContent = item.descripcion || '';
      videoDate.textContent = item.fecha || '';
      videoSection.innerHTML = `<i class="fas fa-folder"></i> ${secName}`;
      videoModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } else if (item.tipo === 'youtube') {
      const yId = item.youtubeId || window.AgroGaleriaStore.extractYouTubeId(item.url);
      videoPlayerContainer.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${yId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;
      videoTitle.textContent = item.titulo || 'Video YouTube';
      videoDesc.textContent = item.descripcion || '';
      videoDate.textContent = item.fecha || '';
      videoSection.innerHTML = `<i class="fas fa-folder"></i> ${secName}`;
      videoModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllViewers() {
    if (lightboxModal) lightboxModal.style.display = 'none';
    if (videoModal) {
      videoModal.style.display = 'none';
      if (videoPlayerContainer) videoPlayerContainer.innerHTML = '';
    }
    document.body.style.overflow = '';
  }

  if (btnCloseLightbox) btnCloseLightbox.addEventListener('click', closeAllViewers);
  if (btnCloseVideo) btnCloseVideo.addEventListener('click', closeAllViewers);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeAllViewers();
    });
  }
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeAllViewers();
    });
  }

  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTipo = btn.getAttribute('data-tipo');
      renderGalleryItems();
    });
  });

  // Mobile Menu Drawer Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('#nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        const isDropdownToggle = link.parentElement.classList.contains('nav-mobile-dropdown') && link.getAttribute('href') === 'm_catalogo.html';
        if (!isDropdownToggle) {
          navLinks.classList.remove('active');
        }
      });
    });
  }

  window.onGaleriaDataChanged = () => {
    renderSeccionChips();
    renderGalleryItems();
  };

  renderSeccionChips();
  renderGalleryItems();
});
