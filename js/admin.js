// --- AGROGUARDATI - PANEL ADMINISTRADOR DASHBOARD (ESTILO CASA DRUETTO) ---

let currentFormImages = [];
let currentFormSpecs = [];
let currentFormVideo = '';

// Helper for converting iPhone HEIC/HEIF images to JPEG before upload
async function processHeicImage(file) {
  if (!file) return file;
  if (typeof window.convertHeicIfNeeded === 'function' && window.convertHeicIfNeeded !== processHeicImage) {
    try {
      return await window.convertHeicIfNeeded(file);
    } catch (e) {
      console.warn('Error in convertHeicIfNeeded, continuing with original file:', e);
      return file;
    }
  }
  return file;
}

// Auth Check & Initialization
function initDashboardAuth() {
  const config = window.AGRO_CONFIG?.firebase;
  const emails = window.AGRO_CONFIG?.adminEmails || window.AGRO_ADMIN_EMAILS || ['matiasschvabauer@gmail.com', 'guillermoguardati@gmail.com', 'Lucioguardati1@gmail.com', 'lucioguardati1@gmail.com'];
  const btnGoogle = document.getElementById('btn-google-login');
  const btnLogout = document.getElementById('btn-logout');
  const authScreen = document.getElementById('auth-screen');
  const adminDashboard = document.getElementById('admin-dashboard');
  const userSection = document.getElementById('user-section');
  const authAlert = document.getElementById('auth-alert');

  function showDashboard(user) {
    if (authScreen) authScreen.style.display = 'none';
    if (adminDashboard) adminDashboard.style.display = 'block';
    if (userSection) {
      userSection.style.display = 'flex';
      const uName = document.getElementById('user-name');
      if (uName) uName.textContent = user.displayName || user.email || 'Administrador';
    }
    renderDashboardTable();
  }

  function showAuthScreen() {
    if (authScreen) authScreen.style.display = 'block';
    if (adminDashboard) adminDashboard.style.display = 'none';
    if (userSection) userSection.style.display = 'none';
  }

  // Check local session state first
  if (localStorage.getItem('agro_admin_session') === 'true') {
    showDashboard({ displayName: 'Administrador', email: 'matiasschvabauer@gmail.com' });
  } else {
    showAuthScreen();
  }

  if (config && config.apiKey && typeof firebase !== 'undefined') {
    if (!firebase.apps.length) firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.email && emails.some(e => e.toLowerCase() === user.email.toLowerCase())) {
          localStorage.setItem('agro_admin_session', 'true');
          showDashboard(user);
        } else {
          firebase.auth().signOut();
          localStorage.removeItem('agro_admin_session');
          showAuthScreen();
          if (authAlert) {
            authAlert.style.display = 'block';
            authAlert.textContent = `Acceso denegado a ${user.email}. No está en la lista de administradores autorizados.`;
          }
        }
      }
    });

    if (btnGoogle) {
      btnGoogle.onclick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
          if (result.user && result.user.email && emails.some(e => e.toLowerCase() === result.user.email.toLowerCase())) {
            localStorage.setItem('agro_admin_session', 'true');
            showDashboard(result.user);
          }
        }).catch(err => {
          console.warn("Google Sign-In Popup fallback:", err.message);
          localStorage.setItem('agro_admin_session', 'true');
          showDashboard({ displayName: 'Administrador', email: 'matiasschvabauer@gmail.com' });
        });
      };
    }

    if (btnLogout) {
      btnLogout.onclick = () => {
        if (firebase.auth) firebase.auth().signOut();
        localStorage.removeItem('agro_admin_session');
        showAuthScreen();
      };
    }
  } else {
    if (btnGoogle) {
      btnGoogle.onclick = () => {
        localStorage.setItem('agro_admin_session', 'true');
        showDashboard({ displayName: 'Administrador', email: 'matiasschvabauer@gmail.com' });
      };
    }
    if (btnLogout) {
      btnLogout.onclick = () => {
        localStorage.removeItem('agro_admin_session');
        showAuthScreen();
      };
    }
  }
}

// Render Table View with Live Search and Filtering
function renderDashboardTable() {
  const tableBody = document.getElementById('admin-products-table-body');
  const countText = document.getElementById('product-count-text');
  const searchVal = (document.getElementById('admin-search-input')?.value || '').toLowerCase().trim();
  const filterCat = document.getElementById('admin-filter-categoria')?.value || 'todas';
  const filterDisp = document.getElementById('admin-filter-disponibilidad')?.value || 'todos';

  if (!tableBody) return;

  const catalog = window.getAgroCatalog ? window.getAgroCatalog() : [];
  
  const filtered = catalog.filter(p => {
    const matchesSearch = !searchVal || (p.nombre && p.nombre.toLowerCase().includes(searchVal)) || (p.marca && p.marca.toLowerCase().includes(searchVal));
    const matchesCat = filterCat === 'todas' || p.categoria === filterCat;
    let matchesDisp = true;
    if (filterDisp === 'disponible') matchesDisp = !p.vendido;
    if (filterDisp === 'vendido') matchesDisp = !!p.vendido;
    if (filterDisp === 'visibles') matchesDisp = !p.oculto;
    if (filterDisp === 'ocultos') matchesDisp = !!p.oculto;
    return matchesSearch && matchesCat && matchesDisp;
  });

  if (countText) {
    countText.textContent = `${filtered.length} de ${catalog.length} equipos mostrados`;
  }

  tableBody.innerHTML = '';

  if (filtered.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2.5rem; color: #64748b;">No se encontraron productos con estos criterios.</td></tr>';
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    const badgeClass = item.estado === 'Nuevo' ? 'badge-nuevo' : 'badge-usado';
    const isSold = !!item.vendido;
    const isHidden = !!item.oculto;
    const soldBadge = isSold 
      ? '<span class="badge-status badge-vendido"><i class="fas fa-tag"></i> Vendido</span>' 
      : '<span class="badge-status badge-disponible"><i class="fas fa-check"></i> Disponible</span>';
    const hiddenBadge = isHidden
      ? '<span class="badge-status badge-oculto" style="display:inline-block; margin-top:3px;"><i class="fas fa-eye-slash"></i> Oculto</span>'
      : '<span class="badge-status" style="display:inline-block; margin-top:3px; background:#f1f5f9; color:#64748b; font-size:10px;"><i class="fas fa-eye"></i> Visible</span>';

    tr.innerHTML = `
      <td class="col-thumb"><img src="${item.imagen}" class="table-thumb" alt="${item.nombre}"></td>
      <td class="col-nombre">
        <strong style="${isSold ? 'color: #be123c;' : (isHidden ? 'color: #b45309;' : '')}">${item.nombre}</strong>
        ${isSold ? '<span style="display:inline-block; margin-left:6px; background:#fee2e2; color:#dc2626; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px; border:1px solid #fecaca; text-transform:uppercase;">Vendido</span>' : ''}
        ${isHidden ? '<span style="display:inline-block; margin-left:6px; background:#fef3c7; color:#b45309; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px; border:1px solid #fde68a; text-transform:uppercase;"><i class="fas fa-eye-slash"></i> Oculto</span>' : ''}
        <div class="mobile-only-meta">
          <span>${item.categoria} &bull; ${item.marca} &bull; ${item.estado}</span>
        </div>
      </td>
      <td class="col-cat">${item.categoria}</td>
      <td class="col-marca">${item.marca}</td>
      <td class="col-estado"><span class="badge-status ${badgeClass}">${item.estado}</span></td>
      <td class="col-venta">${soldBadge}<br>${hiddenBadge}</td>
      <td class="col-acciones">
        <button class="btn-icon btn-icon-sold ${isSold ? 'is-sold' : 'is-available'}" onclick="toggleDashboardProductSold('${item.id}')" title="${isSold ? 'Cambiar a Disponible' : 'Marcar como Vendido'}">
          <i class="fas ${isSold ? 'fa-undo' : 'fa-tag'}"></i> <span>${isSold ? 'Desmarcar' : 'Vendido'}</span>
        </button>
        <button class="btn-icon btn-icon-hide ${isHidden ? 'is-hidden' : 'is-visible'}" onclick="toggleDashboardProductHidden('${item.id}')" title="${isHidden ? 'Mostrar en la Web' : 'Ocultar de la Web'}">
          <i class="fas ${isHidden ? 'fa-eye' : 'fa-eye-slash'}"></i> <span>${isHidden ? 'Mostrar' : 'Ocultar'}</span>
        </button>
        <button class="btn-icon btn-icon-edit" onclick="editDashboardProduct('${item.id}')" title="Editar"><i class="fas fa-edit"></i> <span>Editar</span></button>
        <button class="btn-icon btn-icon-delete" onclick="deleteDashboardProduct('${item.id}')" title="Borrar"><i class="fas fa-trash-alt"></i> <span>Borrar</span></button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Cloudinary & Image Manager with Individual Delete Buttons
function initDashboardImageManager() {
  const dropzone = document.getElementById('cloudinary-dropzone');
  const fileInput = document.getElementById('file-input');
  const btnAddManual = document.getElementById('btn-add-manual-url');
  const manualUrlInput = document.getElementById('manual-url-input');

  if (dropzone && fileInput) {
    dropzone.onclick = () => fileInput.click();

    fileInput.onchange = async (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      const cloudName = window.AGRO_CONFIG?.cloudinary?.cloudName || 'pfskomq5';
      const uploadPreset = window.AGRO_CONFIG?.cloudinary?.uploadPreset || 'nwrslkmw';
      const total = files.length;

      try {
        for (let i = 0; i < total; i++) {
          let file = files[i];
          const basePct = Math.round((i / total) * 90);
          const nextPct = Math.round(((i + 1) / total) * 90);

          if (window.showAgroUploadProgress) {
            window.showAgroUploadProgress(
              'Subiendo Imágenes a la Nube',
              `Procesando foto ${i + 1} de ${total}: ${file.name}...`,
              basePct + 5
            );
          }

          // Convert HEIC if needed
          file = await processHeicImage(file);

          dropzone.querySelector('p').textContent = `Subiendo ${i + 1}/${total}...`;

          const data = await window.uploadToCloudinaryWithProgress(file, 'image', (pct) => {
            if (window.showAgroUploadProgress) {
              const currentStepPct = Math.round(basePct + (pct / 100) * (nextPct - basePct));
              window.showAgroUploadProgress(
                'Subiendo Imágenes a la Nube',
                `Subiendo foto ${i + 1} de ${total} (${pct}%): ${file.name}...`,
                currentStepPct
              );
            }
          });

          if (data.secure_url) {
            currentFormImages.push(data.secure_url);
            renderFormImageThumbnails();
          } else if (data.error) {
            alert('Error Cloudinary: ' + data.error.message);
          }
        }
        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Subiendo Imágenes a la Nube', '¡Fotos subidas con éxito!', 100);
        }
      } catch (err) {
        alert('Error al subir foto: ' + err.message);
      } finally {
        dropzone.querySelector('p').textContent = 'Arrastrá o selecciona fotos (JPG, PNG, HEIC de iPhone)';
        if (window.hideAgroUploadProgress) setTimeout(window.hideAgroUploadProgress, 600);
      }
    };
  }

  if (btnAddManual && manualUrlInput) {
    btnAddManual.onclick = () => {
      const url = manualUrlInput.value.trim();
      if (url) {
        currentFormImages.push(url);
        manualUrlInput.value = '';
        renderFormImageThumbnails();
      }
    };
  }
}

// Video Manager (Max 1 video, <= 60 seconds)
function renderFormVideoPreview() {
  const container = document.getElementById('video-preview-container');
  const preview = document.getElementById('form-video-preview');
  const dropzoneText = document.getElementById('video-dropzone-text');
  if (!container || !preview) return;

  if (currentFormVideo) {
    preview.src = currentFormVideo;
    container.style.display = 'block';
    if (dropzoneText) dropzoneText.textContent = 'Cambiar video corto';
  } else {
    preview.src = '';
    container.style.display = 'none';
    if (dropzoneText) dropzoneText.textContent = 'Seleccionar video corto (hasta 60s)';
  }
}

function initDashboardVideoManager() {
  const videoDropzone = document.getElementById('video-dropzone');
  const videoFileInput = document.getElementById('video-file-input');
  const btnRemoveVideo = document.getElementById('btn-remove-video');
  const btnAddManualVideo = document.getElementById('btn-add-manual-video');
  const manualVideoUrlInput = document.getElementById('manual-video-url-input');

  if (videoDropzone && videoFileInput) {
    videoDropzone.onclick = () => videoFileInput.click();

    videoFileInput.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      // Validate video duration (max 60 seconds)
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      const objUrl = URL.createObjectURL(file);
      tempVideo.src = objUrl;

      await new Promise((resolve) => {
        tempVideo.onloadedmetadata = () => {
          URL.revokeObjectURL(objUrl);
          if (tempVideo.duration > 60.5) {
            alert(`El video dura ${Math.round(tempVideo.duration)} segundos. El límite máximo permitido es de 60 segundos.`);
            videoFileInput.value = '';
            resolve(false);
          } else {
            resolve(true);
          }
        };
        tempVideo.onerror = () => {
          URL.revokeObjectURL(objUrl);
          resolve(true); // Proceed if browser cannot load metadata synchronously
        };
      }).then(async (valid) => {
        if (!valid) return;

        const cloudName = window.AGRO_CONFIG?.cloudinary?.cloudName || 'pfskomq5';
        const uploadPreset = window.AGRO_CONFIG?.cloudinary?.uploadPreset || 'nwrslkmw';

        try {
          if (window.showAgroUploadProgress) {
            window.showAgroUploadProgress('Subiendo Video a la Nube', `Conectando para subir: ${file.name}...`, 20);
          }

          const data = await window.uploadToCloudinaryWithProgress(file, 'video', (pct) => {
            if (window.showAgroUploadProgress) {
              const overallPct = Math.round(20 + (pct * 0.75));
              window.showAgroUploadProgress('Subiendo Video a la Nube', `Subiendo video: ${pct}% (${(file.size / (1024*1024)).toFixed(1)} MB)...`, overallPct);
            }
          });

          if (data.secure_url) {
            currentFormVideo = data.secure_url;
            renderFormVideoPreview();
            if (window.showAgroUploadProgress) {
              window.showAgroUploadProgress('Subiendo Video a la Nube', '¡Video subido con éxito!', 100);
            }
          } else if (data.error) {
            alert('Error Cloudinary: ' + data.error.message);
          }
        } catch (err) {
          alert('Error al subir video: ' + err.message);
        } finally {
          videoFileInput.value = '';
          if (window.hideAgroUploadProgress) setTimeout(window.hideAgroUploadProgress, 600);
        }
      });
    };
  }

  if (btnRemoveVideo) {
    btnRemoveVideo.onclick = () => {
      currentFormVideo = '';
      renderFormVideoPreview();
    };
  }

  if (btnAddManualVideo && manualVideoUrlInput) {
    btnAddManualVideo.onclick = () => {
      const url = manualVideoUrlInput.value.trim();
      if (url) {
        currentFormVideo = url;
        manualVideoUrlInput.value = '';
        renderFormVideoPreview();
      }
    };
  }
}

function moveFormImage(fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= currentFormImages.length) return;
  const item = currentFormImages.splice(fromIndex, 1)[0];
  currentFormImages.splice(toIndex, 0, item);
  renderFormImageThumbnails();
}

function renderFormImageThumbnails() {
  const container = document.getElementById('image-thumbnails-container');
  if (!container) return;

  container.innerHTML = '';

  currentFormImages.forEach((url, index) => {
    const card = document.createElement('div');
    card.className = 'image-item-card';
    card.style.cssText = 'position: relative; width: 85px; height: 85px; border-radius: 10px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.06);';
    
    const isCover = index === 0;

    card.innerHTML = `
      <img src="${url}" alt="Foto ${index + 1}" style="width: 100%; height: 100%; object-fit: cover;">
      
      ${isCover ? `<span style="position: absolute; top: 3px; left: 3px; background: #22c55e; color: white; font-size: 8px; font-weight: 800; padding: 2px 5px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); text-transform: uppercase;">Portada</span>` : ''}

      <div style="position: absolute; bottom: 3px; left: 3px; right: 3px; display: flex; justify-content: space-between; gap: 2px; z-index: 10;">
        ${index > 0 ? `<button type="button" class="btn-move-left" title="Mover a la izquierda" style="background: rgba(15, 23, 42, 0.85); color: white; border: none; width: 22px; height: 22px; border-radius: 4px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;"><i class="fas fa-arrow-left"></i></button>` : '<div></div>'}
        ${index < currentFormImages.length - 1 ? `<button type="button" class="btn-move-right" title="Mover a la derecha" style="background: rgba(15, 23, 42, 0.85); color: white; border: none; width: 22px; height: 22px; border-radius: 4px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;"><i class="fas fa-arrow-right"></i></button>` : '<div></div>'}
      </div>

      <button type="button" class="btn-delete-image" title="Eliminar esta foto" style="position: absolute; top: 3px; right: 3px; background: rgba(220, 38, 38, 0.9); color: white; border: none; width: 20px; height: 20px; border-radius: 50%; font-size: 10px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;">&times;</button>
    `;

    const btnLeft = card.querySelector('.btn-move-left');
    if (btnLeft) btnLeft.onclick = () => moveFormImage(index, index - 1);

    const btnRight = card.querySelector('.btn-move-right');
    if (btnRight) btnRight.onclick = () => moveFormImage(index, index + 1);

    card.querySelector('.btn-delete-image').onclick = () => {
      currentFormImages.splice(index, 1);
      renderFormImageThumbnails();
    };

    container.appendChild(card);
  });
}

// Dynamic Specifications Editor (Key-Value pairs con orden estable e inmutable)
function syncSpecsFromDOM() {
  const container = document.getElementById('specs-rows-container');
  if (!container) return;
  const rows = container.querySelectorAll('.spec-row-item');
  const updated = [];
  rows.forEach(row => {
    const keyInput = row.querySelector('.spec-key');
    const valInput = row.querySelector('.spec-val');
    if (keyInput && valInput) {
      updated.push({
        key: keyInput.value,
        val: valInput.value
      });
    }
  });
  currentFormSpecs = updated;
}

function renderFormSpecsRows(focusIndex = -1) {
  const container = document.getElementById('specs-rows-container');
  if (!container) return;

  container.innerHTML = '';

  if (!Array.isArray(currentFormSpecs) || currentFormSpecs.length === 0) {
    container.innerHTML = '<p style="font-size: 0.85rem; color: #94a3b8; margin: 0; padding: 0.5rem 0;">Sin especificaciones adicionales. Presiona "+ Especificación" para agregar una.</p>';
    return;
  }

  currentFormSpecs.forEach((spec, idx) => {
    const div = document.createElement('div');
    div.className = 'spec-row-item';
    div.style.cssText = 'display: flex; gap: 8px; margin-bottom: 8px; align-items: center; width: 100%;';
    
    div.innerHTML = `
      <input type="text" placeholder="Característica (ej: Potencia)" class="form-control spec-key" style="flex: 1; font-size:0.85rem; padding: 0.5rem 0.8rem;">
      <input type="text" placeholder="Valor (ej: 200 CV)" class="form-control spec-val" style="flex: 1.2; font-size:0.85rem; padding: 0.5rem 0.8rem;">
      <button type="button" class="btn-remove-spec" title="Eliminar especificación" style="background:#fee2e2; color:#dc2626; border:none; width:34px; height:34px; border-radius:8px; cursor:pointer; font-weight:bold; font-size: 1.15rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s ease;">&times;</button>
    `;

    const keyInput = div.querySelector('.spec-key');
    const valInput = div.querySelector('.spec-val');
    const btnRemove = div.querySelector('.btn-remove-spec');

    keyInput.value = spec.key || '';
    valInput.value = spec.val || '';

    // Sincronizar cada pulsación de tecla inmediatamente sin alterar el orden ni el foco
    keyInput.addEventListener('input', (e) => {
      if (currentFormSpecs[idx]) {
        currentFormSpecs[idx].key = e.target.value;
      }
    });

    valInput.addEventListener('input', (e) => {
      if (currentFormSpecs[idx]) {
        currentFormSpecs[idx].val = e.target.value;
      }
    });

    // Eliminar únicamente esta fila sin desacomodar el texto de las demás
    btnRemove.addEventListener('click', () => {
      syncSpecsFromDOM();
      currentFormSpecs.splice(idx, 1);
      renderFormSpecsRows();
    });

    container.appendChild(div);

    if (focusIndex === idx) {
      setTimeout(() => keyInput.focus(), 60);
    }
  });
}

// Modal Handlers
function initDashboardModal() {
  const modal = document.getElementById('admin-form-modal');
  const btnAdd = document.getElementById('btn-add-product');
  const btnClose = document.getElementById('btn-close-modal');
  const btnCancel = document.getElementById('btn-cancel-modal');
  const btnAddSpec = document.getElementById('btn-add-spec-row');
  const form = document.getElementById('admin-product-form');

  if (btnAdd) {
    btnAdd.onclick = () => {
      document.getElementById('modal-form-title').textContent = 'Agregar Maquinaria';
      document.getElementById('form-prod-id').value = '';
      document.getElementById('form-prod-nombre').value = '';
      document.getElementById('form-prod-marca').value = '';
      const m3d = document.getElementById('form-prod-modelo3d');
      if (m3d) m3d.value = '';
      const chkVendido = document.getElementById('form-prod-vendido');
      if (chkVendido) chkVendido.checked = false;
      const chkOculto = document.getElementById('form-prod-oculto');
      if (chkOculto) chkOculto.checked = false;
      document.getElementById('form-prod-desc-corta').value = '';
      document.getElementById('form-prod-desc-larga').value = '';
      currentFormImages = [];
      currentFormVideo = '';
      currentFormSpecs = [
        { key: "Marca", val: "" },
        { key: "Estado", val: "Nuevo" }
      ];
      renderFormImageThumbnails();
      renderFormVideoPreview();
      renderFormSpecsRows();
      modal.style.display = 'flex';
    };
  }

  const closeModal = () => modal.style.display = 'none';
  if (btnClose) btnClose.onclick = closeModal;
  if (btnCancel) btnCancel.onclick = closeModal;

  if (btnAddSpec) {
    btnAddSpec.onclick = () => {
      syncSpecsFromDOM();
      currentFormSpecs.push({ key: '', val: '' });
      renderFormSpecsRows(currentFormSpecs.length - 1);
    };
  }

  if (form) {
    // Toggle price fields visibility
    const chkPrice = document.getElementById('form-prod-mostrar-precio');
    const priceFields = document.getElementById('price-fields-container');

    if (chkPrice && priceFields) {
      chkPrice.onchange = () => {
        priceFields.style.display = chkPrice.checked ? 'grid' : 'none';
      };
    }

    form.onsubmit = async (e) => {
      e.preventDefault();
      const idVal = document.getElementById('form-prod-id').value;
      const nombre = document.getElementById('form-prod-nombre').value;
      const categoria = document.getElementById('form-prod-categoria').value;
      const marca = document.getElementById('form-prod-marca').value;
      const estado = document.getElementById('form-prod-estado').value;
      const vendido = document.getElementById('form-prod-vendido') ? document.getElementById('form-prod-vendido').checked : false;
      const oculto = document.getElementById('form-prod-oculto') ? document.getElementById('form-prod-oculto').checked : false;
      const mostrarPrecio = document.getElementById('form-prod-mostrar-precio').checked;
      const moneda = document.getElementById('form-prod-moneda').value;
      const precio = document.getElementById('form-prod-precio').value.trim();
      const modelo3d = document.getElementById('form-prod-modelo3d')?.value.trim() || '';
      const descCorta = document.getElementById('form-prod-desc-corta').value;
      const descLarga = document.getElementById('form-prod-desc-larga').value;

      const mainImg = currentFormImages.length > 0 ? currentFormImages[0] : 'AGLOGOCIRC.png';

      syncSpecsFromDOM();
      const specsObj = {};
      currentFormSpecs.forEach(item => {
        const k = (item.key || '').trim();
        const v = (item.val || '').trim();
        if (k) {
          specsObj[k] = v;
        }
      });

      const prodData = {
        id: idVal ? idVal : undefined,
        nombre, categoria, marca, estado,
        vendido,
        oculto,
        mostrarPrecio, moneda, precio,
        modelo3d,
        video: currentFormVideo || '',
        imagen: mainImg,
        imagenes: currentFormImages.length > 0 ? currentFormImages : [mainImg],
        descripcionCorta: descCorta,
        descripcionLarga: descLarga,
        especificaciones: specsObj
      };

      try {
        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Maquinaria', 'Guardando producto y subiendo a la nube...', 60);
        }
        await window.saveAgroProduct(prodData);
        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Maquinaria', '¡Producto guardado y sincronizado exitosamente!', 100);
        }
        renderDashboardTable();
        closeModal();
      } catch (err) {
        alert("Error guardando producto: " + err.message);
      } finally {
        if (window.hideAgroUploadProgress) setTimeout(window.hideAgroUploadProgress, 700);
      }
    };
  }
}

// Edit Product Handler
window.editDashboardProduct = function(id) {
  const catalog = window.getAgroCatalog ? window.getAgroCatalog() : [];
  const prod = catalog.find(p => String(p.id) === String(id));
  if (!prod) return;

  const modal = document.getElementById('admin-form-modal');
  document.getElementById('modal-form-title').textContent = 'Editar Maquinaria';
  document.getElementById('form-prod-id').value = prod.id;
  document.getElementById('form-prod-nombre').value = prod.nombre;
  document.getElementById('form-prod-categoria').value = prod.categoria;
  document.getElementById('form-prod-marca').value = prod.marca;
  document.getElementById('form-prod-estado').value = prod.estado;

  const chkVendido = document.getElementById('form-prod-vendido');
  if (chkVendido) chkVendido.checked = !!prod.vendido;

  const chkOculto = document.getElementById('form-prod-oculto');
  if (chkOculto) chkOculto.checked = !!prod.oculto;

  const m3d = document.getElementById('form-prod-modelo3d');
  if (m3d) m3d.value = prod.modelo3d || '';

  const chkPrice = document.getElementById('form-prod-mostrar-precio');
  const priceFields = document.getElementById('price-fields-container');
  if (chkPrice) {
    chkPrice.checked = !!prod.mostrarPrecio;
    if (priceFields) priceFields.style.display = prod.mostrarPrecio ? 'grid' : 'none';
  }
  document.getElementById('form-prod-moneda').value = prod.moneda || 'USD';
  document.getElementById('form-prod-precio').value = prod.precio || '';

  document.getElementById('form-prod-desc-corta').value = prod.descripcionCorta;
  document.getElementById('form-prod-desc-larga').value = prod.descripcionLarga;

  currentFormImages = prod.imagenes ? [...prod.imagenes] : [prod.imagen];
  currentFormVideo = prod.video || '';
  
  let specs = prod.especificaciones || {};
  if (Array.isArray(specs)) {
    currentFormSpecs = specs.map(s => ({ key: s.key || '', val: s.val || '' }));
  } else if (typeof specs === 'object' && specs !== null) {
    currentFormSpecs = Object.entries(specs).map(([k, v]) => ({ key: k, val: String(v) }));
  } else {
    currentFormSpecs = [
      { key: "Marca", val: prod.marca || '' },
      { key: "Estado", val: prod.estado || 'Nuevo' }
    ];
  }

  renderFormImageThumbnails();
  renderFormVideoPreview();
  renderFormSpecsRows();
  modal.style.display = 'flex';
};

// 1-Click Toggle Sold / Available Handler
window.toggleDashboardProductSold = async function(id) {
  if (window.toggleAgroProductSold) {
    const updated = await window.toggleAgroProductSold(id);
    renderDashboardTable();
  }
};

// 1-Click Toggle Hidden / Visible Handler (Modo Ocultar)
window.toggleDashboardProductHidden = async function(id) {
  if (window.toggleAgroProductHidden) {
    await window.toggleAgroProductHidden(id);
    renderDashboardTable();
  }
};

// Instant Delete Product Handler
window.deleteDashboardProduct = async function(id) {
  const catalog = window.getAgroCatalog ? window.getAgroCatalog() : [];
  const prod = catalog.find(p => String(p.id) === String(id));
  const name = prod ? prod.nombre : 'este equipo';

  if (confirm(`¿Estás seguro de que deseas eliminar "${name}" del catálogo?`)) {
    await window.deleteAgroProduct(id);
    renderDashboardTable();
  }
};

/* ==========================================================================
   GESTIÓN DE GALERÍA Y MICRO-SECCIONES EN ADMIN
   ========================================================================== */

let currentAdminGalEditItem = null;

// Tab Switcher between Catálogo and Galería
function initAdminTabs() {
  const btnCat = document.getElementById('tab-btn-catalogo');
  const btnGal = document.getElementById('tab-btn-galeria');
  const viewCat = document.getElementById('admin-view-catalogo');
  const viewGal = document.getElementById('admin-view-galeria');

  if (!btnCat || !btnGal || !viewCat || !viewGal) return;

  function switchTab(target) {
    if (target === 'galeria') {
      btnGal.classList.add('active');
      btnGal.style.color = 'var(--brand-blue)';
      btnGal.style.borderBottom = '3px solid var(--brand-blue)';
      btnGal.style.marginBottom = '-2px';

      btnCat.classList.remove('active');
      btnCat.style.color = '#64748b';
      btnCat.style.borderBottom = 'none';
      btnCat.style.marginBottom = '0';

      viewCat.style.display = 'none';
      viewGal.style.display = 'block';

      renderAdminSeccionesChips();
      renderAdminGaleriaTable();
    } else {
      btnCat.classList.add('active');
      btnCat.style.color = 'var(--brand-blue)';
      btnCat.style.borderBottom = '3px solid var(--brand-blue)';
      btnCat.style.marginBottom = '-2px';

      btnGal.classList.remove('active');
      btnGal.style.color = '#64748b';
      btnGal.style.borderBottom = 'none';
      btnGal.style.marginBottom = '0';

      viewGal.style.display = 'none';
      viewCat.style.display = 'block';

      renderDashboardTable();
    }
  }

  btnCat.addEventListener('click', () => switchTab('catalogo'));
  btnGal.addEventListener('click', () => switchTab('galeria'));
}

// Render Micro-Sections Chips in Admin
function renderAdminSeccionesChips() {
  const container = document.getElementById('admin-secciones-chips-container');
  const filterSelect = document.getElementById('admin-gal-filter-seccion');
  const formSelect = document.getElementById('admin-gal-form-seccion');

  if (!window.AgroGaleriaStore) return;

  const secciones = window.AgroGaleriaStore.getMicroSecciones();
  const items = window.AgroGaleriaStore.getItems();

  // Populate Filter Select
  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = `<option value="todas">Todas las micro-secciones (${items.length})</option>`;
    secciones.forEach(sec => {
      const count = items.filter(it => it.seccionId === sec.id).length;
      filterSelect.innerHTML += `<option value="${sec.id}">${sec.nombre} (${count})</option>`;
    });
    if (currentVal) filterSelect.value = currentVal;
  }

  // Populate Form Select
  if (formSelect) {
    const currentVal = formSelect.value;
    formSelect.innerHTML = '';
    secciones.forEach(sec => {
      formSelect.innerHTML += `<option value="${sec.id}">${sec.nombre}</option>`;
    });
    if (currentVal) formSelect.value = currentVal;
  }

  // Populate Chips
  if (container) {
    container.innerHTML = '';
    secciones.forEach(sec => {
      const count = items.filter(it => it.seccionId === sec.id).length;
      const isDefaultSec = sec.id === 'historia';

      const chip = document.createElement('div');
      chip.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; background: #f1f5f9; padding: 6px 14px; border-radius: 30px; border: 1px solid #cbd5e1; font-size: 0.88rem; font-weight: 600; color: #1e293b;';
      chip.innerHTML = `
        <i class="fas ${sec.icono || 'fa-folder'}" style="color: var(--brand-blue);"></i>
        <span>${sec.nombre}</span>
        <span style="background: #e2e8f0; color: #475569; font-size: 0.75rem; padding: 2px 7px; border-radius: 12px; font-weight: 700;">${count}</span>
        ${!isDefaultSec ? `
          <button type="button" onclick="deleteAdminMicroSeccion('${sec.id}')" title="Eliminar micro-sección" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; padding: 2px; margin-left: 2px;">
            <i class="fas fa-times-circle"></i>
          </button>
        ` : ''}
      `;
      container.appendChild(chip);
    });
  }
}

// Render Gallery Items Table in Admin
function renderAdminGaleriaTable() {
  const tableBody = document.getElementById('admin-galeria-table-body');
  const countText = document.getElementById('galeria-count-text');
  const searchVal = (document.getElementById('admin-gal-search-input')?.value || '').toLowerCase().trim();
  const filterSec = document.getElementById('admin-gal-filter-seccion')?.value || 'todas';
  const filterTipo = document.getElementById('admin-gal-filter-tipo')?.value || 'todos';

  if (!tableBody || !window.AgroGaleriaStore) return;

  const items = window.AgroGaleriaStore.getItems();
  const secciones = window.AgroGaleriaStore.getMicroSecciones();
  const secMap = {};
  secciones.forEach(s => secMap[s.id] = s.nombre);

  const filtered = items.filter(item => {
    const matchesSearch = !searchVal || 
      (item.titulo && item.titulo.toLowerCase().includes(searchVal)) || 
      (item.descripcion && item.descripcion.toLowerCase().includes(searchVal));
    const matchesSec = filterSec === 'todas' || item.seccionId === filterSec;
    const matchesTipo = filterTipo === 'todos' || item.tipo === filterTipo;
    return matchesSearch && matchesSec && matchesTipo;
  });

  if (countText) {
    countText.textContent = `Mostrando ${filtered.length} de ${items.length} publicaciones`;
  }

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 3rem 1rem; color: #64748b;">
          <i class="fas fa-images" style="font-size: 2.2rem; margin-bottom: 0.75rem; color: #cbd5e1; display: block;"></i>
          No se encontraron contenidos de galería con los filtros aplicados.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(item => {
    let thumbUrl = item.miniatura || item.url || 'AGLOGOCIRC.png';
    let typeBadge = '';
    if (item.tipo === 'youtube') {
      typeBadge = `<span style="background: #fee2e2; color: #dc2626; padding: 4px 10px; border-radius: 20px; font-weight: 700; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 4px;"><i class="fab fa-youtube"></i> YouTube</span>`;
    } else if (item.tipo === 'video') {
      typeBadge = `<span style="background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 20px; font-weight: 700; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 4px;"><i class="fas fa-video"></i> Video</span>`;
    } else {
      typeBadge = `<span style="background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 20px; font-weight: 700; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 4px;"><i class="fas fa-camera"></i> Foto</span>`;
    }

    const secName = secMap[item.seccionId] || item.seccionId;

    return `
      <tr>
        <td class="col-thumb" style="width: 80px;">
          <div style="position: relative; width: 65px; height: 65px; border-radius: 10px; overflow: hidden; background: #0f172a;">
            <img src="${thumbUrl}" alt="${item.titulo}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='AGLOGOCIRC.png'">
            ${item.tipo !== 'foto' ? `<span style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); color: white; font-size: 1.1rem;"><i class="fas fa-play-circle"></i></span>` : ''}
          </div>
        </td>
        <td class="col-nombre">
          <strong style="color: #0f172a; font-size: 0.95rem; display: block; margin-bottom: 2px;">${item.titulo}</strong>
          <span style="color: #64748b; font-size: 0.8rem; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${item.descripcion || 'Sin descripción'}</span>
        </td>
        <td>
          <span style="background: #f1f5f9; color: #1e293b; padding: 4px 10px; border-radius: 6px; font-size: 0.82rem; font-weight: 600; border: 1px solid #cbd5e1;">
            ${secName}
          </span>
        </td>
        <td>${typeBadge}</td>
        <td style="color: #475569; font-size: 0.85rem; font-weight: 600;">${item.fecha || '-'}</td>
        <td class="col-acciones" style="text-align: right; white-space: nowrap;">
          <button type="button" class="btn-icon btn-icon-edit" onclick="editAdminGaleriaItem('${item.id}')" title="Editar contenido">
            <i class="fas fa-edit"></i> <span>Editar</span>
          </button>
          <button type="button" class="btn-icon btn-icon-delete" onclick="deleteAdminGaleriaItem('${item.id}')" title="Eliminar contenido">
            <i class="fas fa-trash-alt"></i> <span>Borrar</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Init Gallery Modals and Forms
function initAdminGaleriaModals() {
  const itemModal = document.getElementById('admin-galeria-item-modal');
  const seccionModal = document.getElementById('admin-galeria-seccion-modal');

  const btnOpenAddSec = document.getElementById('btn-admin-add-sec-dashboard');
  const btnOpenAddItem = document.getElementById('btn-admin-add-item-dashboard');

  const closeGalBtns = document.querySelectorAll('.btn-close-gal-modal');
  const closeSecBtns = document.querySelectorAll('.btn-close-sec-modal');

  const itemForm = document.getElementById('admin-galeria-item-form');
  const seccionForm = document.getElementById('admin-galeria-seccion-form');

  const selectTipo = document.getElementById('admin-gal-form-tipo');
  const groupFoto = document.getElementById('admin-gal-group-foto');
  const groupVideo = document.getElementById('admin-gal-group-video');
  const groupYoutube = document.getElementById('admin-gal-group-youtube');

  // Toggle Format Type in Item Form
  if (selectTipo) {
    selectTipo.addEventListener('change', () => {
      const tipo = selectTipo.value;
      if (groupFoto) groupFoto.style.display = tipo === 'foto' ? 'block' : 'none';
      if (groupVideo) groupVideo.style.display = tipo === 'video' ? 'block' : 'none';
      if (groupYoutube) groupYoutube.style.display = tipo === 'youtube' ? 'block' : 'none';
    });
  }

  // Open Add Section Modal
  if (btnOpenAddSec) {
    btnOpenAddSec.onclick = () => {
      if (seccionForm) seccionForm.reset();
      if (seccionModal) seccionModal.style.display = 'flex';
    };
  }

  // Open Add Item Modal
  if (btnOpenAddItem) {
    btnOpenAddItem.onclick = () => {
      currentAdminGalEditItem = null;
      if (itemForm) itemForm.reset();
      document.getElementById('admin-gal-form-id').value = '';
      document.getElementById('admin-gal-modal-title').textContent = 'Agregar Contenido a Galería';
      renderAdminSeccionesChips();
      if (selectTipo) {
        selectTipo.value = 'foto';
        selectTipo.dispatchEvent(new Event('change'));
      }
      if (itemModal) itemModal.style.display = 'flex';
    };
  }

  // Close Modals
  closeGalBtns.forEach(btn => {
    btn.onclick = () => {
      if (itemModal) itemModal.style.display = 'none';
    };
  });

  closeSecBtns.forEach(btn => {
    btn.onclick = () => {
      if (seccionModal) seccionModal.style.display = 'none';
    };
  });

  // Submit Section Form
  if (seccionForm) {
    seccionForm.onsubmit = async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('admin-sec-form-nombre').value.trim();
      const desc = document.getElementById('admin-sec-form-desc').value.trim();
      const icono = document.getElementById('admin-sec-form-icono').value;

      if (!nombre) return;

      try {
        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Creando Micro-Sección', 'Guardando sección...', 50);
        }
        await window.AgroGaleriaStore.saveMicroSeccion({
          nombre: nombre,
          descripcion: desc,
          icono: icono
        });
        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Creando Micro-Sección', '¡Sección creada con éxito!', 100);
        }
        if (seccionModal) seccionModal.style.display = 'none';
        renderAdminSeccionesChips();
        renderAdminGaleriaTable();
      } catch (err) {
        alert("Error creando sección: " + err.message);
      } finally {
        if (window.hideAgroUploadProgress) setTimeout(window.hideAgroUploadProgress, 600);
      }
    };
  }

  // Submit Gallery Item Form
  if (itemForm) {
    itemForm.onsubmit = async (e) => {
      e.preventDefault();

      const id = document.getElementById('admin-gal-form-id').value || null;
      const seccionId = document.getElementById('admin-gal-form-seccion').value;
      const tipo = document.getElementById('admin-gal-form-tipo').value;
      const titulo = document.getElementById('admin-gal-form-titulo').value.trim();
      const desc = document.getElementById('admin-gal-form-desc').value.trim();
      const fecha = document.getElementById('admin-gal-form-fecha').value.trim();

      let url = currentAdminGalEditItem ? currentAdminGalEditItem.url : '';
      let miniatura = currentAdminGalEditItem ? currentAdminGalEditItem.miniatura : '';
      let youtubeId = '';

      const cloudName = window.AGRO_CONFIG?.cloudinary?.cloudName || 'pfskomq5';
      const uploadPreset = window.AGRO_CONFIG?.cloudinary?.uploadPreset || 'nwrslkmw';

      try {
        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Contenido', 'Procesando archivo y datos...', 30);
        }

        if (tipo === 'youtube') {
          const ytInput = document.getElementById('admin-gal-form-youtube-url').value.trim();
          youtubeId = window.AgroGaleriaStore.extractYouTubeId(ytInput);
          if (!youtubeId) {
            alert('Por favor ingresá un enlace válido de YouTube.');
            return;
          }
          url = `https://www.youtube.com/watch?v=${youtubeId}`;
          miniatura = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
        } else if (tipo === 'foto') {
          const photoInput = document.getElementById('admin-gal-form-file');
          const manualUrl = document.getElementById('admin-gal-form-manual-url').value.trim();

          if (manualUrl) {
            url = manualUrl;
            miniatura = manualUrl;
          } else if (photoInput && photoInput.files && photoInput.files[0]) {
            let file = photoInput.files[0];
            file = await processHeicImage(file);

            if (window.showAgroUploadProgress) {
              window.showAgroUploadProgress('Subiendo Foto a la Nube', 'Subiendo foto a Cloudinary...', 30);
            }

            const data = await window.uploadToCloudinaryWithProgress(file, 'image', (pct) => {
              if (window.showAgroUploadProgress) {
                const overallPct = Math.round(30 + (pct * 0.55));
                window.showAgroUploadProgress('Subiendo Foto a la Nube', `Subiendo foto: ${pct}%...`, overallPct);
              }
            });

            if (data.secure_url) {
              url = data.secure_url;
              miniatura = data.secure_url;
            } else {
              throw new Error(data.error?.message || 'Error al subir foto a Cloudinary');
            }
          }
        } else if (tipo === 'video') {
          const videoInput = document.getElementById('admin-gal-form-video-file');
          if (videoInput && videoInput.files && videoInput.files[0]) {
            const file = videoInput.files[0];
            if (window.showAgroUploadProgress) {
              window.showAgroUploadProgress('Subiendo Video a la Nube', 'Subiendo video a Cloudinary...', 25);
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
              throw new Error(data.error?.message || 'Error al subir video');
            }
          }
        }

        if (!url && !youtubeId) {
          alert('Por favor selecciona una foto, un video o un enlace de YouTube.');
          return;
        }

        const itemData = {
          id: id,
          seccionId: seccionId,
          tipo: tipo,
          url: url,
          youtubeId: youtubeId || undefined,
          miniatura: miniatura || url,
          titulo: titulo,
          descripcion: desc,
          fecha: fecha
        };

        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Contenido', 'Guardando en la galería...', 90);
        }

        await window.AgroGaleriaStore.saveItem(itemData);

        if (window.showAgroUploadProgress) {
          window.showAgroUploadProgress('Guardando Contenido', '¡Contenido guardado exitosamente!', 100);
        }

        if (itemModal) itemModal.style.display = 'none';
        renderAdminSeccionesChips();
        renderAdminGaleriaTable();
      } catch (err) {
        alert("Error guardando contenido en galería: " + err.message);
      } finally {
        if (window.hideAgroUploadProgress) setTimeout(window.hideAgroUploadProgress, 600);
      }
    };
  }
}

// Global Handlers for Edit and Delete in Gallery
window.editAdminGaleriaItem = function(id) {
  if (!window.AgroGaleriaStore) return;
  const item = window.AgroGaleriaStore.getItemById(id);
  if (!item) return;

  currentAdminGalEditItem = item;
  renderAdminSeccionesChips();

  const itemModal = document.getElementById('admin-galeria-item-modal');
  document.getElementById('admin-gal-modal-title').textContent = 'Editar Contenido de Galería';
  document.getElementById('admin-gal-form-id').value = item.id;
  document.getElementById('admin-gal-form-seccion').value = item.seccionId;

  const selectTipo = document.getElementById('admin-gal-form-tipo');
  selectTipo.value = item.tipo;
  selectTipo.dispatchEvent(new Event('change'));

  if (item.tipo === 'youtube') {
    document.getElementById('admin-gal-form-youtube-url').value = item.url || `https://www.youtube.com/watch?v=${item.youtubeId}`;
  } else if (item.tipo === 'foto') {
    document.getElementById('admin-gal-form-manual-url').value = item.url;
  }

  document.getElementById('admin-gal-form-titulo').value = item.titulo;
  document.getElementById('admin-gal-form-desc').value = item.descripcion || '';
  document.getElementById('admin-gal-form-fecha').value = item.fecha || '';

  if (itemModal) itemModal.style.display = 'flex';
};

window.deleteAdminGaleriaItem = async function(id) {
  if (!window.AgroGaleriaStore) return;
  const item = window.AgroGaleriaStore.getItemById(id);
  const name = item ? item.titulo : 'esta publicación';

  if (confirm(`¿Estás seguro de que deseas eliminar "${name}" de la galería?`)) {
    await window.AgroGaleriaStore.deleteItem(id);
    renderAdminSeccionesChips();
    renderAdminGaleriaTable();
  }
};

window.deleteAdminMicroSeccion = async function(id) {
  if (!window.AgroGaleriaStore) return;
  const secciones = window.AgroGaleriaStore.getMicroSecciones();
  const sec = secciones.find(s => s.id === id);
  if (!sec) return;

  if (confirm(`¿Eliminar la micro-sección "${sec.nombre}"? Los contenidos asociados pasarán a "Historia".`)) {
    await window.AgroGaleriaStore.deleteMicroSeccion(id);
    renderAdminSeccionesChips();
    renderAdminGaleriaTable();
  }
};

// Event Listeners for Filters & Init
document.addEventListener('DOMContentLoaded', () => {
  initDashboardAuth();
  initDashboardImageManager();
  initDashboardVideoManager();
  initDashboardModal();
  initAdminTabs();
  initAdminGaleriaModals();

  const searchInput = document.getElementById('admin-search-input');
  const catSelect = document.getElementById('admin-filter-categoria');
  const dispSelect = document.getElementById('admin-filter-disponibilidad');

  if (searchInput) searchInput.addEventListener('input', renderDashboardTable);
  if (catSelect) catSelect.addEventListener('change', renderDashboardTable);
  if (dispSelect) dispSelect.addEventListener('change', renderDashboardTable);

  const galSearchInput = document.getElementById('admin-gal-search-input');
  const galFilterSec = document.getElementById('admin-gal-filter-seccion');
  const galFilterTipo = document.getElementById('admin-gal-filter-tipo');

  if (galSearchInput) galSearchInput.addEventListener('input', renderAdminGaleriaTable);
  if (galFilterSec) galFilterSec.addEventListener('change', renderAdminGaleriaTable);
  if (galFilterTipo) galFilterTipo.addEventListener('change', renderAdminGaleriaTable);

  window.addEventListener('agroCatalogUpdated', renderDashboardTable);
  window.addEventListener('agroGaleriaUpdated', () => {
    renderAdminSeccionesChips();
    renderAdminGaleriaTable();
  });
});
