// --- AGROGUARDATI - MODO ADMINISTRADOR EN-PÁGINA (ESTILO MARIÑO) ---

function initAdminBar() {
  const config = window.AGRO_CONFIG?.firebase;
  if (config && config.apiKey && typeof firebase !== 'undefined') {
    if (!firebase.apps.length) firebase.initializeApp(config);
    
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.email.toLowerCase() === (window.AGRO_CONFIG?.adminEmail || 'matiasschvabauer@gmail.com').toLowerCase()) {
        localStorage.setItem('agro_admin_session', 'true');
        renderAdminUI(user);
      } else {
        localStorage.removeItem('agro_admin_session');
        removeAdminUI();
      }
    });
  } else if (window.isAgroAdmin && window.isAgroAdmin()) {
    renderAdminUI({ email: 'matiasschvabauer@gmail.com' });
  }
}

function renderAdminUI(user) {
  // 1. Inject Top Admin Bar if not present
  if (!document.getElementById('agro-admin-topbar')) {
    const bar = document.createElement('div');
    bar.id = 'agro-admin-topbar';
    bar.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 44px;
      background: #0f172a;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.25rem;
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 99999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      font-family: 'Inter', sans-serif;
    `;
    bar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="display: inline-block; width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></span>
        <span>Modo Admin: <strong style="color: #60a5fa;">${user.email}</strong></span>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <button id="btn-admin-add" style="background: #1d5497; color: white; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fas fa-plus"></i> + Agregar Equipo</button>
        <a href="admin.html" style="background: #334155; color: white; text-decoration: none; padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-cog"></i> Panel</a>
        <button id="btn-admin-logout" style="background: #ef4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-sign-out-alt"></i> Salir</button>
      </div>
    `;
    document.body.prepend(bar);
    document.body.style.paddingTop = (parseInt(document.body.style.paddingTop || 0) + 44) + 'px';

    document.getElementById('btn-admin-add').addEventListener('click', () => openAdminModal());
    document.getElementById('btn-admin-logout').addEventListener('click', () => {
      if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut();
      localStorage.removeItem('agro_admin_session');
      window.location.reload();
    });
  }

  // 2. Attach Admin Controls to Product Cards
  attachCardAdminControls();

  // 3. Attach Admin Controls to Product Detail Page
  attachDetailAdminControls();
}

function removeAdminUI() {
  const bar = document.getElementById('agro-admin-topbar');
  if (bar) {
    bar.remove();
    document.body.style.paddingTop = '0px';
  }
}

function attachCardAdminControls() {
  if (!window.isAgroAdmin || !window.isAgroAdmin()) return;

  // Catalog items
  document.querySelectorAll('.catalog-item, .product-card').forEach(card => {
    if (card.querySelector('.admin-card-actions')) return;

    let prodId = card.getAttribute('data-id');
    if (!prodId) {
      const link = card.getAttribute('href') || card.querySelector('a')?.getAttribute('href');
      if (link && link.includes('id=')) {
        prodId = link.split('id=')[1].split('&')[0];
      }
    }

    if (prodId) {
      card.style.position = 'relative';
      const actions = document.createElement('div');
      actions.className = 'admin-card-actions';
      actions.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        gap: 6px;
        z-index: 10;
      `;
      actions.innerHTML = `
        <button onclick="event.preventDefault(); event.stopPropagation(); openAdminModal('${prodId}')" style="background: rgba(29, 84, 151, 0.95); color: white; border: none; padding: 6px 12px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.8rem; backdrop-filter: blur(4px); box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><i class="fas fa-edit"></i> Editar</button>
        <button onclick="event.preventDefault(); event.stopPropagation(); confirmDeleteProduct('${prodId}')" style="background: rgba(211, 47, 47, 0.95); color: white; border: none; padding: 6px 12px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.8rem; backdrop-filter: blur(4px); box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><i class="fas fa-trash-alt"></i> Borrar</button>
      `;
      card.appendChild(actions);
    }
  });
}

// Confirm Delete Function
window.confirmDeleteProduct = async function(id) {
  const catalog = window.getAgroCatalog();
  const prod = catalog.find(p => String(p.id) === String(id));
  const name = prod ? prod.nombre : 'este equipo';

  if (confirm(`¿Estás seguro de que deseas eliminar "${name}" del catálogo?`)) {
    await window.deleteAgroProduct(id);
    // Remove element from DOM immediately
    document.querySelectorAll(`[data-id="${id}"]`).forEach(el => el.remove());
    // Trigger re-render
    if (window.initCatalog) window.initCatalog();
    if (window.initFeatured) window.initFeatured();
  }
};

// Modal Edit / Add
let currentModalImages = [];

window.openAdminModal = function(id = null) {
  let modal = document.getElementById('agro-admin-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'agro-admin-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(6px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    `;
    modal.innerHTML = `
      <div style="background: white; width: 100%; max-width: 650px; max-height: 90vh; overflow-y: auto; border-radius: 20px; padding: 2rem; box-shadow: 0 25px 50px rgba(0,0,0,0.3); font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem;">
          <h2 id="agro-modal-title" style="font-size: 1.4rem; color: #1e293b;">Agregar Equipo</h2>
          <button id="agro-modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #64748b;">&times;</button>
        </div>

        <form id="agro-modal-form">
          <input type="hidden" id="modal-prod-id">

          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;">Nombre del Equipo</label>
            <input type="text" id="modal-prod-nombre" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 0.95rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem;">
            <div>
              <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;">Categoría</label>
              <select id="modal-prod-categoria" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 0.95rem;">
                <option value="Tractores">Tractores</option>
                <option value="Cosechadoras">Cosechadoras</option>
                <option value="Sembradoras">Sembradoras</option>
                <option value="Pulverizadores">Pulverizadores</option>
                <option value="Herramientas">Herramientas</option>
                <option value="Acoplados">Acoplados</option>
                <option value="Embarcaciones">Embarcaciones</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;">Marca</label>
              <input type="text" id="modal-prod-marca" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 0.95rem;">
            </div>
          </div>

          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;">Estado</label>
            <select id="modal-prod-estado" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 0.95rem;">
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </select>
          </div>

          <!-- Gestor de Imágenes -->
          <div style="margin-bottom: 1.2rem; background: #f8fafc; padding: 1.2rem; border-radius: 12px; border: 1px solid #e2e8f0;">
            <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.6rem; color: #1e293b;">Fotos del Producto (Hacé clic en ❌ para borrar individualmente)</label>
            <div id="modal-images-grid" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 1rem;"></div>

            <div id="modal-cloudinary-upload" style="border: 2px dashed #cbd5e1; border-radius: 10px; padding: 1rem; text-align: center; background: white; cursor: pointer;">
              <i class="fas fa-cloud-upload-alt" style="font-size: 1.8rem; color: #1d5497; margin-bottom: 0.3rem;"></i>
              <p style="font-size: 0.85rem; font-weight: 600; color: #334155; margin: 0;">Subir foto a Cloudinary</p>
              <input type="file" id="modal-file-input" multiple accept="image/*" style="display: none;">
            </div>
          </div>

          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;">Descripción Corta</label>
            <input type="text" id="modal-prod-desc-corta" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 0.95rem;">
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; color: #334155;">Descripción Detallada</label>
            <textarea id="modal-prod-desc-larga" rows="3" required style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 0.95rem; font-family: inherit;"></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" id="agro-modal-cancel" style="padding: 0.75rem 1.25rem; border-radius: 10px; border: none; background: #e2e8f0; font-weight: 600; cursor: pointer;">Cancelar</button>
            <button type="submit" style="padding: 0.75rem 1.5rem; border-radius: 10px; border: none; background: #1d5497; color: white; font-weight: 700; cursor: pointer;">Guardar Producto</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('agro-modal-close').onclick = () => modal.style.display = 'none';
    document.getElementById('agro-modal-cancel').onclick = () => modal.style.display = 'none';

    // Cloudinary uploader in modal
    const uploadBox = document.getElementById('modal-cloudinary-upload');
    const fileInput = document.getElementById('modal-file-input');
    uploadBox.onclick = () => fileInput.click();

    fileInput.onchange = async (e) => {
      const files = Array.from(e.target.files);
      const cloudName = window.AGRO_CONFIG?.cloudinary?.cloudName || 'pfskomq5';
      const uploadPreset = window.AGRO_CONFIG?.cloudinary?.uploadPreset || 'nwrslkmw';

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
          uploadBox.querySelector('p').textContent = 'Subiendo foto...';
          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST', body: formData
          });
          const data = await res.json();
          if (data.secure_url) {
            currentModalImages.push(data.secure_url);
            renderModalThumbnails();
          }
        } catch (err) {
          alert("Error subiendo foto: " + err.message);
        } finally {
          uploadBox.querySelector('p').textContent = 'Subir foto a Cloudinary';
        }
      }
    };

    // Form submit
    document.getElementById('agro-modal-form').onsubmit = async (e) => {
      e.preventDefault();
      const idVal = document.getElementById('modal-prod-id').value;
      const nombre = document.getElementById('modal-prod-nombre').value;
      const categoria = document.getElementById('modal-prod-categoria').value;
      const marca = document.getElementById('modal-prod-marca').value;
      const estado = document.getElementById('modal-prod-estado').value;
      const descCorta = document.getElementById('modal-prod-desc-corta').value;
      const descLarga = document.getElementById('modal-prod-desc-larga').value;

      const mainImg = currentModalImages.length > 0 ? currentModalImages[0] : 'AGLOGOCIRC.png';

      const prodData = {
        id: idVal ? idVal : undefined,
        nombre, categoria, marca, estado,
        imagen: mainImg,
        imagenes: currentModalImages.length > 0 ? currentModalImages : [mainImg],
        descripcionCorta: descCorta,
        descripcionLarga: descLarga,
        especificaciones: { "Marca": marca, "Estado": estado }
      };

      await window.saveAgroProduct(prodData);
      modal.style.display = 'none';
      if (window.initCatalog) window.initCatalog();
      if (window.initFeatured) window.initFeatured();
    };
  }

  // Fill form if editing
  if (id) {
    const catalog = window.getAgroCatalog();
    const prod = catalog.find(p => String(p.id) === String(id));
    if (prod) {
      document.getElementById('agro-modal-title').textContent = 'Editar Equipo';
      document.getElementById('modal-prod-id').value = prod.id;
      document.getElementById('modal-prod-nombre').value = prod.nombre;
      document.getElementById('modal-prod-categoria').value = prod.categoria;
      document.getElementById('modal-prod-marca').value = prod.marca;
      document.getElementById('modal-prod-estado').value = prod.estado;
      document.getElementById('modal-prod-desc-corta').value = prod.descripcionCorta;
      document.getElementById('modal-prod-desc-larga').value = prod.descripcionLarga;
      currentModalImages = prod.imagenes ? [...prod.imagenes] : [prod.imagen];
    }
  } else {
    document.getElementById('agro-modal-title').textContent = 'Agregar Nuevo Equipo';
    document.getElementById('modal-prod-id').value = '';
    document.getElementById('modal-prod-nombre').value = '';
    document.getElementById('modal-prod-desc-corta').value = '';
    document.getElementById('modal-prod-desc-larga').value = '';
    currentModalImages = [];
  }

  renderModalThumbnails();
  modal.style.display = 'flex';
};

function renderModalThumbnails() {
  const container = document.getElementById('modal-images-grid');
  if (!container) return;
  container.innerHTML = '';

  currentModalImages.forEach((url, i) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      position: relative;
      width: 75px;
      height: 75px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #cbd5e1;
    `;
    wrapper.innerHTML = `
      <img src="${url}" style="width: 100%; height: 100%; object-fit: cover;">
      <button type="button" style="
        position: absolute;
        top: 2px; right: 2px;
        background: rgba(220, 38, 38, 0.9);
        color: white;
        border: none;
        width: 22px; height: 22px;
        border-radius: 50%;
        font-size: 11px;
        font-weight: 900;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">&times;</button>
    `;
    wrapper.querySelector('button').onclick = () => {
      currentModalImages.splice(i, 1);
      renderModalThumbnails();
    };
    container.appendChild(wrapper);
  });
}

function attachDetailAdminControls() {
  if (!window.isAgroAdmin || !window.isAgroAdmin()) return;

  const urlParams = new URLSearchParams(window.location.search);
  const prodId = urlParams.get('id');
  if (!prodId) return;

  const titleEl = document.querySelector('.product-detail-title') || document.querySelector('h1');
  if (titleEl && !document.getElementById('detail-admin-bar')) {
    const div = document.createElement('div');
    div.id = 'detail-admin-bar';
    div.style.cssText = `
      display: flex; gap: 10px; margin: 1rem 0;
    `;
    div.innerHTML = `
      <button onclick="openAdminModal('${prodId}')" style="background: #1d5497; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer;"><i class="fas fa-edit"></i> Editar este equipo</button>
      <button onclick="confirmDeleteProduct('${prodId}')" style="background: #d32f2f; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer;"><i class="fas fa-trash-alt"></i> Borrar este equipo</button>
    `;
    titleEl.parentNode.insertBefore(div, titleEl.nextSibling);
  }
}

// React to auth changes & DOM events
window.addEventListener('agroCatalogUpdated', () => {
  setTimeout(attachCardAdminControls, 100);
});

document.addEventListener('DOMContentLoaded', () => {
  initAdminBar();
  setTimeout(attachCardAdminControls, 300);
});
