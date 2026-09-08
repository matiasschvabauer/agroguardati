// ============================================================================
// AGROGUARDATI - GENERADOR DINÁMICO DE CATÁLOGO COMPLETO EN PDF (CLIENT-SIDE)
// ============================================================================

(function () {
  let isGenerating = false;

  // --- 1. UI MODAL DE PROGRESO ---
  function getOrCreateProgressModal() {
    let modal = document.getElementById('agro-pdf-generator-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'agro-pdf-generator-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 999999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      `;

      modal.innerHTML = `
        <div style="
          background: #ffffff;
          border-radius: 20px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          text-align: center;
          animation: agroModalFadeIn 0.25s ease-out;
        ">
          <!-- Top Accent Bar -->
          <div style="display: flex; height: 6px; width: 100%;">
            <div style="background: #153f71; flex: 7;"></div>
            <div style="background: #d32f2f; flex: 3;"></div>
          </div>

          <div style="padding: 2.2rem 1.8rem 1.8rem;">
            <!-- Icon -->
            <div id="agro-pdf-modal-icon-wrap" style="
              width: 72px;
              height: 72px;
              background: #eff6ff;
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1.25rem;
              border: 2px solid #bfdbfe;
            ">
              <i id="agro-pdf-modal-icon" class="fas fa-file-pdf" style="font-size: 2.2rem; color: #d32f2f;"></i>
            </div>

            <!-- Titles -->
            <h3 id="agro-pdf-modal-title" style="
              font-size: 1.28rem;
              font-weight: 800;
              color: #0f172a;
              margin-bottom: 0.4rem;
            ">Generando Catálogo PDF</h3>

            <p id="agro-pdf-modal-desc" style="
              font-size: 0.88rem;
              color: #64748b;
              margin-bottom: 1.5rem;
              line-height: 1.45;
            ">Recopilando maquinarias activas y optimizando imágenes en tiempo real...</p>

            <!-- Progress Info -->
            <div style="display: flex; justify-content: space-between; font-size: 0.84rem; font-weight: 700; color: #334155; margin-bottom: 8px;">
              <span id="agro-pdf-modal-status">Iniciando...</span>
              <span id="agro-pdf-modal-percent" style="color: #1d5497;">0%</span>
            </div>

            <!-- Progress Bar -->
            <div style="background: #e2e8f0; border-radius: 999px; height: 12px; overflow: hidden; margin-bottom: 1.25rem;">
              <div id="agro-pdf-modal-bar" style="
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, #1d5497, #2563eb);
                border-radius: 999px;
                transition: width 0.2s ease;
              "></div>
            </div>

            <p id="agro-pdf-modal-note" style="font-size: 0.76rem; color: #94a3b8; margin: 0;">
              Por favor aguarde unos instantes mientras se empaqueta el documento.
            </p>
          </div>
        </div>
      `;

      // CSS keyframes
      if (!document.getElementById('agro-pdf-keyframes')) {
        const style = document.createElement('style');
        style.id = 'agro-pdf-keyframes';
        style.textContent = `
          @keyframes agroModalFadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(modal);
    }
    return modal;
  }

  function updateModalProgress(percent, statusText, titleText) {
    const modal = getOrCreateProgressModal();
    modal.style.display = 'flex';

    const pct = Math.min(100, Math.max(0, Math.round(percent)));
    const barEl = document.getElementById('agro-pdf-modal-bar');
    const pctEl = document.getElementById('agro-pdf-modal-percent');
    const statusEl = document.getElementById('agro-pdf-modal-status');
    const titleEl = document.getElementById('agro-pdf-modal-title');

    if (barEl) barEl.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    if (statusEl && statusText) statusEl.textContent = statusText;
    if (titleEl && titleText) titleEl.textContent = titleText;
  }

  function setModalSuccess(titleText, statusText) {
    const iconWrap = document.getElementById('agro-pdf-modal-icon-wrap');
    const icon = document.getElementById('agro-pdf-modal-icon');
    const barEl = document.getElementById('agro-pdf-modal-bar');
    const pctEl = document.getElementById('agro-pdf-modal-percent');
    const statusEl = document.getElementById('agro-pdf-modal-status');
    const titleEl = document.getElementById('agro-pdf-modal-title');
    const descEl = document.getElementById('agro-pdf-modal-desc');

    if (iconWrap) {
      iconWrap.style.background = '#dcfce7';
      iconWrap.style.borderColor = '#86efac';
    }
    if (icon) {
      icon.className = 'fas fa-check-circle';
      icon.style.color = '#16a34a';
    }
    if (barEl) {
      barEl.style.width = '100%';
      barEl.style.background = '#16a34a';
    }
    if (pctEl) pctEl.textContent = '100%';
    if (statusEl) statusEl.textContent = statusText || '¡Descarga iniciada!';
    if (titleEl) titleEl.textContent = titleText || '¡Catálogo Generado!';
    if (descEl) descEl.textContent = 'El archivo PDF se ha generado con los productos activos al día de hoy.';
  }

  function hideProgressModal() {
    const modal = document.getElementById('agro-pdf-generator-modal');
    if (modal) {
      modal.style.display = 'none';
      // Reset icon
      const iconWrap = document.getElementById('agro-pdf-modal-icon-wrap');
      const icon = document.getElementById('agro-pdf-modal-icon');
      const barEl = document.getElementById('agro-pdf-modal-bar');
      if (iconWrap) {
        iconWrap.style.background = '#eff6ff';
        iconWrap.style.borderColor = '#bfdbfe';
      }
      if (icon) {
        icon.className = 'fas fa-file-pdf';
        icon.style.color = '#d32f2f';
      }
      if (barEl) {
        barEl.style.background = 'linear-gradient(90deg, #1d5497, #2563eb)';
      }
    }
  }

  // --- 2. CARGA Y OPTIMIZACIÓN DE IMÁGENES VIA CANVAS (BASE64) ---
  function loadImageAsDataUrl(url) {
    return new Promise((resolve) => {
      if (!url) return resolve(null);

      const img = new Image();
      img.crossOrigin = 'Anonymous';
      let done = false;

      const timeout = setTimeout(() => {
        if (!done) {
          done = true;
          resolve(null);
        }
      }, 3500);

      img.onload = () => {
        if (done) return;
        done = true;
        clearTimeout(timeout);

        try {
          const maxDim = 320;
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;
          if (!w || !h) return resolve(null);

          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
          resolve(dataUrl);
        } catch (err) {
          resolve(null);
        }
      };

      img.onerror = () => {
        if (done) return;
        done = true;
        clearTimeout(timeout);
        resolve(null);
      };

      img.src = url;
    });
  }

  // Cargar imágenes con concurrencia controlada
  async function loadAllImagesWithProgress(products, logoUrl, onProgress) {
    const total = products.length + 1;
    let loaded = 0;
    const imageMap = new Map();

    // 1. Logo
    let logoData = logoUrl || null;
    loaded++;
    if (onProgress) onProgress(loaded, total);

    // 2. Concurrency chunks of 8
    const chunkSize = 8;
    for (let i = 0; i < products.length; i += chunkSize) {
      const chunk = products.slice(i, i + chunkSize);
      await Promise.all(
        chunk.map(async (p) => {
          const url = p.imagen || (p.imagenes && p.imagenes[0]) || '';
          const dataUrl = await loadImageAsDataUrl(url);
          imageMap.set(p.id, dataUrl);
          loaded++;
          if (onProgress) onProgress(loaded, total);
        })
      );
    }

    return { logoData, imageMap };
  }

  // --- 3. GENERADOR PRINCIPAL DEL PDF CON jsPDF ---
  async function generateAgroCatalogPdf() {
    if (isGenerating) return;
    isGenerating = true;

    try {
      // Validar jsPDF
      const jsPDFClass = window.jspdf ? window.jspdf.jsPDF : null;
      if (!jsPDFClass) {
        alert("La librería de generación de PDF se está cargando. Por favor, intente nuevamente en 2 segundos.");
        isGenerating = false;
        return;
      }

      // Obtener catálogo fresco (con todos los cambios de localStorage y Firestore)
      const rawCatalog = window.getAgroCatalog ? window.getAgroCatalog() : (typeof catalogo !== 'undefined' ? catalogo : []);

      // Filtrar estrictamente productos eliminados y ocultos
      const activeProducts = rawCatalog.filter((p) => {
        if (!p) return false;
        if (p._deleted) return false;
        if (p.oculto) return false; // Excluir invisibles/ocultos
        return true;
      });

      if (activeProducts.length === 0) {
        alert("No hay maquinarias activas en el catálogo para generar el PDF.");
        isGenerating = false;
        return;
      }

      // Fechas
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const dateStr = `${dd}-${mm}-${yyyy}`;
      const dateHuman = `${dd}/${mm}/${yyyy}`;
      const filename = `Catalogo_Agroguardati_${dateStr}.pdf`;

      updateModalProgress(5, `Preparando ${activeProducts.length} productos activos...`, "Generando Catálogo PDF");

      // Cargar imágenes
      const LOGO_BASE64_DATA = 'data:image/png;base64,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';
      const { logoData, imageMap } = await loadAllImagesWithProgress(
        activeProducts,
        LOGO_BASE64_DATA,
        (loaded, total) => {
          const pct = 5 + (loaded / total) * 75; // 5% a 80%
          updateModalProgress(pct, `Cargando imágenes (${loaded} de ${total})...`);
        }
      );

      updateModalProgress(85, "Diagramando catálogo oficial...", "Ensamblando Páginas");

      // Crear documento jsPDF en A4 (210 x 297 mm)
      const doc = new jsPDFClass({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const marginX = 10;
      const colWidth = 92;
      const colGap = 6;
      const cardHeight = 33;
      const rowGap = 2.5;

      let currentY = 37; // Inicio debajo del encabezado en pág 1
      let currentPage = 1;

      // Diagramación de tarjetas (2 columnas por fila)
      for (let i = 0; i < activeProducts.length; i += 2) {
        // Verificar si la fila cabe en la página actual
        if (currentY + cardHeight > 284) {
          doc.addPage();
          currentPage++;
          currentY = 14; // Margen superior en páginas 2 en adelante
        }

        for (let c = 0; c < 2; c++) {
          const idx = i + c;
          if (idx >= activeProducts.length) break;
          const p = activeProducts[idx];
          const cardX = marginX + c * (colWidth + colGap);
          const cardY = currentY;

          // Fondo y borde de la tarjeta
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.3);
          doc.roundedRect(cardX, cardY, colWidth, cardHeight, 1.5, 1.5, 'FD');

          // Caja de imagen (izquierda)
          const imgBoxW = 31;
          const imgBoxH = 25;
          const imgBoxX = cardX + 3;
          const imgBoxY = cardY + 4;

          doc.setFillColor(248, 250, 252);
          doc.setDrawColor(241, 245, 249);
          doc.roundedRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 1, 1, 'FD');

          const imgData = imageMap.get(p.id);
          if (imgData) {
            try {
              doc.addImage(imgData, 'JPEG', imgBoxX, imgBoxY, imgBoxW, imgBoxH);
            } catch (e) {
              doc.setFont('helvetica', 'italic');
              doc.setFontSize(6.5);
              doc.setTextColor(148, 163, 184);
              doc.text('[Imagen]', imgBoxX + imgBoxW / 2, imgBoxY + imgBoxH / 2, { align: 'center' });
            }
          } else {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(6.5);
            doc.setTextColor(148, 163, 184);
            doc.text('[Sin imagen]', imgBoxX + imgBoxW / 2, imgBoxY + imgBoxH / 2, { align: 'center' });
          }

          // Columna de información (derecha)
          const contentX = cardX + 36.5;
          const contentW = colWidth - 38.5; // ~53.5mm

          // Estado Badge (Nuevo / Usado)
          const isNuevo = (p.estado || '').toLowerCase().includes('nuevo');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          if (isNuevo) {
            doc.setTextColor(22, 101, 52); // Verde
            doc.text('[ NUEVO ]', contentX, cardY + 5.5);
          } else {
            doc.setTextColor(3, 105, 161); // Azul
            doc.text('[ USADO ]', contentX, cardY + 5.5);
          }

          // Título completo (hasta 2 líneas)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(21, 63, 113); // Azul institucional
          const titleLines = doc.splitTextToSize(p.nombre || 'Maquinaria', contentW);
          let titleY = cardY + 9.5;
          const maxTitleLines = Math.min(titleLines.length, 2);
          for (let l = 0; l < maxTitleLines; l++) {
            let tText = titleLines[l];
            if (l === 1 && titleLines.length > 2) tText += '...';
            doc.text(tText, contentX, titleY);
            titleY += 3.2;
          }

          // Especificaciones resumidas (SIN MARCA Y SIN CATEGORÍA)
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(6);
          doc.setTextColor(51, 65, 85);

          const specs = p.especificaciones || {};
          const specLines = [];
          if (typeof specs === 'object' && specs !== null) {
            for (const [k, v] of Object.entries(specs)) {
              const kLow = k.toLowerCase().trim();
              if (kLow === 'marca' || kLow === 'categoría' || kLow === 'categoria') continue;
              specLines.push(`• ${k}: ${v}`);
            }
          }
          if (specLines.length === 0 && p.descripcionCorta) {
            const cleanDesc = p.descripcionCorta.length > 80 ? p.descripcionCorta.substring(0, 80) + '...' : p.descripcionCorta;
            specLines.push(`• ${cleanDesc}`);
          }

          let specY = titleY + 1.2;
          const maxSpecs = Math.min(specLines.length, 3);
          for (let s = 0; s < maxSpecs; s++) {
            if (specY > cardY + cardHeight - 1.8) break;
            const sWrapped = doc.splitTextToSize(specLines[s], contentW);
            doc.text(sWrapped[0], contentX, specY);
            specY += 2.8;
          }
        }

        currentY += cardHeight + rowGap;
      }

      updateModalProgress(95, "Aplicando numeración y detalles de marca...");

      // Segunda pasada: Encabezados y Pies de página con total de páginas
      const totalPages = doc.internal.getNumberOfPages();

      for (let pNum = 1; pNum <= totalPages; pNum++) {
        doc.setPage(pNum);

        // Pie de página oficial
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(10, 287, 200, 287);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(21, 63, 113);
        doc.text('AGROGUARDATI', 10, 292);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        doc.text('• Maquinaria Agrícola • Tel: +54 9 3404 63-8524 • www.agroguardati.com.ar', 35, 292);

        const pageStr = `Página ${pNum} de ${totalPages}`;
        doc.text(pageStr, 200, 292, { align: 'right' });

        if (pNum === 1) {
          // Encabezado Página 1
          if (logoData) {
            try {
              doc.addImage(logoData, 'PNG', 10, 10, 26, 18);
            } catch (e) {}
          }

          const headerTextX = logoData ? 40 : 10;

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(17);
          doc.setTextColor(21, 63, 113);
          doc.text('AGROGUARDATI', headerTextX, 16);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(100, 116, 139);
          doc.text(`Catálogo Oficial de Maquinarias • Stock Completo (${activeProducts.length} Equipos)`, headerTextX, 21);

          doc.setFontSize(7.5);
          doc.text(`Fecha de Emisión: ${dateHuman} • Tel: +54 9 3404 63-8524 • www.agroguardati.com.ar`, headerTextX, 26);

          // Barra decorativa azul y roja
          doc.setFillColor(21, 63, 113);
          doc.rect(10, 30, 125, 1.2, 'F');
          doc.setFillColor(211, 47, 47);
          doc.rect(135, 30, 65, 1.2, 'F');
        } else {
          // Barra superior en Páginas 2+
          doc.setFillColor(21, 63, 113);
          doc.rect(0, 0, pageWidth, 2.5, 'F');
          doc.setFillColor(211, 47, 47);
          doc.rect(0, 2.5, 75, 0.8, 'F');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.setTextColor(21, 63, 113);
          doc.text('AGROGUARDATI', 10, 8);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(`• Catálogo Oficial de Maquinarias • Emisión: ${dateHuman}`, 33, 8);

          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.2);
          doc.line(10, 10, 200, 10);
        }
      }

      // Descargar archivo con nombre que incluye la fecha exacta
      setModalSuccess("¡Catálogo Generado con Éxito!", `Descargando: ${filename}`);
      doc.save(filename);

      setTimeout(() => {
        hideProgressModal();
        isGenerating = false;
      }, 1800);
    } catch (err) {
      console.error("Error generando PDF:", err);
      alert("Ocurrió un inconveniente al armar el PDF. Por favor, intente nuevamente.");
      hideProgressModal();
      isGenerating = false;
    }
  }

  // Exponer función global
  window.generateAgroCatalogPdf = generateAgroCatalogPdf;

  // Enlazar automáticamente a todos los botones de descarga de PDF al cargar la página
  function bindPdfButtons() {
    const selectors = [
      '.btn-download-pdf-hero',
      '.btn-download-pdf',
      '.btn-download-pdf-mobile',
      '.btn-download-pdf-compact',
      '#btn-download-pdf-hero',
      '#btn-download-pdf-bar',
      '#btn-download-pdf-hero-m',
      '#btn-download-pdf-compact-m',
      '#btn-admin-download-pdf',
      '[data-action="download-catalog-pdf"]'
    ];

    document.querySelectorAll(selectors.join(',')).forEach((btn) => {
      if (btn.dataset.pdfBound) return;
      btn.dataset.pdfBound = 'true';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        generateAgroCatalogPdf();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindPdfButtons);
  } else {
    bindPdfButtons();
  }

  // Re-enlazar si hay cambios de vista
  window.addEventListener('agroCatalogUpdated', () => {
    setTimeout(bindPdfButtons, 300);
  });
})();
