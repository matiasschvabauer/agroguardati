/**
 * AGROGUARDATI - Controlador de Galería Desktop (galeria.js)
 */

async function processHeicImage(file) {
  if (typeof window.convertHeicIfNeeded === 'function') {
    return await window.convertHeicIfNeeded(file);
  }
  return file;
}

document.addEventListener('DOMContentLoaded', () => {
  let activeSeccion = 'todas';
  let activeTipo = 'todos';

  const chipsContainer = document.getElementById('galeria-chips-container');
  const gridContainer = document.getElementById('galeria-items-grid');
  const emptyStateEl = document.getElementById('galeria-empty-state');
  const formatButtons = document.querySelectorAll('.btn-format-filter');

  // Lightbox elements
  const lightboxModal = document.getElementById('galeria-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxSection = document.getElementById('lightbox-section');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');

  // Video modal elements
  const videoModal = document.getElementById('galeria-video-modal');
  const videoPlayerContainer = document.getElementById('video-player-container');
  const videoTitle = document.getElementById('video-modal-title');
  const videoDesc = document.getElementById('video-modal-desc');
  const videoDate = document.getElementById('video-modal-date');
  const videoSection = document.getElementById('video-modal-section');
  const btnCloseVideo = document.getElementById('btn-close-video');

  // Admin floating actions
  const adminFloatingBar = document.getElementById('galeria-admin-actions');
  const btnAdminAddItem = document.getElementById('btn-admin-add-galeria');
  const btnAdminAddSec = document.getElementById('btn-admin-add-seccion');

  // Admin Modals
  const modalItem = document.getElementById('modal-admin-galeria-item');
  const modalSec = document.getElementById('modal-admin-galeria-seccion');
  const formItem = document.getElementById('form-galeria-item');
  const formSec = document.getElementById('form-galeria-seccion');
  const itemTypeSelect = document.getElementById('gal-item-tipo');
  const uploadPhotoGroup = document.getElementById('group-upload-foto');
  const uploadVideoGroup = document.getElementById('group-upload-video');
  const youtubeGroup = document.getElementById('group-youtube-url');
  const itemSeccionSelect = document.getElementById('gal-item-seccion');

  function isAdmin() {
    return (window.isAgroAdmin && window.isAgroAdmin()) || localStorage.getItem('agro_admin_session') === 'true';
  }

  // --- RENDERIZAR CHIPS DE SECCIONES ---
  function renderSeccionChips() {
    if (!chipsContainer) return;
    const secciones = window.AgroGaleriaStore ? window.AgroGaleriaStore.getSecciones() : [];
    const allItems = window.AgroGaleriaStore ? window.AgroGaleriaStore.getItems() : [];

    let html = `
      <div class="galeria-chip ${activeSeccion === 'todas' ? 'active' : ''}" data-seccion="todas">
        <i class="fas fa-th-large"></i>
        <span>Todas las Secciones (${allItems.length})</span>
      </div>
    `;

    secciones.forEach(sec => {
      const count = allItems.filter(i => i.seccionId === sec.id).length;
      const isActive = activeSeccion === sec.id ? 'active' : '';
      const icon = sec.icono || 'fa-folder';
      html += `
        <div class="galeria-chip ${isActive}" data-seccion="${sec.id}" title="${sec.descripcion || sec.nombre}">
          <i class="fas ${icon}"></i>
          <span>${sec.nombre} (${count})</span>
        </div>
      `;
    });

    if (isAdmin()) {
      html += `
        <button id="btn-quick-new-sec" class="galeria-chip" style="border: 1.5px dashed var(--brand-blue); background: #eff6ff; color: var(--brand-blue); cursor: pointer;" title="Crear nueva micro-sección">
          <i class="fas fa-plus"></i>
          <span>Nueva Sección</span>
        </button>
      `;
    }

    chipsContainer.innerHTML = html;

    // Attach click events
    chipsContainer.querySelectorAll('.galeria-chip[data-seccion]').forEach(chip => {
      chip.addEventListener('click', () => {
        activeSeccion = chip.getAttribute('data-seccion');
        renderSeccionChips();
        renderGalleryItems();
      });
    });

    const btnNewSec = document.getElementById('btn-quick-new-sec');
    if (btnNewSec) {
      btnNewSec.addEventListener('click', openSeccionModal);
    }

    // Populate select in modal
    if (itemSeccionSelect) {
      itemSeccionSelect.innerHTML = secciones.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
    }
  }

  // --- RENDERIZAR GRILLA DE ITEMS ---
  function renderGalleryItems() {
    if (!gridContainer) return;
    const items = window.AgroGaleriaStore ? window.AgroGaleriaStore.getItems(activeSeccion, activeTipo) : [];
    const secciones = window.AgroGaleriaStore ? window.AgroGaleriaStore.getSecciones() : [];
    const secMap = {};
    secciones.forEach(s => secMap[s.id] = s.nombre);

    if (adminFloatingBar) {
      adminFloatingBar.style.display = isAdmin() ? 'flex' : 'none';
    }

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
      if (isPhoto) typeBadge = '<span class="galeria-badge-type galeria-badge-foto"><i class="fas fa-camera"></i> Foto</span>';
      if (isVideo) typeBadge = '<span class="galeria-badge-type galeria-badge-video"><i class="fas fa-video"></i> Video</span>';
      if (isYoutube) typeBadge = '<span class="galeria-badge-type galeria-badge-youtube"><i class="fab fa-youtube"></i> YouTube</span>';

      let playOverlay = '';
      if (isVideo || isYoutube) {
        playOverlay = `
          <div class="galeria-play-overlay">
            <div class="galeria-play-icon">
              <i class="fas fa-play" style="margin-left: 3px;"></i>
            </div>
          </div>
        `;
      }

      let adminActions = '';
      if (isAdmin()) {
        adminActions = `
          <div class="galeria-card-admin-bar">
            <button class="btn-icon btn-edit-gal-item" data-id="${item.id}" title="Editar" style="background:#eff6ff; color:#1d5497; width:32px; height:32px; border-radius:8px; border:none; cursor:pointer;"><i class="fas fa-edit"></i></button>
            <button class="btn-icon btn-delete-gal-item" data-id="${item.id}" title="Eliminar" style="background:#fef2f2; color:#dc2626; width:32px; height:32px; border-radius:8px; border:none; cursor:pointer;"><i class="fas fa-trash-alt"></i></button>
          </div>
        `;
      }

      return `
        <div class="galeria-card" data-id="${item.id}">
          <div class="galeria-media-wrapper" data-action="open-media" data-id="${item.id}">
            <img src="${thumbUrl}" alt="${item.titulo || 'Galería'}" class="galeria-media-thumb" loading="lazy">
            ${playOverlay}
            ${typeBadge}
            ${item.fecha ? `<span class="galeria-badge-date">${item.fecha}</span>` : ''}
          </div>
          <div class="galeria-content">
            <span class="galeria-section-pill"><i class="fas fa-folder-open"></i> ${secName}</span>
            <h3 class="galeria-title">${item.titulo || 'Sin título'}</h3>
            ${item.descripcion ? `<p class="galeria-desc">${item.descripcion}</p>` : ''}
            ${adminActions}
          </div>
        </div>
      `;
    }).join('');

    // Attach click event for media viewer
    gridContainer.querySelectorAll('[data-action="open-media"]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        openMediaViewer(id);
      });
    });

    // Attach admin actions
    gridContainer.querySelectorAll('.btn-edit-gal-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        editItem(btn.getAttribute('data-id'));
      });
    });

    gridContainer.querySelectorAll('.btn-delete-gal-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteItem(btn.getAttribute('data-id'));
      });
    });
  }

  // --- VISOR LIGHTBOX / VIDEO ---
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
        <video controls autoplay style="width:100%; height:100%; object-fit:contain; background:#000;">
          <source src="${item.url}" type="video/mp4">
          Tu navegador no soporta reproducción de video.
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

  // --- FILTROS DE FORMATO (FOTO / VIDEO / YOUTUBE) ---
  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTipo = btn.getAttribute('data-tipo');
      renderGalleryItems();
    });
  });

  // --- GESTIÓN ADMIN (MODALES) ---
  function openItemModal(item = null) {
    if (!modalItem) return;
    formItem.reset();
    document.getElementById('gal-item-id').value = item ? item.id : '';
    document.getElementById('modal-item-title').textContent = item ? 'Editar Contenido de Galería' : 'Agregar Foto o Video a Galería';

    if (item) {
      document.getElementById('gal-item-titulo').value = item.titulo || '';
      document.getElementById('gal-item-desc').value = item.descripcion || '';
      document.getElementById('gal-item-fecha').value = item.fecha || '';
      document.getElementById('gal-item-seccion').value = item.seccionId || 'historia';
      document.getElementById('gal-item-tipo').value = item.tipo || 'foto';
      if (item.tipo === 'youtube') {
        document.getElementById('gal-youtube-url').value = item.url || '';
      }
    }

    updateTypeInputs();
    modalItem.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function updateTypeInputs() {
    const val = itemTypeSelect.value;
    if (uploadPhotoGroup) uploadPhotoGroup.style.display = val === 'foto' ? 'block' : 'none';
    if (uploadVideoGroup) uploadVideoGroup.style.display = val === 'video' ? 'block' : 'none';
    if (youtubeGroup) youtubeGroup.style.display = val === 'youtube' ? 'block' : 'none';
  }

  if (itemTypeSelect) {
    itemTypeSelect.addEventListener('change', updateTypeInputs);
  }

  function openSeccionModal() {
    if (!modalSec) return;
    formSec.reset();
    modalSec.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeAdminModals() {
    if (modalItem) modalItem.style.display = 'none';
    if (modalSec) modalSec.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-close-admin-modal').forEach(btn => {
    btn.addEventListener('click', closeAdminModals);
  });

  if (btnAdminAddItem) btnAdminAddItem.addEventListener('click', () => openItemModal());
  if (btnAdminAddSec) btnAdminAddSec.addEventListener('click', openSeccionModal);

  // Form Submit Item
  if (formItem) {
    formItem.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('gal-item-id').value;
      const titulo = document.getElementById('gal-item-titulo').value.trim();
      const descripcion = document.getElementById('gal-item-desc').value.trim();
      const fecha = document.getElementById('gal-item-fecha').value.trim();
      const seccionId = document.getElementById('gal-item-seccion').value;
      const tipo = document.getElementById('gal-item-tipo').value;

      let url = '';
      let miniatura = '';
      let youtubeId = '';

      const cloudName = window.AGRO_CONFIG?.cloudinary?.cloudName || 'pfskomq5';
      const uploadPreset = window.AGRO_CONFIG?.cloudinary?.uploadPreset || 'nwrslkmw';

      try {
        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Contenido', 'Procesando archivo y datos...', 15);
        }

        if (tipo === 'youtube') {
          const ytInput = document.getElementById('gal-youtube-url').value.trim();
          youtubeId = window.AgroGaleriaStore.extractYouTubeId(ytInput);
          if (!youtubeId) {
            alert('Por favor ingresá un enlace válido de YouTube.');
            return;
          }
          url = `https://www.youtube.com/watch?v=${youtubeId}`;
          miniatura = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
        } else if (tipo === 'foto') {
          const fileInput = document.getElementById('gal-foto-file');
          if (fileInput.files && fileInput.files[0]) {
            let file = fileInput.files[0];
            file = await processHeicImage(file);

            if (window.showAgroUploadProgress) {
              window.showAgroUploadProgress('Subiendo Foto a la Nube', 'Conectando con Cloudinary...', 30);
            }

            const data = await window.uploadToCloudinaryWithProgress(file, 'image', (pct) => {
              if (window.showAgroUploadProgress) {
                const overallPct = Math.round(30 + (pct * 0.55));
                window.showAgroUploadProgress('Subiendo Foto a la Nube', `Subiendo imagen: ${pct}%...`, overallPct);
              }
            });

            if (data.secure_url) {
              url = data.secure_url;
              miniatura = data.secure_url;
            } else {
              throw new Error(data.error?.message || 'Error al subir foto a Cloudinary');
            }
          } else if (id) {
            const existing = window.AgroGaleriaStore.getItems().find(i => i.id === id);
            if (existing) {
              url = existing.url;
              miniatura = existing.miniatura || existing.url;
            }
          }
        } else if (tipo === 'video') {
          const fileInput = document.getElementById('gal-video-file');
          if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (window.showAgroUploadProgress) {
              window.showAgroUploadProgress('Subiendo Video a la Nube', 'Conectando con Cloudinary...', 25);
            }

            const data = await window.uploadToCloudinaryWithProgress(file, 'video', (pct) => {
              if (window.showAgroUploadProgress) {
                const overallPct = Math.round(25 + (pct * 0.60));
                window.showAgroUploadProgress('Subiendo Video a la Nube', `Subiendo video: ${pct}%...`, overallPct);
              }
            });

            if (data.secure_url) {
              url = data.secure_url;
              miniatura = data.secure_url.replace(/\.[^/.]+$/, ".jpg");
            } else {
              throw new Error(data.error?.message || 'Error al subir video a Cloudinary');
            }
          } else if (id) {
            const existing = window.AgroGaleriaStore.getItems().find(i => i.id === id);
            if (existing) {
              url = existing.url;
              miniatura = existing.miniatura || existing.url;
            }
          }
        }

        if (!url && !youtubeId) {
          alert('Por favor selecciona una foto, video o enlace de YouTube.');
          return;
        }

        const itemData = {
          id: id || undefined,
          titulo,
          descripcion,
          fecha,
          seccionId,
          tipo,
          url,
          youtubeId: youtubeId || undefined,
          miniatura: miniatura || url
        };

        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Contenido', 'Guardando en la galería...', 92);
        }

        await window.AgroGaleriaStore.saveItem(itemData);

        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Contenido', '¡Contenido guardado exitosamente!', 100);
        }

        closeAdminModals();
        renderSeccionChips();
        renderGalleryItems();
      } catch (err) {
        alert('Error al guardar contenido: ' + err.message);
      } finally {
        if (window.hideAgroUploadProgress) setTimeout(window.hideAgroUploadProgress, 600);
      }
    });
  }

  // Form Submit Sección
  if (formSec) {
    formSec.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('gal-sec-nombre').value.trim();
      const descripcion = document.getElementById('gal-sec-desc').value.trim();
      const icono = document.getElementById('gal-sec-icono').value || 'fa-folder';

      if (!nombre) return;

      const seccionData = {
        id: 'sec_' + nombre.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        nombre,
        descripcion,
        icono
      };

      window.AgroGaleriaStore.saveSeccion(seccionData);
      closeAdminModals();
      renderSeccionChips();
      renderGalleryItems();
    });
  }

  function editItem(id) {
    const items = window.AgroGaleriaStore.getItems();
    const item = items.find(i => i.id === id);
    if (item) openItemModal(item);
  }

  function deleteItem(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este contenido de la galería?')) {
      window.AgroGaleriaStore.deleteItem(id);
      renderSeccionChips();
      renderGalleryItems();
    }
  }

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Hook global for external changes (like Firestore sync)
  window.onGaleriaDataChanged = () => {
    renderSeccionChips();
    renderGalleryItems();
  };

  // Initial load
  renderSeccionChips();
  renderGalleryItems();
});
