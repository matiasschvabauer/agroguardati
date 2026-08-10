// --- AGROGUARDATI - LÓGICA DE PANEL ADMINISTRADOR (FIREBASE + CLOUDINARY) ---

let currentUser = null;
let currentProductImages = [];
let localProducts = [...(typeof catalogo !== 'undefined' ? catalogo : [])];
let isFirestoreActive = false;

// Initial Firebase Check & Setup
function initFirebaseApp() {
  const config = window.AGRO_CONFIG?.firebase;
  if (!config || !config.apiKey || config.apiKey.includes('TU_API_KEY')) {
    console.warn('Firebase no configurado aún. Operando en modo local/demostración.');
    return false;
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  return true;
}

// Sync with Firestore Database
function syncWithFirestore() {
  if (!isFirestoreActive) return;
  const db = firebase.firestore();
  
  db.collection('productos').onSnapshot(snapshot => {
    if (!snapshot.empty) {
      const items = [];
      snapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() });
      });
      localProducts = items;
      renderProductsTable();
    } else {
      // Populate initial products to Firestore if empty
      if (typeof catalogo !== 'undefined' && catalogo.length > 0) {
        catalogo.forEach(item => {
          db.collection('productos').doc(String(item.id)).set(item);
        });
      }
    }
  }, err => {
    console.warn('Operando con catálogo local (esperando reglas de Firestore):', err.message);
  });
}

// Google Auth Handler
function initAuth() {
  const isFirebaseReady = initFirebaseApp();
  const btnGoogle = document.getElementById('btn-google-login');
  const btnLogout = document.getElementById('btn-logout');
  const authScreen = document.getElementById('auth-screen');
  const adminDashboard = document.getElementById('admin-dashboard');
  const userSection = document.getElementById('user-section');
  const authAlert = document.getElementById('auth-alert');

  if (isFirebaseReady) {
    isFirestoreActive = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const allowedEmail = window.AGRO_CONFIG?.adminEmail || "matiasschvabauer@gmail.com";
        if (user.email.toLowerCase() === allowedEmail.toLowerCase()) {
          currentUser = user;
          showDashboard(user);
          syncWithFirestore();
        } else {
          firebase.auth().signOut();
          authAlert.style.display = 'block';
          authAlert.textContent = `Acceso denegado. La cuenta ${user.email} no tiene permisos de administrador.`;
        }
      } else {
        currentUser = null;
        showAuthScreen();
      }
    });

    if (btnGoogle) {
      btnGoogle.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch(err => {
          authAlert.style.display = 'block';
          authAlert.textContent = "Error al iniciar sesión con Google: " + err.message;
        });
      });
    }

    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        firebase.auth().signOut();
      });
    }
  } else {
    // Mode fallback: Demo Login for matiasschvabauer@gmail.com
    if (btnGoogle) {
      btnGoogle.addEventListener('click', () => {
        currentUser = {
          displayName: "Matías Schvabauer",
          email: "matiasschvabauer@gmail.com",
          photoURL: "AGLOGOCIRC.png"
        };
        showDashboard(currentUser);
      });
    }
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        currentUser = null;
        showAuthScreen();
      });
    }
  }

  function showDashboard(user) {
    if (authScreen) authScreen.style.display = 'none';
    if (adminDashboard) adminDashboard.style.display = 'block';
    if (userSection) {
      userSection.style.display = 'flex';
      document.getElementById('user-name').textContent = user.displayName || user.email;
      document.getElementById('user-photo').src = user.photoURL || 'AGLOGOCIRC.png';
    }
    renderProductsTable();
  }

  function showAuthScreen() {
    if (authScreen) authScreen.style.display = 'block';
    if (adminDashboard) adminDashboard.style.display = 'none';
    if (userSection) userSection.style.display = 'none';
  }
}

// Render Table
function renderProductsTable() {
  const tableBody = document.getElementById('products-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';
  if (localProducts.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 2rem;">No hay maquinaria en el catálogo.</td></tr>';
    return;
  }

  localProducts.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${item.imagen}" class="table-img" alt="${item.nombre}"></td>
      <td><strong>${item.nombre}</strong></td>
      <td>${item.categoria}</td>
      <td>${item.marca}</td>
      <td><span style="background: #eef2ff; color: var(--brand-blue); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">${item.estado}</span></td>
      <td style="text-align: right;">
        <button class="btn-action btn-edit" onclick="editProduct('${item.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn-action btn-delete" onclick="deleteProduct('${item.id}')"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Cloudinary Uploader Integration
function initCloudinaryUpload() {
  const dropzone = document.getElementById('cloudinary-dropzone');
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview-container');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const cloudName = window.AGRO_CONFIG?.cloudinary?.cloudName;
    const uploadPreset = window.AGRO_CONFIG?.cloudinary?.uploadPreset;

    for (const file of files) {
      if (cloudName && uploadPreset) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
          dropzone.querySelector('p').textContent = 'Subiendo a Cloudinary...';
          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
          });
          const data = await res.json();
          if (data.secure_url) {
            currentProductImages.push(data.secure_url);
            renderPreviews();
          } else if (data.error) {
            alert('Error Cloudinary: ' + data.error.message);
          }
        } catch (err) {
          alert('Error al subir imagen a Cloudinary: ' + err.message);
        } finally {
          dropzone.querySelector('p').textContent = 'Haz clic o arrastra fotos aquí';
        }
      } else {
        const reader = new FileReader();
        reader.onload = (evt) => {
          currentProductImages.push(evt.target.result);
          renderPreviews();
        };
        reader.readAsDataURL(file);
      }
    }
  });

  function renderPreviews() {
    if (!previewContainer) return;
    previewContainer.innerHTML = '';
    currentProductImages.forEach((url, i) => {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'preview-thumb';
      img.title = 'Haga clic para eliminar';
      img.onclick = () => {
        currentProductImages.splice(i, 1);
        renderPreviews();
      };
      previewContainer.appendChild(img);
    });
  }
}

// Modal & Form Functions
function initModalLogic() {
  const modal = document.getElementById('product-modal');
  const btnAdd = document.getElementById('btn-add-product');
  const btnClose = document.getElementById('btn-close-modal');
  const btnCancel = document.getElementById('btn-cancel');
  const form = document.getElementById('product-form');

  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      form.reset();
      document.getElementById('prod-id').value = '';
      document.getElementById('modal-title').textContent = 'Agregar Maquinaria';
      currentProductImages = [];
      document.getElementById('preview-container').innerHTML = '';
      modal.style.display = 'flex';
    });
  }

  const closeModal = () => modal.style.display = 'none';
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const idVal = document.getElementById('prod-id').value;
      const nombre = document.getElementById('prod-nombre').value;
      const categoria = document.getElementById('prod-categoria').value;
      const marca = document.getElementById('prod-marca').value;
      const estado = document.getElementById('prod-estado').value;
      const descCorta = document.getElementById('prod-desc-corta').value;
      const descLarga = document.getElementById('prod-desc-larga').value;

      const mainImg = currentProductImages.length > 0 ? currentProductImages[0] : 'AGLOGOCIRC.png';

      const prodData = {
        nombre, categoria, marca, estado,
        imagen: mainImg,
        imagenes: currentProductImages.length > 0 ? currentProductImages : [mainImg],
        descripcionCorta: descCorta,
        descripcionLarga: descLarga,
        especificaciones: { "Marca": marca, "Estado": estado }
      };

      if (isFirestoreActive && firebase.auth().currentUser) {
        const db = firebase.firestore();
        if (idVal) {
          await db.collection('productos').doc(String(idVal)).set(prodData, { merge: true });
        } else {
          const docRef = await db.collection('productos').add(prodData);
          await docRef.update({ id: docRef.id });
        }
      } else {
        if (idVal) {
          const index = localProducts.findIndex(p => p.id == idVal);
          if (index !== -1) {
            localProducts[index] = { ...localProducts[index], ...prodData };
          }
        } else {
          const newId = localProducts.length > 0 ? Math.max(...localProducts.map(p => Number(p.id) || 0)) + 1 : 1;
          localProducts.unshift({ id: newId, ...prodData });
        }
        renderProductsTable();
      }

      closeModal();
    });
  }
}

// Global actions
window.editProduct = function(id) {
  const prod = localProducts.find(p => p.id == id);
  if (!prod) return;

  const modal = document.getElementById('product-modal');
  document.getElementById('prod-id').value = prod.id;
  document.getElementById('modal-title').textContent = 'Editar Maquinaria';
  document.getElementById('prod-nombre').value = prod.nombre;
  document.getElementById('prod-categoria').value = prod.categoria;
  document.getElementById('prod-marca').value = prod.marca;
  document.getElementById('prod-estado').value = prod.estado;
  document.getElementById('prod-desc-corta').value = prod.descripcionCorta;
  document.getElementById('prod-desc-larga').value = prod.descripcionLarga;

  currentProductImages = prod.imagenes ? [...prod.imagenes] : [prod.imagen];
  
  const previewContainer = document.getElementById('preview-container');
  if (previewContainer) {
    previewContainer.innerHTML = '';
    currentProductImages.forEach((url, i) => {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'preview-thumb';
      img.onclick = () => {
        currentProductImages.splice(i, 1);
        img.remove();
      };
      previewContainer.appendChild(img);
    });
  }

  modal.style.display = 'flex';
};

window.deleteProduct = async function(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este equipo del catálogo?')) {
    if (isFirestoreActive && firebase.auth().currentUser) {
      await firebase.firestore().collection('productos').doc(String(id)).delete();
    } else {
      localProducts = localProducts.filter(p => p.id != id);
      renderProductsTable();
    }
  }
};

// Document Loaded Initialization
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initCloudinaryUpload();
  initModalLogic();
});
