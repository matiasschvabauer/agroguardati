/**
 * AGROGUARDATI - Gestor de Datos de Galería Multimedia y Micro-Secciones
 * Soporta fotos, videos subidos y videos de YouTube con persistencia en localStorage y Firestore en tiempo real.
 */

(function () {
  const STORAGE_KEY_ITEMS = 'agro_galeria_items';
  const STORAGE_KEY_SECCIONES = 'agro_galeria_secciones';

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

  // Elementos iniciales multimedia por defecto
  const DEFAULT_ITEMS = [
    {
      id: 'gal_01',
      seccionId: 'historia',
      tipo: 'foto',
      url: 'https://res.cloudinary.com/pfskomq5/image/upload/v1786455504/ndmgt78pqca9fihxfu1e.jpg',
      titulo: 'Los primeros pasos en Gálvez',
      descripcion: 'Desde nuestros comienzos en Gálvez, Santa Fe, forjando el compromiso familiar con los productores agrícolas.',
      fecha: '2004',
      destacado: true
    },
    {
      id: 'gal_02',
      seccionId: 'historia',
      tipo: 'foto',
      url: 'https://res.cloudinary.com/pfskomq5/image/upload/v1786455490/pczrxfd4vghf5q9l1szo.jpg',
      titulo: 'Evolución y ampliación de stock',
      descripcion: 'Incorporando las principales marcas nacionales e internacionales para dar respuesta a cada necesidad.',
      fecha: '2012',
      destacado: false
    },
    {
      id: 'gal_03',
      seccionId: 'entregas',
      tipo: 'foto',
      url: 'https://res.cloudinary.com/pfskomq5/image/upload/v1786455485/mwptzk2xqyrd6h8n9abc.jpg',
      titulo: 'Entrega de equipo listo para sembrar',
      descripcion: 'Puesta en marcha y entrega directa en el campo para la nueva campaña.',
      fecha: '2024',
      destacado: true
    },
    {
      id: 'gal_04',
      seccionId: 'campo',
      tipo: 'foto',
      url: 'https://res.cloudinary.com/pfskomq5/image/upload/v1786455498/agv789qwertyluiop123.jpg',
      titulo: 'Cosecha de alto rendimiento',
      descripcion: 'Maquinaria pesada trabajando en rastrojos y cosechas de gran volumen.',
      fecha: '2024',
      destacado: true
    },
    {
      id: 'gal_05',
      seccionId: 'campo',
      tipo: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtubeId: 'L_LUpnjgPso',
      titulo: 'Demostración de maquinaria agrícola en el campo',
      descripcion: 'Test drive y desempeño de equipos trabajando en condiciones reales de suelo.',
      fecha: '2024',
      destacado: true
    },
    {
      id: 'gal_06',
      seccionId: 'instalaciones',
      tipo: 'foto',
      url: 'https://res.cloudinary.com/pfskomq5/image/upload/v1786455470/taller_repuestos_central.jpg',
      titulo: 'Taller de servicio técnico especializado',
      descripcion: 'Equipo de mecánicos certificados y banco de pruebas para mantenimiento preventivo y correctivo.',
      fecha: '2023',
      destacado: false
    }
  ];

  // Helper para inicializar Firebase Firestore
  function getFirestoreDb() {
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
    return null;
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
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SECCIONES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading galeria_secciones from localStorage', e);
    }
    return DEFAULT_SECCIONES;
  }

  // --- GUARDAR SECCION ---
  async function saveGaleriaSeccion(seccion) {
    const secciones = getGaleriaSecciones();
    if (!seccion.id) {
      seccion.id = 'sec_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }
    if (!seccion.icono) seccion.icono = 'fa-folder';

    const existingIndex = secciones.findIndex(s => s.id === seccion.id);
    if (existingIndex >= 0) {
      secciones[existingIndex] = { ...secciones[existingIndex], ...seccion };
    } else {
      seccion.orden = secciones.length + 1;
      secciones.push(seccion);
    }

    localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(secciones));

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_secciones').doc(seccion.id).set(seccion, { merge: true });
      } catch (err) {
        console.warn('Firestore sync error for section:', err);
      }
    }

    return seccion;
  }

  // --- ELIMINAR SECCION ---
  async function deleteGaleriaSeccion(seccionId) {
    let secciones = getGaleriaSecciones();
    secciones = secciones.filter(s => s.id !== seccionId);
    localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(secciones));

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_secciones').doc(seccionId).delete();
      } catch (err) {
        console.warn('Firestore delete section error:', err);
      }
    }
    return true;
  }

  // --- OBTENER ITEMS MULTIMEDIA ---
  function getGaleriaItems(seccionFiltro, tipoFiltro) {
    let items = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (stored) {
        items = JSON.parse(stored);
      } else {
        items = DEFAULT_ITEMS;
      }
    } catch (e) {
      items = DEFAULT_ITEMS;
    }

    if (!Array.isArray(items)) items = DEFAULT_ITEMS;

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

    const existingIndex = items.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      items[existingIndex] = { ...items[existingIndex], ...item };
    } else {
      items.unshift(item);
    }

    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_items').doc(item.id).set(item, { merge: true });
      } catch (err) {
        console.warn('Firestore error saving galeria item:', err);
      }
    }

    return item;
  }

  // --- ELIMINAR ITEM MULTIMEDIA ---
  async function deleteGaleriaItem(itemId) {
    let items = getGaleriaItems();
    items = items.filter(i => i.id !== itemId);
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));

    const db = getFirestoreDb();
    if (db) {
      try {
        await db.collection('galeria_items').doc(itemId).delete();
      } catch (err) {
        console.warn('Firestore delete galeria item error:', err);
      }
    }
    return true;
  }

  // Cargar y sincronizar en tiempo real desde Firestore
  function startRealtimeSync() {
    const db = getFirestoreDb();
    if (!db) return;

    // Sincronizar secciones en tiempo real
    db.collection('galeria_secciones').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const remoteSecs = [];
        snapshot.forEach(doc => {
          remoteSecs.push({ id: doc.id, ...doc.data() });
        });
        remoteSecs.sort((a, b) => (a.orden || 99) - (b.orden || 99));
        localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(remoteSecs));
        if (typeof window.onGaleriaDataChanged === 'function') {
          window.onGaleriaDataChanged();
        }
      }
    }, err => {
      console.warn('Firestore galeria_secciones onSnapshot error:', err);
    });

    // Sincronizar items en tiempo real
    db.collection('galeria_items').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const remoteItems = [];
        snapshot.forEach(doc => {
          remoteItems.push({ id: doc.id, ...doc.data() });
        });
        localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(remoteItems));
        if (typeof window.onGaleriaDataChanged === 'function') {
          window.onGaleriaDataChanged();
        }
      }
    }, err => {
      console.warn('Firestore galeria_items onSnapshot error:', err);
    });
  }

  function getItemById(id) {
    const items = getGaleriaItems();
    return items.find(i => i.id === id) || null;
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
