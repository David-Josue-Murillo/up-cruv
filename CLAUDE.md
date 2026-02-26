Actúa como UI System Architect.

OBJETIVO:
Formalizar un patrón oficial de cards y eliminar divergencias visuales inconsistentes.

ALCANCE:
- Homepage audience cards
- Section cards
- Autoridades cards

RESTRICCIONES:
- No rediseñar visualmente.
- Solo unificar reglas.
- No modificar contenido textual.

INSTRUCCIONES:
1. Define variantes oficiales:
   - Standard
   - Featured
2. Estandariza:
   - Tamaño de icono
   - Padding
   - Background del icono
   - Hover states
3. Minimiza impacto visual.

FORMATO:
- Definición de variantes.
- Archivos modificados.
- Código final.# Proyecto

Sitio web del Centro Regional Universitario de Veraguas (CRUV) — Universidad de Panamá. Monorepo con frontend estático (Astro) y CMS headless (Strapi). El frontend consume contenido del backend vía API REST.

# Stack Tecnológico

## Frontend (`frontend/`)
- **Framework:** Astro 5.17.1 (SSG, ES modules)
- **UI interactiva:** React 19.2.4 vía `@astrojs/react`
- **Estilos:** Tailwind CSS 4.2.1 (v4, integrado como plugin Vite)
- **Lenguaje:** TypeScript (modo strict, hereda `astro/tsconfigs/strict`)
- **Fuentes:** Google Fonts — Montserrat (cuerpo/nav), Playfair Display (headings)

## Backend (`backend/`)
- **CMS:** Strapi 5.36.1 (TypeScript)
- **Base de datos:** SQLite (better-sqlite3) por defecto; soporta MySQL y PostgreSQL
- **Plugins activos:** users-permissions, upload, i18n, review-workflows, content-releases, cloud
- **Node.js:** >=20.0.0 <=24.x.x

## Herramientas
- **Package manager:** npm
- **Editor:** VS Code (extensión recomendada: `astro-build.astro-vscode`)

# Arquitectura

## Estructura del monorepo

```
up-cruv/
├── frontend/          # Astro SSG
│   ├── src/
│   │   ├── pages/           # Rutas (file-based routing)
│   │   ├── layouts/         # Layout wrappers
│   │   ├── components/      # Componentes organizados por dominio
│   │   │   └── layout/      # Navbar, MegaMenu, MobileMenu
│   │   ├── lib/             # Datos, utilidades, helpers
│   │   └── styles/          # CSS global y tema Tailwind
│   └── public/              # Assets estáticos
├── backend/           # Strapi CMS
│   ├── config/              # Configuración del servidor, DB, middlewares, plugins
│   ├── src/
│   │   ├── api/             # Content types personalizados (vacío actualmente)
│   │   ├── admin/           # Personalización del admin panel
│   │   └── extensions/      # Extensiones de plugins
│   ├── database/migrations/ # Migraciones de DB
│   └── types/generated/     # Tipos auto-generados por Strapi
└── .vscode/           # Configuración compartida del editor
```

## Patrón de componentes

- **Astro (`.astro`)** para contenido estático y layouts (Navbar, Layout, pages).
- **React (`.tsx`)** solo para componentes que requieren interactividad del lado del cliente (MegaMenu, MobileMenu).
- Directivas de hidratación parcial para componentes React:
  - `client:load` — interactividad necesaria de inmediato (ej: navegación).
  - `client:idle` — interactividad no crítica, se hidrata cuando el browser está idle.
  - `client:visible` — se hidrata cuando el componente entra en el viewport.
  - Preferir `client:idle` o `client:visible` sobre `client:load` cuando sea posible.

## Datos de navegación

La estructura de navegación se define como datos tipados en `frontend/src/lib/navigation.ts`. Los componentes de navegación consumen estas interfaces:

- `NavLink` — enlace simple (label + href)
- `NavColumn` — columna del mega-menú (heading + links)
- `NavItem` — item de navegación principal (label + href + columns)
- `audienceLinks` — enlaces de público objetivo (Estudiantes, Docentes, Graduados)
- `navItems` — 6 secciones: Nosotros, Oferta Académica, Admisión, Investigación, Extensión, Noticias

# Convenciones de Código

## Commits
- **Idioma:** inglés.
- **Formato:** [Conventional Commits](https://www.conventionalcommits.org/) — `tipo(alcance): descripción`.
- **Tipos permitidos:** `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `test`, `perf`, `ci`, `build`.
- **Alcance (scope):** `frontend`, `backend`, o subdirectorio relevante (ej: `frontend/nav`, `backend/api`). Omitir si el cambio es transversal.
- **Descripción:** imperativo, minúscula, sin punto final, máximo ~72 caracteres.
- **Body (opcional):** lista con `-` explicando los cambios principales. Separar del título con una línea en blanco.
- **Breaking changes:** agregar `!` después del tipo/scope (ej: `feat(frontend)!: ...`) y documentar en el body con `BREAKING CHANGE:`.
- **No commitear:** archivos `.env`, `node_modules/`, `*.lock`, carpetas auto-generadas (`.astro/`, `.strapi/`, `types/generated/`).
- Preferir commits atómicos: un commit por cambio lógico. Evitar commits gigantes que mezclen features, fixes y refactors.

### Ejemplos
```
feat(frontend): add hero section to homepage

- Background image with dark overlay and radial gradient
- Floating bokeh orbs with CSS animations
- Dual CTA buttons: Oferta Académica and Admisión
```

```
fix(backend): correct pagination default in article endpoint
```

```
refactor(frontend): extract shared hooks from navigation components

- useEscapeKey, useBodyScrollLock, useClickOutside to lib/hooks/
- Split NavItemButton and AccordionItem into own files
```

```
chore: update dependencies to latest patch versions
```

## Estilo
- TypeScript strict en frontend; TypeScript estándar en backend.
- ES Modules en frontend (`"type": "module"`). CommonJS en backend.
- Idioma del código: inglés para identificadores, español para contenido visible al usuario.

## Path aliases (frontend)
```
@/*           → src/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@lib/*        → src/lib/*
@styles/*     → src/styles/*
```

## Organización de componentes
- Componentes agrupados por dominio dentro de `components/` (ej: `components/layout/`).
- Un archivo por componente.
- Componentes Astro para contenido estático; React solo cuando hay estado o interactividad.

## Sistema de diseño (Tailwind v4) — Tema Premium Institucional
Definido en `frontend/src/styles/global.css` con `@theme`:

### Paleta de colores
- **Primario:** verde bosque profundo (green-50 a green-950, base `#0b3123`)
- **Acento:** oro rico y cálido (gold-50 a gold-950, base `#d4af37`)
- **Institucional:** azul (blue-50 a blue-950, para usos específicos)
- **Neutrales:** grises con tinte verde
- **Semánticos:** success (green), warning (gold), error (red), info (blue)
- **Fondo del sitio:** verde oscuro con degradado radial (`radial-gradient` en `body`)
- **Texto principal:** blanco (`#ffffff`) sobre fondos oscuros

### Tipografía
- **Headings (h1-h3):** Playfair Display (serif elegante/académica) — `font-heading`
- **Body/Nav (h4-h6, párrafos):** Montserrat (sans-serif moderna) — `font-body`
- **Escala modular:** 1.25 (xs a 5xl)

### Efectos y componentes CSS
- **Glassmorphism:** clase `.glass` — fondo translúcido + blur + borde dorado sutil
- **Glass cards:** clase `.glass-card` — tarjetas con efecto vidrio esmerilado
- **Botón metálico dorado:** clase `.btn-gold` — gradiente cepillado con sombras internas
- **Botón dorado con brillo:** clase `.btn-gold-glow` — edge lighting con shimmer animado
- **Botón fantasma:** clase `.btn-ghost` — bordes translúcidos sobre fondos oscuros

### Patrones y efectos de fondo
- **Patrón precolombino:** SVG geométrico de diamantes (data URI) con baja opacidad
- **Bokeh:** círculos difuminados con `blur` y animación `float`/`pulse-glow`
- **Líneas divisorias:** gradientes dorados (`via-gold-500`) en lugar de bordes sólidos

## Backend (Strapi)
- Content types se definen en `backend/src/api/` siguiendo la estructura estándar de Strapi 5.
- Configuración vía archivos TypeScript en `backend/config/`.
- Variables sensibles vía `.env` (nunca hardcoded).

# Reglas Importantes

## NO modificar
- `backend/types/generated/` — auto-generado por Strapi. Se regenera al crear/modificar content types.
- `frontend/.astro/` — auto-generado por Astro.
- `backend/.strapi/` — estado interno de Strapi.
- Archivos `*.lock` (package-lock.json).

## Restricciones críticas
- **Nunca commitear** archivos `.env`. Usar `.env.example` como referencia.
- **No mezclar** React y Astro sin justificación. React solo para interactividad real.
- **No instalar** un framework CSS adicional. Tailwind v4 con `@theme` es el sistema de diseño único.
- **No usar** `@apply` en Tailwind. Usar clases utilitarias o las clases de componentes definidas en `global.css` (`glass`, `glass-card`, `btn-gold`, etc.).
- **No usar** APIs deprecadas de Astro: `Astro.glob()` (usar `import.meta.glob()` o Content Collections), `<Markdown />` (removido), `@astrojs/image` (usar `astro:assets`).
- Backend escucha en puerto **1337**. Frontend dev server en puerto **4321**.
- La base de datos SQLite se almacena en `backend/.tmp/data.db` — no commitear.

## API del backend
- REST API con paginación: default 25 items, máximo 100.
- `withCount: true` habilitado (respuestas incluyen total).
- Middleware stack estándar de Strapi (logger, errors, security, cors, body, session, etc.).

# Flujo de Desarrollo

## Levantar el entorno
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

## Agregar una nueva página (frontend)
1. Crear archivo `.astro` en `frontend/src/pages/` (file-based routing de Astro).
2. Usar `Layout.astro` como wrapper (props: `title`, `description?`, `ogImage?`).
3. Componentes estáticos en `.astro`; interactivos en `.tsx` con la directiva `client:*` apropiada.
4. Usar los path aliases (`@components/`, `@lib/`, etc.).
5. Para rutas dinámicas usar `[slug].astro` o `[...slug].astro` con `getStaticPaths()`.
6. Crear `404.astro` en `src/pages/` para manejo de páginas no encontradas.

## Agregar un content type (backend)
1. Crear la estructura en `backend/src/api/<nombre>/`:
   - `content-types/<nombre>/schema.json`
   - `controllers/<nombre>.ts`
   - `services/<nombre>.ts`
   - `routes/<nombre>.ts`
2. Reiniciar Strapi para que genere los tipos en `types/generated/`.
3. Alternativamente, usar el Content-Type Builder del admin panel (`http://localhost:1337/admin`).

## Build de producción
```bash
cd frontend && npm run build    # Output en frontend/dist/
cd backend && npm run build     # Compila admin panel
cd backend && npm run start     # Inicia en modo producción
```

# Testing

No hay framework de testing configurado actualmente en ninguno de los dos proyectos.

# Notas para Agentes LLM

## Contexto del proyecto
- Este es un sitio web institucional universitario. El tono del contenido es formal y académico, en español.
- El proyecto está en fase inicial. El backend no tiene content types personalizados aún. El frontend tiene la navegación y el home page con contenido placeholder.

## Restricciones operativas
- Ejecutar `npm install` dentro de `frontend/` o `backend/` según corresponda, nunca en la raíz.
- Al modificar el tema de Tailwind, editar `frontend/src/styles/global.css` (directivas `@theme`). No existe `tailwind.config.*`.
- La integración de Tailwind v4 es vía plugin Vite (`@tailwindcss/vite`), no vía PostCSS.
- Los tipos de React en frontend son v19; en backend (admin Strapi) son v18. No confundir.
- Strapi 5 usa Document Service API (no Entity Service como v4).

## Performance
- Minimizar JavaScript del lado del cliente. Priorizar generación estática.
- Usar `astro:assets` (`<Image />`, `<Picture />`) para optimización automática de imágenes (lazy loading, formatos modernos, dimensiones).
- Implementar lazy loading para assets pesados.
- Priorizar Core Web Vitals: LCP, INP, CLS.

## Al generar componentes
- Preferir Astro (`.astro`) sobre React (`.tsx`) a menos que el componente requiera estado o interactividad del lado del cliente.
- Respetar la paleta de colores institucional: verde bosque (`green-*`), oro (`gold-*`), blanco para texto.
- Usar las clases del tema: `text-gold-400` para acentos, `text-white/70` para texto secundario, `glass-card` para tarjetas.
- Usar `btn-gold`, `btn-gold-glow` o `btn-ghost` para botones (no crear estilos ad-hoc).
- Todo el diseño es dark theme: fondos oscuros, texto claro, acentos dorados.
- Tipografía: `font-heading` para títulos (Playfair Display), `font-body` para texto (Montserrat).
- Usar variables descriptivas y props tipados con interfaces TypeScript.
- Componer componentes pequeños y reutilizables.

## SEO
- Incluir meta tags relevantes en `<head>` vía el Layout (title, description, Open Graph).
- Usar URLs canónicas en cada página.
- Estructura semántica HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

## Accesibilidad
- HTML semántico como base (no `<div>` donde corresponde `<nav>`, `<button>`, etc.).
- Atributos ARIA donde el HTML semántico no sea suficiente (`aria-label`, `aria-expanded`, `aria-hidden`).
- Navegación completa por teclado en elementos interactivos (focus visible, Escape para cerrar).
- Contraste de color suficiente (mínimo WCAG AA).

## Al generar contenido
- Todo el contenido visible al usuario debe estar en español.
- Usar terminología universitaria panameña cuando aplique.
