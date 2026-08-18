// --- AGROGUARDATI - GESTOR REACTIVO DE CATÁLOGO Y AUTENTICACIÓN ---

const STORAGE_KEY = 'agroguardati_catalog_v2';
window.AGRO_ADMIN_EMAILS = ['matiasschvabauer@gmail.com', 'guillermoguardati@gmail.com'];

// 1. Obtener catálogo actual (priorizando localStorage / Firestore, con fallback a catalogo inicial)
window.getAgroCatalog = function() {
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error("Error leyendo catálogo local:", e);
    }
  }

  // Si no hay datos guardados aún, inicializar con catalogo de data.js
  const initial = typeof catalogo !== 'undefined' ? catalogo : [];
  if (initial.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  }
  return initial;
};

// 2. Guardar o actualizar un producto
window.saveAgroProduct = async function(productData) {
  let catalog = window.getAgroCatalog();

  if (productData.id) {
    const index = catalog.findIndex(p => String(p.id) === String(productData.id));
    if (index !== -1) {
      catalog[index] = { ...catalog[index], ...productData };
    } else {
      catalog.unshift(productData);
    }
  } else {
    const newId = Date.now();
    productData.id = newId;
    catalog.unshift(productData);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));

  if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && firebase.auth().currentUser) {
    try {
      const db = firebase.firestore();
      await db.collection('productos').doc(String(productData.id)).set(productData, { merge: true });
    } catch (err) {
      console.warn("Firestore save fallback:", err.message);
    }
  }

  window.dispatchEvent(new CustomEvent('agroCatalogUpdated', { detail: catalog }));
  return productData;
};

// 3. Eliminar producto
window.deleteAgroProduct = async function(id) {
  let catalog = window.getAgroCatalog();
  catalog = catalog.filter(p => String(p.id) !== String(id));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));

  if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && firebase.auth().currentUser) {
    try {
      const db = firebase.firestore();
      await db.collection('productos').doc(String(id)).delete();
    } catch (err) {
      console.warn("Firestore delete fallback:", err.message);
    }
  }

  window.dispatchEvent(new CustomEvent('agroCatalogUpdated', { detail: catalog }));
  return true;
};

// 4. Verificar si hay sesión admin iniciada
window.isAgroAdmin = function() {
  const emails = window.AGRO_CONFIG?.adminEmails || window.AGRO_ADMIN_EMAILS || ['matiasschvabauer@gmail.com', 'guillermoguardati@gmail.com'];
  if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    const user = firebase.auth().currentUser;
    if (user && emails.includes(user.email.toLowerCase())) {
      return true;
    }
  }
  const session = localStorage.getItem('agro_admin_session');
  return session === 'true';
};

// 5. Formateador de precios (Consultar vs USD / ARS)
window.formatAgroPrice = function(prod) {
  if (!prod || !prod.mostrarPrecio || !prod.precio) {
    return `<span class="price-tag price-consultar"><i class="fas fa-comments"></i> Consultar</span>`;
  }
  const moneda = prod.moneda || 'USD';
  const raw = String(prod.precio).replaceAll('.', '').replaceAll(',', '').trim();
  const val = Number(raw);
  const formatted = isNaN(val) ? prod.precio : val.toLocaleString('es-AR');
  return `<span class="price-tag price-value"><strong>${moneda}</strong> ${formatted}</span>`;
};

// Sincronizar catálogo inicial desde Firestore si está disponible
document.addEventListener('DOMContentLoaded', () => {
  const config = window.AGRO_CONFIG?.firebase;
  if (config && config.apiKey && !config.apiKey.includes('TU_API_KEY') && typeof firebase !== 'undefined') {
    if (!firebase.apps.length) firebase.initializeApp(config);
    
    firebase.firestore().collection('productos').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const items = [];
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent('agroCatalogUpdated', { detail: items }));
      }
    }, err => {
      console.warn("Snapshot listener offline/unauthorized, using local catalog.");
    });
  }
});
