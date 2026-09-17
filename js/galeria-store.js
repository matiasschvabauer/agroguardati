/**
 * AGROGUARDATI - Gestor de Datos de Galería Multimedia y Micro-Secciones
 * Soporta fotos, videos subidos y videos de YouTube con persistencia en localStorage y Firestore en tiempo real.
 */

(function () {
  const STORAGE_KEY_ITEMS = 'agro_galeria_items_v5';
  const STORAGE_KEY_SECCIONES = 'agro_galeria_secciones_v5';
  const STORAGE_KEY_DELETED_ITEMS = 'agro_galeria_deleted_ids_v5';
  const STORAGE_KEY_DELETED_SECCIONES = 'agro_galeria_deleted_sec_ids_v5';

  // Micro-secciones iniciales por defecto
  const DEFAULT_SECCIONES = [
    {
      id: 'historia',
      nombre: 'Historia',
      descripcion: 'Nuestros orígenes, evolución y momentos clave a lo largo de más de dos décadas.',
      icono: 'fa-landmark',
      orden: 1
    },
    {
      id: 'entregas',
      nombre: 'Entregas y Clientes',
      descripcion: 'Acompañando a productores de todo el país en cada entrega de maquinaria.',
      icono: 'fa-truck-loading',
      orden: 2
    },
    {
      id: 'campo',
      nombre: 'Maquinaria en Acción',
      descripcion: 'Equipos y tecnología agrícola trabajando en pleno campo argentino.',
      icono: 'fa-tractor',
      orden: 3
    },
    {
      id: 'instalaciones',
      nombre: 'Instalaciones y Taller',
      descripcion: 'Nuestra casa central, taller especializado y sector de repuestos en Gálvez, Santa Fe.',
      icono: 'fa-tools',
      orden: 4
    }
  ];

  // La galería inicia limpia
  const DEFAULT_ITEMS = [];

  // Limpieza de claves obsoletas
  try {
    ['agro_galeria_items', 'agro_galeria_items_v2', 'agro_galeria_items_v3'].forEach(k => {
      localStorage.removeItem(k);
    });
  } catch (e) {}

  // Helper para inicializar Firebase Firestore de forma segura
  function getFirestoreDb() {
    try {
      const config = window.AGRO_CONFIG?.firebase;
      if (config && config.apiKey && !config.apiKey.includes('TU_API_KEY') && typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
          try {
            firebase.initializeApp(config);
          } catch (e) {
            console.warn('Firebase init in galeria-store:', e);
          }
        }
        return firebase.firestore();
      }
    } catch (err) {
      console.warn('Firestore not reachable:', err);
    }
    return null;
  }

  // Helper para IDs eliminados
  function getDeletedItemIds() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DELETED_ITEMS);
      return new Set(raw ? JSON.parse(raw).map(String) : []);
    } catch (e) {
      return new Set();
    }
  }

  function addDeletedItemId(id) {
    const set = getDeletedItemIds();
    set.add(String(id));
    try {
      localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, JSON.stringify([...set]));
    } catch (e) {}
  }

  function removeDeletedItemId(id) {
    const set = getDeletedItemIds();
    if (set.has(String(id))) {
      set.delete(String(id));
      try {
        localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, JSON.stringify([...set]));
      } catch (e) {}
    }
  }

  function getDeletedSeccionIds() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DELETED_SECCIONES);
      return new Set(raw ? JSON.parse(raw).map(String) : []);
    } catch (e) {
      return new Set();
    }
  }

  function addDeletedSeccionId(id) {
    const set = getDeletedSeccionIds();
    set.add(String(id));
    try {
      localStorage.setItem(STORAGE_KEY_DELETED_SECCIONES, JSON.stringify([...set]));
    } catch (e) {}
  }

  // Helper para extraer ID de YouTube
  function extractYouTubeId(url) {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  function getYouTubeThumbnail(videoId) {
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  // --- OBTENER SECCIONES ---
  function getGaleriaSecciones() {
    const deletedSecIds = getDeletedSeccionIds();
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SECCIONES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(s => s && !s._deleted && !deletedSecIds.has(String(s.id)));
        }
      }
    } catch (e) {
      console.warn('Error reading galeria_secciones from localStorage', e);
    }
    return DEFAULT_SECCIONES.filter(s => !deletedSecIds.has(String(s.id)));
  }

  // --- GUARDAR SECCION ---
  async function saveGaleriaSeccion(seccion) {
    const secciones = getGaleriaSecciones();
    if (!seccion.id) {
      seccion.id = 'sec_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }
    if (!seccion.icono) seccion.icono = 'fa-folder';
    seccion._deleted = false;
    seccion._updatedAt = Date.now();

    const existingIndex = secciones.findIndex(s => String(s.id) === String(seccion.id));
    if (existingIndex >= 0) {
      secciones[existingIndex] = { ...secciones[existingIndex], ...seccion };
    } else {
      seccion.orden = secciones.length + 1;
      secciones.push(seccion);
    }

    try {
      localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(secciones));
    } catch (e) {}

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_secciones').doc(seccion.id).set(seccion, { merge: true });
      } catch (err) {
        console.warn('Firestore sync error for section (saved locally):', err);
      }
    }

    if (typeof window.onGaleriaDataChanged === 'function') {
      window.onGaleriaDataChanged();
    }

    return seccion;
  }

  // --- ELIMINAR SECCION ---
  async function deleteGaleriaSeccion(seccionId) {
    const idStr = String(seccionId);
    addDeletedSeccionId(idStr);

    let secciones = getGaleriaSecciones();
    secciones = secciones.filter(s => String(s.id) !== idStr);
    try {
      localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(secciones));
    } catch (e) {}

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_secciones').doc(idStr).set({ id: idStr, _deleted: true, _updatedAt: Date.now() }, { merge: true });
        console.log('✔ Sección marcada como eliminada en Firestore:', idStr);
      } catch (err) {
        console.warn('Firestore delete section error (deleted locally):', err);
      }
    }

    if (typeof window.onGaleriaDataChanged === 'function') {
      window.onGaleriaDataChanged();
    }

    return true;
  }

  // --- OBTENER ITEMS MULTIMEDIA ---
  function getGaleriaItems(seccionFiltro, tipoFiltro) {
    const deletedIds = getDeletedItemIds();
    let items = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          items = parsed.filter(i => i && !i._deleted && !deletedIds.has(String(i.id)) && !/^gal_0[1-6]$/.test(String(i.id)));
        }
      }
    } catch (e) {
      items = [];
    }

    // Filtros
    if (seccionFiltro && seccionFiltro !== 'todas') {
      items = items.filter(i => i.seccionId === seccionFiltro);
    }
    if (tipoFiltro && tipoFiltro !== 'todos') {
      items = items.filter(i => i.tipo === tipoFiltro);
    }

    return items;
  }

  // --- GUARDAR ITEM MULTIMEDIA ---
  async function saveGaleriaItem(item) {
    const items = getGaleriaItems();
    if (!item.id) {
      item.id = 'gal_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }
    if (!item.fecha) {
      item.fecha = new Date().getFullYear().toString();
    }
    if (item.tipo === 'youtube') {
      const yId = extractYouTubeId(item.url);
      item.youtubeId = yId || item.youtubeId || '';
      if (!item.thumbnail && yId) {
        item.thumbnail = getYouTubeThumbnail(yId);
      }
    }
    item._deleted = false;
    item._updatedAt = Date.now();
    removeDeletedItemId(item.id);

    const existingIndex = items.findIndex(i => String(i.id) === String(item.id));
    if (existingIndex >= 0) {
      items[existingIndex] = { ...items[existingIndex], ...item };
    } else {
      items.unshift(item);
    }

    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {}

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_items').doc(item.id).set(item, { merge: true });
        console.log('✔ Item guardado en Firestore:', item.id);
      } catch (err) {
        console.warn('Firestore error saving galeria item (saved locally):', err);
      }
    }

    if (typeof window.onGaleriaDataChanged === 'function') {
      window.onGaleriaDataChanged();
    }

    return item;
  }

  // --- ELIMINAR ITEM MULTIMEDIA ---
  async function deleteGaleriaItem(itemId) {
    const idStr = String(itemId);
    addDeletedItemId(idStr);

    let items = getGaleriaItems();
    items = items.filter(i => String(i.id) !== idStr);
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {}

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_items').doc(idStr).set({ id: idStr, _deleted: true, _updatedAt: Date.now() }, { merge: true });
        console.log('✔ Item marcado como eliminado en Firestore:', idStr);
      } catch (err) {
        console.warn('Firestore delete galeria item error (deleted locally):', err);
      }
    }

    if (typeof window.onGaleriaDataChanged === 'function') {
      window.onGaleriaDataChanged();
    }

    return true;
  }

  // Cargar y sincronizar en tiempo real desde Firestore con fusión inteligente (sin borrar items locales)
  function startRealtimeSync() {
    const db = getFirestoreDb();
    if (!db) return;

    try {
      // 1. Sincronizar secciones
      db.collection('galeria_secciones').onSnapshot((snapshot) => {
        const deletedSecIds = getDeletedSeccionIds();
        const remoteSecsMap = new Map();

        if (snapshot && !snapshot.empty) {
          snapshot.forEach(doc => {
            const data = doc.data();
            const id = String(doc.id);
            if (data._deleted === true || data._deleted === 'true') {
              addDeletedSeccionId(id);
              deletedSecIds.add(id);
            } else {
              remoteSecsMap.set(id, { id, ...data });
            }
          });
        }

        // Obtener secciones actuales en localStorage
        let localSecs = [];
        try {
          const raw = localStorage.getItem(STORAGE_KEY_SECCIONES);
          if (raw) localSecs = JSON.parse(raw) || [];
        } catch (e) {}

        // Combinar: secciones remotas + secciones locales no enviadas + secciones por defecto
        const combinedSecs = [];
        const processedSecIds = new Set();

        // Remotas activas
        remoteSecsMap.forEach((sec, id) => {
          if (!deletedSecIds.has(id)) {
            combinedSecs.push(sec);
            processedSecIds.add(id);
          }
        });

        // Locales pendientes de sincronizar
        localSecs.forEach(sec => {
          const id = String(sec.id);
          if (!processedSecIds.has(id) && !deletedSecIds.has(id) && !sec._deleted) {
            combinedSecs.push(sec);
            processedSecIds.add(id);
            // Auto-subir a Firestore
            try {
              db.collection('galeria_secciones').doc(id).set(sec, { merge: true });
            } catch (e) {}
          }
        });

        // Secciones por defecto
        DEFAULT_SECCIONES.forEach(sec => {
          const id = String(sec.id);
          if (!processedSecIds.has(id) && !deletedSecIds.has(id)) {
            combinedSecs.push(sec);
            processedSecIds.add(id);
          }
        });

        combinedSecs.sort((a, b) => (a.orden || 99) - (b.orden || 99));
        try {
          localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(combinedSecs));
        } catch (e) {}

        if (typeof window.onGaleriaDataChanged === 'function') {
          window.onGaleriaDataChanged();
        }
      }, err => {
        console.warn('Firestore galeria_secciones onSnapshot error:', err);
      });

      // 2. Sincronizar items
      db.collection('galeria_items').onSnapshot((snapshot) => {
        const deletedIds = getDeletedItemIds();
        const remoteItemsMap = new Map();

        if (snapshot && !snapshot.empty) {
          snapshot.forEach(doc => {
            const data = doc.data();
            const id = String(doc.id);
            if (/^gal_0[1-6]$/.test(id)) {
              addDeletedItemId(id);
              deletedIds.add(id);
              return;
            }

            if (data._deleted === true || data._deleted === 'true') {
              addDeletedItemId(id);
              deletedIds.add(id);
            } else {
              remoteItemsMap.set(id, { id, ...data });
            }
          });
        }

        // Obtener items actuales en localStorage
        let localItems = [];
        try {
          const raw = localStorage.getItem(STORAGE_KEY_ITEMS);
          if (raw) localItems = JSON.parse(raw) || [];
        } catch (e) {}

        const combinedItems = [];
        const processedItemIds = new Set();

        // 1. Añadir items remotos que no estén eliminados
        remoteItemsMap.forEach((item, id) => {
          if (!deletedIds.has(id) && !item._deleted) {
            combinedItems.push(item);
            processedItemIds.add(id);
          }
        });

        // 2. Añadir items creados en este navegador que aún no llegaron al snapshot de Firestore
        localItems.forEach(item => {
          const id = String(item.id);
          if (!processedItemIds.has(id) && !deletedIds.has(id) && !item._deleted && !/^gal_0[1-6]$/.test(id)) {
            combinedItems.push(item);
            processedItemIds.add(id);
            // Auto-subir a Firestore
            try {
              db.collection('galeria_items').doc(id).set(item, { merge: true });
              console.log('✔ Auto-sincronizado item local a Firestore:', id);
            } catch (e) {}
          }
        });

        try {
          localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(combinedItems));
        } catch (e) {}

        if (typeof window.onGaleriaDataChanged === 'function') {
          window.onGaleriaDataChanged();
        }
      }, err => {
        console.warn('Firestore galeria_items onSnapshot error:', err);
      });
    } catch (e) {
      console.warn('startRealtimeSync connection error:', e);
    }
  }

  function getItemById(id) {
    const items = getGaleriaItems();
    return items.find(i => String(i.id) === String(id)) || null;
  }

  // Exportar al objeto global window
  window.AgroGaleriaStore = {
    getSecciones: getGaleriaSecciones,
    getMicroSecciones: getGaleriaSecciones,
    saveSeccion: saveGaleriaSeccion,
    saveMicroSeccion: saveGaleriaSeccion,
    deleteSeccion: deleteGaleriaSeccion,
    deleteMicroSeccion: deleteGaleriaSeccion,
    getItems: getGaleriaItems,
    getItemById: getItemById,
    saveItem: saveGaleriaItem,
    deleteItem: deleteGaleriaItem,
    extractYouTubeId: extractYouTubeId,
    getYouTubeThumbnail: getYouTubeThumbnail,
    syncFromFirestore: startRealtimeSync
  };

  // Inicializar sincronización inmediata
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startRealtimeSync);
  } else {
    startRealtimeSync();
  }
})();
