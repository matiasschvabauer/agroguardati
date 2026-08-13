/**
 * AGROGUARDATI - WHATSAPP BOT WEBHOOK SERVER & CLEANUP CRON
 * Sincronización automática de Historias 24hs y Auto-eliminación en Cloudinary
 * 
 * Requisitos:
 * 1. npm install express body-parser axios cloudinary firebase-admin
 * 2. Ejecutar con: node server/whatsapp_bot.js
 */

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(bodyParser.json());

// CONFIGURACIÓN DE CLOUDINARY Y WHATSAPP META
const CONFIG = {
  // Números autorizados (Tu celular + Guillermo)
  authorizedPhones: ['3404534477', '3404638524', '5493404534477', '5493404638524'],
  cloudinaryCloud: 'pfskomq5',
  cloudinaryPreset: 'nwrslkmw',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || 'TU_CLOUDINARY_API_KEY',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || 'TU_CLOUDINARY_API_SECRET',
  phoneId: '1256651710864243',
  whatsappAccessToken: process.env.WHATSAPP_TOKEN || 'EAAeNBduRSmkBSMNvU50oQldR6GlnTQcI7Q8WmRgTFZCZCGJmxBDRSrjVy5oZAxtqZCAB77Dp9yZBUHZC3fTXFlSw0cKiAsj7LtC1JwYtPqSNJDXCc7ykzo9AcD6Bmb4QUbYKi8ZBo1v9dPVEZAZAnwfZBqkHrtE2jgtKjUS7wFk1SvdzdwkeZAP0CjBEIml5WOBi265W6WghRYxWseBexGeeKZCUnven9k1UmJCVqoEGLsXEqj1myZAcmRf5PYFu9YEnFGP3NDYON0OohWG7QZA40ssAZDZD'
};

cloudinary.config({
  cloud_name: CONFIG.cloudinaryCloud,
  api_key: CONFIG.cloudinaryApiKey,
  api_secret: CONFIG.cloudinaryApiSecret
});

// INITIALIZE FIREBASE ADMIN (SI ESTÁ DISPONIBLE)
let db = null;
try {
  const admin = require('firebase-admin');
  if (fs.existsSync('./firebase-key.json')) {
    const serviceAccount = require('./firebase-key.json');
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    db = admin.firestore();
  }
} catch (e) {
  console.log("Firebase Admin no inicializado localmente.");
}

// FUNCIÓN AUXILIAR PARA GUARDAR EN FIRESTORE VÍA REST API (FALLBACK SI NO HAY ADMIN KEY)
async function saveStoryToFirestoreREST(storyPayload) {
  if (db) {
    await db.collection('historias').doc(storyPayload.id).set(storyPayload);
    return;
  }

  try {
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/agroguardati/databases/(default)/documents/historias?documentId=${storyPayload.id}`;
    await axios.post(firestoreUrl, {
      fields: {
        id: { stringValue: storyPayload.id },
        tipo: { stringValue: storyPayload.tipo },
        url: { stringValue: storyPayload.url },
        public_id: { stringValue: storyPayload.public_id || '' },
        caption: { stringValue: storyPayload.caption || '' },
        fecha: { integerValue: String(storyPayload.fecha) },
        expira: { integerValue: String(storyPayload.expira) }
      }
    });
    console.log('[FIREBASE REST ÉXITO] Historia guardada en Firestore en la nube.');
  } catch (err) {
    console.error('Error guardando en Firestore REST API:', err.response?.data || err.message);
  }
}

// 1. VERIFICACIÓN DE WEBHOOK META (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === 'agroguardati_secret') {
    console.log('Webhook de WhatsApp verificado con éxito por Meta!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 2. RECEPCIÓN DE MENSAJES DE WHATSAPP (POST)
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body;

    if (body.object && body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
      const messages = body.entry[0].changes[0].value.messages;

      for (const msg of messages) {
        const sender = msg.from; // Número remitente
        const type = msg.type;   // 'image', 'video', etc.

        // FILTRO 1: Verificar si el número está autorizado (Tu celular o Guillermo)
        const isAuthorized = CONFIG.authorizedPhones.some(phone => sender.includes(phone) || phone.includes(sender));
        if (!isAuthorized) {
          console.log(`[IGNORADO] Mensaje de número no autorizado: ${sender}`);
          continue;
        }

        // FILTRO 2: Ignorar texto puro, procesar solo imágenes y videos
        if (type !== 'image' && type !== 'video') {
          console.log(`[IGNORADO] El mensaje no es foto/video: ${type}`);
          continue;
        }

        console.log(`[PROCESANDO] Recibido ${type} de número autorizado (${sender})...`);

        const mediaId = type === 'image' ? msg.image.id : msg.video.id;
        const caption = (type === 'image' ? msg.image.caption : msg.video.caption) || '';

        // Paso A: Obtener URL desde WhatsApp Media API
        const mediaRes = await axios.get(`https://graph.facebook.com/v18.0/${mediaId}`, {
          headers: { Authorization: `Bearer ${CONFIG.whatsappAccessToken}` }
        });

        // Paso B: Descargar archivo en binario
        const fileStream = await axios.get(mediaRes.data.url, {
          headers: { Authorization: `Bearer ${CONFIG.whatsappAccessToken}` },
          responseType: 'arraybuffer'
        });

        // Paso C: Subir a Cloudinary (Unsigned Upload)
        const base64Data = `data:${type === 'image' ? 'image/jpeg' : 'video/mp4'};base64,${Buffer.from(fileStream.data).toString('base64')}`;
        
        const cloudEndpoint = type === 'image' 
          ? `https://api.cloudinary.com/v1_1/${CONFIG.cloudinaryCloud}/image/upload`
          : `https://api.cloudinary.com/v1_1/${CONFIG.cloudinaryCloud}/video/upload`;

        const uploadRes = await axios.post(cloudEndpoint, {
          file: base64Data,
          upload_preset: CONFIG.cloudinaryPreset
        });

        const publicUrl = uploadRes.data.secure_url;
        const publicId = uploadRes.data.public_id;
        console.log(`[ÉXITO] Archivo subido a Cloudinary (${publicId}): ${publicUrl}`);

        // Paso D: Guardar Historia en Firestore (usando Admin o REST API)
        const storyPayload = {
          id: 'story_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          tipo: type,
          url: publicUrl,
          public_id: publicId,
          caption: caption,
          fecha: Date.now(),
          expira: Date.now() + (24 * 60 * 60 * 1000) // 24 horas exactas
        };

        await saveStoryToFirestoreREST(storyPayload);
      }
    }
  } catch (err) {
    console.error('Error procesando webhook de WhatsApp:', err.response?.data || err.message);
  }

  res.sendStatus(200);
});

// 3. LIMPIEZA AUTOMÁTICA DE ESPACIO EN CLOUDINARY AL EXPIRAR LAS 24HS
async function cleanupExpiredCloudinaryMedia() {
  if (!db) return;
  const now = Date.now();

  try {
    const expiredSnap = await db.collection('historias').where('expira', '<=', now).get();
    
    for (const doc of expiredSnap.docs) {
      const data = doc.data();
      if (data.public_id) {
        console.log(`[LIMPIANDO CLOUDINARY] Borrando imagen/video expirado ${data.public_id}...`);
        try {
          await cloudinary.uploader.destroy(data.public_id, { resource_type: data.tipo === 'video' ? 'video' : 'image' });
        } catch (cErr) {
          console.warn("Cloudinary destroy error:", cErr.message);
        }
      }
      await doc.ref.delete();
    }
  } catch (err) {
    console.error("Error en rutina de limpieza de Cloudinary:", err.message);
  }
}

setInterval(cleanupExpiredCloudinaryMedia, 60 * 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Agroguardati WhatsApp Webhook Server corriendo en puerto ${PORT}`);
  console.log(`Phone ID: ${CONFIG.phoneId}`);
  console.log(`Números autorizados: ${CONFIG.authorizedPhones.join(', ')}`);
});
