/**
 * AGROGUARDATI - Gestor de Datos de Galería Multimedia y Micro-Secciones
 * Soporta fotos, videos subidos y videos de YouTube con persistencia en localStorage y Firestore.
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
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder de YouTube con ID de ejemplo
      youtubeId: 'L_LUpnjgPso', // Video demostrativo agro
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
    // Guardar por defecto
    localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(DEFAULT_SECCIONES));
    return DEFAULT_SECCIONES;
  }

  // --- GUARDAR SECCION ---
  function saveGaleriaSeccion(seccion) {
    const secciones = getGaleriaSecciones();
    const existingIndex = secciones.findIndex(s => s.id === seccion.id);
    
    if (!seccion.id) {
      seccion.id = 'sec_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }
    if (!seccion.icono) seccion.icono = 'fa-folder';

    if (existingIndex >= 0) {
      secciones[existingIndex] = { ...secciones[existingIndex], ...seccion };
    } else {
      seccion.orden = secciones.length + 1;
      secciones.push(seccion);
    }

    localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(secciones));

    // Sincronizar con Firestore si está disponible
    if (window.firebase && firebase.apps.length) {
      try {
        const db = firebase.firestore();
        db.collection('galeria_secciones').doc(seccion.id).set(seccion, { merge: true }).catch(err => {
          console.warn('Firestore sync error for section:', err);
        });
      } catch (err) {
        console.warn('Firestore err:', err);
      }
    }

    return seccion;
  }

  // --- ELIMINAR SECCION ---
  function deleteGaleriaSeccion(seccionId) {
    let secciones = getGaleriaSecciones();
    secciones = secciones.filter(s => s.id !== seccionId);
    localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(secciones));

    if (window.firebase && firebase.apps.length) {
      try {
        const db = firebase.firestore();
        db.collection('galeria_secciones').doc(seccionId).delete().catch(console.warn);
      } catch (err) {
        console.warn(err);
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
        localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(DEFAULT_ITEMS));
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
  function saveGaleriaItem(item) {
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
      items.unshift(item); // Al inicio para que aparezca primero
    }

    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));

    // Sincronizar con Firestore si está disponible
    if (window.firebase && firebase.apps.length) {
      try {
        const db = firebase.firestore();
        db.collection('galeria_items').doc(item.id).set(item, { merge: true }).catch(err => {
          console.warn('Firestore sync error for galeria item:', err);
        });
      } catch (err) {
        console.warn('Firestore error:', err);
      }
    }

    return item;
  }

  // --- ELIMINAR ITEM MULTIMEDIA ---
  function deleteGaleriaItem(itemId) {
    let items = getGaleriaItems();
    items = items.filter(i => i.id !== itemId);
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));

    if (window.firebase && firebase.apps.length) {
      try {
        const db = firebase.firestore();
        db.collection('galeria_items').doc(itemId).delete().catch(console.warn);
      } catch (err) {
        console.warn(err);
      }
    }
    return true;
  }

  // Cargar desde Firestore en background si hay conexión
  function syncFromFirestore() {
    if (!window.firebase || !firebase.apps.length) return;
    try {
      const db = firebase.firestore();
      
      // Sincronizar secciones
      db.collection('galeria_secciones').get().then(snapshot => {
        if (!snapshot.empty) {
          const remoteSecs = [];
          snapshot.forEach(doc => remoteSecs.push(doc.data()));
          if (remoteSecs.length > 0) {
            localStorage.setItem(STORAGE_KEY_SECCIONES, JSON.stringify(remoteSecs));
            if (window.onGaleriaDataChanged) window.onGaleriaDataChanged();
          }
        }
      }).catch(console.warn);

      // Sincronizar items
      db.collection('galeria_items').get().then(snapshot => {
        if (!snapshot.empty) {
          const remoteItems = [];
          snapshot.forEach(doc => remoteItems.push(doc.data()));
          if (remoteItems.length > 0) {
            localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(remoteItems));
            if (window.onGaleriaDataChanged) window.onGaleriaDataChanged();
          }
        }
      }).catch(console.warn);
    } catch (err) {
      console.warn('Firestore auto-sync error:', err);
    }
  }

  // Exportar al objeto global window
  window.AgroGaleriaStore = {
    getSecciones: getGaleriaSecciones,
    saveSeccion: saveGaleriaSeccion,
    deleteSeccion: deleteGaleriaSeccion,
    getItems: getGaleriaItems,
    saveItem: saveGaleriaItem,
    deleteItem: deleteGaleriaItem,
    extractYouTubeId: extractYouTubeId,
    getYouTubeThumbnail: getYouTubeThumbnail,
    syncFromFirestore: syncFromFirestore
  };

  // Inicializar sincronización si Firebase está presente
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(syncFromFirestore, 1500);
  });
})();
