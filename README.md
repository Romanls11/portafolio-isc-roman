# Román Luna Soto — Portfolio Profesional

Sitio web de portafolio profesional para Ingeniero en Sistemas Computacionales especializado en Smart Cities, IoT y desarrollo de software empresarial.

## Estructura del proyecto

```
portafolio-isc-roman/
├── index.html          # Página principal (SPA)
├── css/
│   └── styles.css      # Estilos completos (design system, componentes, responsive)
├── js/
│   └── main.js         # JavaScript (canvas, typed effect, animaciones, formulario)
├── assets/
│   ├── cv-roman-luna-soto.pdf   # ← Agregar tu CV aquí
│   ├── roman-luna.jpg           # ← Agregar tu foto profesional aquí
│   └── og-image.jpg             # ← Imagen Open Graph (1200x630px)
├── vercel.json         # Configuración de despliegue Vercel
└── README.md           # Este archivo
```

## Personalización antes de publicar

### 1. Foto profesional
Reemplaza el placeholder de iniciales "RLS" con tu foto real:
- Agrega tu foto en `assets/roman-luna.jpg`
- En `index.html`, busca `<div class="photo-initials">RLS</div>` y reemplaza con:
  ```html
  <img src="assets/roman-luna.jpg" alt="Román Luna Soto" />
  ```

### 2. CV descargable
- Coloca tu CV en PDF en `assets/cv-roman-luna-soto.pdf`

### 3. Links de redes sociales
Busca y actualiza en `index.html`:
- `https://github.com/romanlunasoto` → Tu GitHub real
- `https://linkedin.com/in/romanlunasoto` → Tu LinkedIn real
- `roman@email.com` → Tu correo real
- `https://wa.me/52XXXXXXXXXX` → Tu número de WhatsApp (formato: 52 + 10 dígitos)

### 4. Formulario de contacto (Formspree)
1. Ve a [formspree.io](https://formspree.io) y crea una cuenta gratuita
2. Crea un nuevo formulario → copia el ID (ej: `xpzgkwab`)
3. En `js/main.js`, busca `const formspreeId = 'YOUR_FORM_ID'` y reemplaza el valor

### 5. SEO
- Actualiza la URL canónica en `index.html`: `<link rel="canonical" href="https://TU-DOMINIO.com" />`
- Actualiza las URLs de Open Graph y Twitter Card
- Genera `assets/og-image.jpg` de 1200×630px con tu nombre y cargo

## Despliegue en Vercel

### Opción A — Vercel CLI (recomendado)
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde el directorio del proyecto
cd portafolio-isc-roman
vercel

# Para producción
vercel --prod
```

### Opción B — Vercel Dashboard (sin CLI)
1. Ve a [vercel.com](https://vercel.com) → Sign Up / Log In
2. Haz clic en **"Add New Project"**
3. **Importa desde GitHub** (sube tu proyecto primero a un repositorio privado/público)
   - O usa **"Deploy without Git"** → arrastra la carpeta completa
4. Vercel detecta automáticamente que es un sitio estático
5. Haz clic en **"Deploy"**

### Opción C — Subir a GitHub primero
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/TU-USUARIO/portafolio.git
git push -u origin main
```
Luego conecta el repo en Vercel Dashboard.

### Dominio personalizado
En el Dashboard de Vercel:
- Settings → Domains → Add `romanlunasoto.dev` o el dominio que tengas

## Tecnologías usadas

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS3 con Custom Properties, Grid, Flexbox |
| Scripts | JavaScript ES6+ vanilla (sin frameworks) |
| Fuentes | Inter + JetBrains Mono (Google Fonts) |
| Iconos | Font Awesome 6.5 |
| Formulario | Formspree (opcional) |
| Deploy | Vercel |

## SEO implementado

- `<title>` optimizado
- Meta description y keywords
- Open Graph (Facebook/LinkedIn)
- Twitter Card
- JSON-LD Structured Data (`Person` schema)
- `<link rel="canonical">`
- Headers de seguridad en Vercel
- Cache headers para assets estáticos

## Animaciones implementadas

- **Canvas Particle Network** — red de nodos IoT animada en el hero
- **Typed text effect** — subtítulo con efecto escritura
- **Fade-up on scroll** — entradas suaves al hacer scroll
- **Counter animation** — números animados en sección docencia
- **Skill bars** — barras de habilidad animadas
- **Floating badges** — badges flotantes alrededor de la foto
- **Rotating rings** — anillos orbitales en la foto
- **Hover effects** — en todas las tarjetas e interactivos

## Paleta de colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg0` | `#020202` | Fondo principal |
| `--blue` | `#2563eb` | Acento principal |
| `--blue-light` | `#3b82f6` | Hover / gradiente |
| `--blue-pale` | `#60a5fa` | Iconos / detalles |
| `--green` | `#22c55e` | Estado activo / disponible |

---

**Desarrollado por:** Román Luna Soto  
**Stack:** HTML5 + CSS3 + JavaScript  
**Deploy:** Vercel
