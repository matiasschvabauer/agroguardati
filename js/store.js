// --- AGROGUARDATI - GESTOR REACTIVO DE CATÁLOGO Y AUTENTICACIÓN ---

const STORAGE_KEY = 'agroguardati_catalog_v2';
window.AGRO_ADMIN_EMAILS = ['matiasschvabauer@gmail.com', 'guillermoguardati@gmail.com', 'Lucioguardati1@gmail.com'];

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

// Función auxiliar para fusionar Firestore con el catálogo base (data.js) y auto-sincronizar creados en local
window.mergeCatalogData = function(firestoreItems) {
  const initial = typeof catalogo !== 'undefined' ? catalogo : [];
  const fsMap = new Map();

  firestoreItems.forEach(item => {
    fsMap.set(String(item.id), item);
  });

  // Detectar productos creados previamente en localStorage que aún no llegaron a Firestore
  const localData = localStorage.getItem(STORAGE_KEY);
  let unsyncedLocalItems = [];
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed)) {
        unsyncedLocalItems = parsed.filter(item => {
          const idStr = String(item.id);
          const isBase = initial.some(b => String(b.id) === idStr);
          const isFs = fsMap.has(idStr);
          return !isBase && !isFs && !item._deleted;
        });
      }
    } catch (e) {}
  }

  // Auto-subir a Firestore los productos locales pendientes
  if (unsyncedLocalItems.length > 0 && typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    const db = firebase.firestore();
    unsyncedLocalItems.forEach(async (item) => {
      try {
        await db.collection('productos').doc(String(item.id)).set(item, { merge: true });
        console.log("✔ Auto-sincronizado producto local a la nube Firestore:", item.id);
      } catch (err) {
        console.warn("Auto-sync Firestore fallback:", err.message);
      }
    });
  }

  // Productos nuevos en Firestore que no son de data.js
  const newFirestoreItems = firestoreItems.filter(item => {
    const isBase = initial.some(b => String(b.id) === String(item.id));
    return !isBase && !item._deleted;
  });

  // Combinar los pendientes locales + los nuevos de Firestore
  const combinedNewItems = [...unsyncedLocalItems];
  newFirestoreItems.forEach(newItem => {
    if (!combinedNewItems.some(c => String(c.id) === String(newItem.id))) {
      combinedNewItems.push(newItem);
    }
  });

  // Productos base de data.js con sus modificaciones o borrados
  const mergedBase = initial.filter(baseItem => {
    const fsItem = fsMap.get(String(baseItem.id));
    return !fsItem || !fsItem._deleted;
  }).map(baseItem => {
    const fsItem = fsMap.get(String(baseItem.id));
    return fsItem ? { ...baseItem, ...fsItem } : baseItem;
  });

  return [...combinedNewItems, ...mergedBase];
};

// 2. Guardar o actualizar un producto (Ediciones o Nuevos)
window.saveAgroProduct = async function(productData) {
  let catalog = window.getAgroCatalog();

  if (!productData.id) {
    productData.id = Date.now();
  }

  // Eliminar marca de borrado si existía
  delete productData._deleted;

  const index = catalog.findIndex(p => String(p.id) === String(productData.id));
  if (index !== -1) {
    catalog[index] = { ...catalog[index], ...productData };
  } else {
    catalog.unshift(productData);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));

  if (typeof firebase !== 'undefined') {
    const config = window.AGRO_CONFIG?.firebase;
    if (config && config.apiKey && !config.apiKey.includes('TU_API_KEY') && !firebase.apps.length) {
      firebase.initializeApp(config);
    }
    if (firebase.apps.length > 0) {
      try {
        const db = firebase.firestore();
        await db.collection('productos').doc(String(productData.id)).set(productData, { merge: true });
        console.log("✔ Producto guardado/editado exitosamente en Firestore:", productData.id);
      } catch (err) {
        console.error("❌ Error guardando en Firestore:", err.message);
        alert("⚠️ Atención: El producto se guardó localmente en este navegador, pero NO se pudo sincronizar en la nube (Firestore).\n\nDetalle: " + err.message + "\n\nAsegúrate de haber iniciado sesión con Google en la sección de administración.");
      }
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

  if (typeof firebase !== 'undefined') {
    const config = window.AGRO_CONFIG?.firebase;
    if (config && config.apiKey && !config.apiKey.includes('TU_API_KEY') && !firebase.apps.length) {
      firebase.initializeApp(config);
    }
    if (firebase.apps.length > 0) {
      try {
        const db = firebase.firestore();
        await db.collection('productos').doc(String(id)).set({ id: String(id), _deleted: true }, { merge: true });
        console.log("✔ Producto marcado como eliminado en Firestore:", id);
      } catch (err) {
        console.error("❌ Error eliminando de Firestore:", err.message);
        alert("⚠️ Atención: El producto se eliminó localmente, pero ocurrió un error al eliminarlo en la nube (Firestore): " + err.message);
      }
    }
  }

  window.dispatchEvent(new CustomEvent('agroCatalogUpdated', { detail: catalog }));
  return true;
};

// 4. Verificar si hay sesión admin iniciada
window.isAgroAdmin = function() {
  const emails = window.AGRO_CONFIG?.adminEmails || window.AGRO_ADMIN_EMAILS || ['matiasschvabauer@gmail.com', 'guillermoguardati@gmail.com', 'Lucioguardati1@gmail.com'];
  if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    const user = firebase.auth().currentUser;
    if (user && user.email && emails.some(e => e.toLowerCase() === user.email.toLowerCase())) {
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

// Sincronizar catálogo inicial desde Firestore si está disponible (con fusión inteligente)
document.addEventListener('DOMContentLoaded', () => {
  const config = window.AGRO_CONFIG?.firebase;
  if (config && config.apiKey && !config.apiKey.includes('TU_API_KEY') && typeof firebase !== 'undefined') {
    if (!firebase.apps.length) firebase.initializeApp(config);
    
    firebase.firestore().collection('productos').onSnapshot(snapshot => {
      const fsItems = [];
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          fsItems.push({ id: doc.id, ...doc.data() });
        });
      }
      const mergedCatalog = window.mergeCatalogData(fsItems);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedCatalog));
      window.dispatchEvent(new CustomEvent('agroCatalogUpdated', { detail: mergedCatalog }));
    }, err => {
      console.warn("Snapshot listener offline/unauthorized, usando catálogo local.");
    });
  }
});
