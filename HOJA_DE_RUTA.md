# HOJA DE RUTA — Sitio Web

> Esta carpeta es el sitio completo. **Se sube al hosting tal cual está** (todos los archivos y la subcarpeta `textures/`). No hay que tocar nada del código para publicarlo.

## ✅ Ya hecho

- [x] Sitio completo: hero, nosotros, productos (5 tejidos), proceso, diferencial, contacto, FAQ
- [x] Número de WhatsApp real en todos los botones (+54 9 11 4536-0564)
- [x] Formulario de contacto que manda directo a WhatsApp
- [x] Mapa de Google con la dirección (Av. Gaona 4651)
- [x] Diseño responsive (celular y compu) con la paleta y tipografía de marca
- [x] "+50 colores" consistente con la configuración de marca

## 🔴 Paso 1 — Publicar el sitio (prioridad máxima, ~1 día)

- [ ] **Registrar el dominio `hilachas.com.ar`** en NIC Argentina (nic.ar, se hace con clave fiscal de AFIP; cuesta poco y tarda 1-2 días). Alternativa rápida: `hilachas.ar`.
- [ ] **Elegir hosting.** Recomendación: el sitio es estático (HTML/CSS/JS puro), así que sirven opciones gratis:
  - **Netlify o Vercel** (gratis, se arrastra la carpeta `web/` y queda online en minutos, después se conecta el dominio)
  - O un hosting argentino con cPanel si Leo prefiere factura local
- [ ] **Subir la carpeta `web/` completa** y verificar que se vea bien desde el celular
- [ ] **Conectar el dominio + SSL** (Netlify/Vercel lo dan automático)

## 🟡 Paso 2 — Medición (apenas esté online, ~1 hora)

- [ ] Crear cuenta de **Google Analytics 4** y pegar el código en `index.html` (antes de `</head>`)
- [ ] Dar de alta el sitio en **Google Search Console** (para aparecer en Google)
- [ ] Crear el **Pixel de Meta** (Facebook/Instagram) y pegarlo en `index.html` — necesario para hacer publicidad paga más adelante

## 🟢 Paso 3 — Mejoras (cuando haya tiempo, no frenan el lanzamiento)

- [ ] Meta tags **Open Graph** (para que al compartir el link en WhatsApp/redes aparezca la imagen y el título lindo)
- [ ] **Favicon** (el ícono de la pestaña del navegador — pedirlo en `branding/`)
- [ ] Marcado **schema.org LocalBusiness** (ayuda a Google a entender que es un negocio local)
- [ ] Optimizar imágenes: convertir los PNG pesados (`logo.png` 2 MB, `hero-factory.png` 1 MB) a WebP
- [ ] Galería de colores disponibles (sección nueva)
- [ ] Página dedicada de "pedí tu muestra gratis" con formulario propio
- [ ] Blog para SEO (más adelante, mes 3+)

## Cómo probar la web antes de subirla

```powershell
powershell -NoProfile -File ..\.claude\serve.ps1
```
y abrir `http://localhost:3000`
