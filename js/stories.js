// --- AGROGUARDATI - MÓDULO DE HISTORIAS / NOVEDADES 24HS (ESTILO INSTAGRAM/WHATSAPP) ---

const STORIES_KEY = 'agroguardati_stories_v1';

const DEFAULT_STORIES = [
  {
    id: 'story_init_1',
    tipo: 'image',
    url: 'https://res.cloudinary.com/pfskomq5/image/upload/v1786402390/ppkewsxmkf0uwqi1tn7g.jpg',
    caption: '¡Nuevos ingresos de maquinarias en Agroguardati! Consultá disponibilidad.',
    fecha: Date.now(),
    expira: Date.now() + (24 * 60 * 60 * 1000)
  }
];

// 1. Obtener historias activas (menos de 24hs de antigüedad)
window.getAgroStories = function() {
  const localData = localStorage.getItem(STORIES_KEY);
  let stories = [];
  if (localData) {
    try {
      stories = JSON.parse(localData);
    } catch (e) {
      console.error("Error leyendo historias locales:", e);
    }
  }

  const now = Date.now();
  let active = stories.filter(s => s && s.expira > now);

  if (active.length === 0) {
    active = DEFAULT_STORIES;
    localStorage.setItem(STORIES_KEY, JSON.stringify(active));
  } else if (active.length !== stories.length) {
    localStorage.setItem(STORIES_KEY, JSON.stringify(active));
  }

  return active;
};

// 2. Guardar nueva historia (Foto o Video)
window.saveAgroStory = async function(storyData) {
  return await window.saveAgroStoriesBatch([storyData]);
};

// 2b. Guardar lote de historias (Subida Masiva)
window.saveAgroStoriesBatch = async function(storiesArray) {
  if (!Array.isArray(storiesArray) || storiesArray.length === 0) return [];

  let stories = window.getAgroStories();
  const now = Date.now();
  const formattedNewStories = storiesArray.map((st, idx) => ({
    id: st.id || 'story_' + (now + idx) + '_' + Math.floor(Math.random() * 1000),
    tipo: st.tipo || 'image',
    url: st.url,
    public_id: st.public_id || '',
    caption: st.caption || '',
    fecha: now,
    expira: now + (24 * 60 * 60 * 1000)
  }));

  stories = [...formattedNewStories, ...stories];
  localStorage.setItem(STORIES_KEY, JSON.stringify(stories));

  // Guardar en Firestore si está disponible
  if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    try {
      const batch = firebase.firestore().batch();
      formattedNewStories.forEach(st => {
        const ref = firebase.firestore().collection('historias').doc(st.id);
        batch.set(ref, st);
      });
      await batch.commit();
    } catch (err) {
      console.warn("Firestore stories batch save fallback:", err.message);
    }
  }

  window.dispatchEvent(new CustomEvent('agroStoriesUpdated', { detail: stories }));
  return formattedNewStories;
};

// 3. Renderizar barra de historias en la web
function renderStoriesBar() {
  const container = document.getElementById('stories-container');
  if (!container) return;

  const stories = window.getAgroStories();
  container.innerHTML = '';

  if (stories.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';

  const wrapper = document.createElement('div');
  wrapper.className = 'story-avatar-wrapper';
  wrapper.onclick = () => openStoryViewer(0);

  const thumbUrl = stories[0].tipo === 'video' ? 'AGLOGOCIRC.png' : stories[0].url;

  wrapper.innerHTML = `
    <div class="story-ring">
      <img src="${thumbUrl}" class="story-avatar-img">
    </div>
    <span class="story-avatar-label">Novedades (24h)</span>
  `;

  container.appendChild(wrapper);
}

// 4. Visor interactivo a pantalla completa
let currentStoryIndex = 0;
let storyTimer = null;

function openStoryViewer(index = 0) {
  const stories = window.getAgroStories();
  if (stories.length === 0) return;

  currentStoryIndex = index;
  let modal = document.getElementById('agro-story-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'agro-story-modal';
    modal.innerHTML = `
      <div class="story-modal-overlay">
        <div class="story-modal-card">
          <!-- Barras de progreso -->
          <div id="story-progress-bars" class="story-progress-container"></div>

          <!-- Header -->
          <div class="story-modal-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="AGLOGOCIRC.png" style="width: 32px; height: 32px; border-radius: 50%;">
              <span style="color: white; font-weight: 700; font-size: 0.9rem;">Agroguardati Novedades</span>
            </div>
            <button id="story-close-btn" class="story-close-btn">&times;</button>
          </div>

          <!-- Contenido Media -->
          <div id="story-media-content" class="story-media-box"></div>

          <!-- Pie de foto -->
          <div id="story-caption" class="story-caption-box"></div>

          <!-- Navegación por tap/click -->
          <div class="story-nav-left" onclick="prevStory()"></div>
          <div class="story-nav-right" onclick="nextStory()"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('story-close-btn').onclick = closeStoryViewer;
  }

  modal.style.display = 'flex';
  showStorySlide(currentStoryIndex);
}

function showStorySlide(index) {
  const stories = window.getAgroStories();
  if (index < 0 || index >= stories.length) {
    closeStoryViewer();
    return;
  }

  currentStoryIndex = index;
  const item = stories[index];

  const barsContainer = document.getElementById('story-progress-bars');
  barsContainer.innerHTML = '';
  stories.forEach((_, i) => {
    const bar = document.createElement('div');
    bar.className = `story-progress-bar ${i < index ? 'completed' : i === index ? 'active' : ''}`;
    barsContainer.appendChild(bar);
  });

  const mediaBox = document.getElementById('story-media-content');
  mediaBox.innerHTML = '';

  if (item.tipo === 'video' || item.url.includes('.mp4') || item.url.includes('.mov')) {
    const video = document.createElement('video');
    video.src = item.url;
    video.autoplay = true;
    video.playsInline = true;
    video.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';
    video.onended = () => nextStory();
    mediaBox.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.url;
    img.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';
    mediaBox.appendChild(img);

    if (storyTimer) clearTimeout(storyTimer);
    storyTimer = setTimeout(() => nextStory(), 5000);
  }

  const captionEl = document.getElementById('story-caption');
  if (item.caption) {
    captionEl.textContent = item.caption;
    captionEl.style.display = 'block';
  } else {
    captionEl.style.display = 'none';
  }
}

window.nextStory = function() {
  const stories = window.getAgroStories();
  if (currentStoryIndex + 1 < stories.length) {
    showStorySlide(currentStoryIndex + 1);
  } else {
    closeStoryViewer();
  }
};

window.prevStory = function() {
  if (currentStoryIndex > 0) {
    showStorySlide(currentStoryIndex - 1);
  }
};

function closeStoryViewer() {
  if (storyTimer) clearTimeout(storyTimer);
  const modal = document.getElementById('agro-story-modal');
  if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  renderStoriesBar();

  if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    firebase.firestore().collection('historias').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const stories = [];
        const now = Date.now();
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.expira > now) stories.push(data);
        });
        localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
        renderStoriesBar();
      }
    }, () => {});
  }
});

window.addEventListener('agroStoriesUpdated', renderStoriesBar);
