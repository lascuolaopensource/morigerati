# Video Thumbnail Generator per PayloadCMS

Questo modulo genera automaticamente thumbnails per i file video caricati tramite PayloadCMS e li salva nel bucket di storage (S3 o altro storage cloud configurato).

## Caratteristiche

- Genera automaticamente thumbnail per video in tutte le dimensioni configurate
- Utilizza FFmpeg per estrarre frame dai video
- Processa i frame con Sharp per ridimensionarli e ottimizzarli
- Carica i thumbnail direttamente nel bucket di storage
- Integrazione completa con il sistema di sizes di PayloadCMS
- Funziona sia in sviluppo che in produzione

## Installazione

Per utilizzare questo modulo, è necessario installare le seguenti dipendenze:

```bash
npm install ffmpeg-static sharp
# o con yarn
yarn add ffmpeg-static sharp
# o con pnpm
pnpm add ffmpeg-static sharp
```

## Implementazione

Il modulo è composto da:

1. `generateVideoThumbnail.ts` - Hook di PayloadCMS che viene eseguito prima di salvare un documento Media
2. `videoThumbnailUtils.ts` - Utilità per generare thumbnail dai video

## Come funziona

1. Quando viene caricato un video, l'hook `generateVideoThumbnail` viene eseguito
2. Viene verificato che il file sia un video basato sul mimetype
3. Il video viene copiato temporaneamente in una directory locale
4. Per ogni dimensione configurata in `imageSizes`:
   - FFmpeg estrae un frame dal video (di default a 1 secondo dall'inizio)
   - Il frame viene elaborato con Sharp per ottimizzarlo
   - Il thumbnail viene caricato nel bucket di storage tramite l'adapter di PayloadCMS
   - L'URL del thumbnail caricato viene salvato nel documento Media
5. I file temporanei vengono eliminati automaticamente

## Integrazione con Storage Cloud

Questa implementazione utilizza l'adapter di storage configurato in PayloadCMS, ottenendolo direttamente dalla richiesta:

```typescript
const storage = req.payload.collections[collection.slug].config.upload.storage
```

Questo significa che funziona con qualsiasi provider di storage configurato (locale, S3, Google Cloud, ecc.) senza necessità di configurazioni aggiuntive.

## File Gallery Card

Il componente `GalleryCard` è stato aggiornato per utilizzare i thumbnail generati:

```jsx
const imageUrl = isVideo
  ? (media.thumbnailURL ||
     media.sizes?.thumbnail?.url ||
     media.sizes?.small?.url ||
     '/placeholder-video.jpg')
  : (media.sizes?.medium?.url ||
     media.sizes?.small?.url ||
     media.url as string)
```

Se non è disponibile un thumbnail, viene utilizzato il file `public/placeholder-video.jpg`.

## Personalizzazione

È possibile personalizzare il processo di generazione dei thumbnail modificando i parametri nel file `generateVideoThumbnail.ts`:

- Il parametro `-ss 00:00:01.000` controlla il momento in cui estrarre il frame (formato: HH:MM:SS.mmm)
- Il parametro `quality: 80` controlla la qualità dell'immagine WebP (0-100)
- L'opzione di scale permette di controllare il ridimensionamento mantenendo l'aspect ratio

## Risoluzione problemi

Se riscontri problemi:

1. Verifica che FFmpeg sia installato correttamente
2. Controlla i log del server per eventuali errori
3. Assicurati che il server abbia accesso in scrittura alla directory temporanea
4. Verifica che l'adapter di storage sia configurato correttamente e funzionante
5. Controlla le autorizzazioni per il caricamento di file nel bucket

## Note sulla performance

La generazione dei thumbnail è un'operazione intensiva in termini di risorse. In un ambiente di produzione con molti upload, potrebbe essere preferibile:

1. Spostare questa elaborazione in un processo asincrono/worker
2. Memorizzare nella cache gli URL dei thumbnail generati
3. Utilizzare un servizio specializzato per la trascodifica video come AWS MediaConvert
