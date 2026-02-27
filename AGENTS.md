# AGENTS.md - Guía para Agentes de Código

Este archivo proporciona instrucciones para agentes de código que operan en este repositorio.

---

## 1. Project Overview

Monorepo del Centro Regional Universitario de Veraguas (CRUV) — Universidad de Panamá.

- **Frontend:** Astro 5.17.1 (SSG) + React 19.2.4
- **Backend:** Strapi 5.36.1 (CMS headless)
- **Estilos:** Tailwind CSS 4.2.1
- **Puertos:** Frontend 4321, Backend 1337

---

## 2. Commands

### Frontend (`cd frontend`)
```bash
npm run dev      # Desarrollo en http://localhost:4321
npm run build    # Build de producción (output: frontend/dist/)
npm run preview  # Preview del build
npm run astro    # CLI de Astro
```

### Backend (`cd backend`)
```bash
npm run dev      # Desarrollo en http://localhost:1337
npm run build    # Compila admin panel
npm run start    # Inicia en modo producción
npm run console  # Strapi console
```

### Testing
No hay framework de testing configurado actualmente.

---

## 3. Import Sorting (Option B)

Orden estricto para imports:

```typescript
// 1. Framework imports (React, Astro)
import { useState, useEffect } from 'react';
import { Image } from 'astro:assets';

// 2. Componentes propios
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';

// 3. Lib/utilities
import { formatDate } from '@/lib/utils';
import { navItems } from '@/lib/navigation/data';

// 4. Estilos
import '@/styles/global.css';

// 5. Tipos (al final, con type keyword)
import type { NavLink } from '@/lib/navigation/types';
```

**Reglas:**
- Separar grupos con línea en blanco
- Usar path aliases (`@/`, `@components/`, etc.)
- Imports de tipos siempre con `import type`

---

## 4. Error Handling

### Frontend (Astro/React)
```typescript
// Usar try/catch con logging apropiado
try {
  const data = await fetchData();
} catch (error) {
  console.error('Error fetching data:', error);
  // No silenciar errores sin lógica
}

// Para componentes: usar Error Boundaries cuando sea necesario
```

### Backend (Strapi)
- Usar el middleware de errores de Strapi
- No exponer errores internos en producción
- Loggear con el logger de Strapi: `strapi.log.info()` / `strapi.log.error()`

---

## 5. File Size Limits

| Tipo | Límite |
|------|--------|
| Imágenes (optimizadas) | 100KB max |
| SVGs inline | 50KB max |
| Componentes Astro/React | Sin límite específico, pero preferir componentes pequeños |

**Reglas:**
- Usar siempre `astro:assets` (`<Image />`, `<Picture />`) para optimización automática
- Implementar lazy loading para assets pesados
- Comprimir imágenes antes de añadirlas al proyecto

---

## 6. Code Style

### TypeScript
- **Frontend:** Modo strict (`astro/tsconfigs/strict`)
- **Backend:** TypeScript estándar

### Módulos
- **Frontend:** ES Modules (`"type": "module"`)
- **Backend:** CommonJS (estructura de Strapi)

### Path Aliases
```typescript
@/*           → src/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@lib/*        → src/lib/*
@styles/*     → src/styles/*
```

### Componentes
- **Astro (`.astro`):** Contenido estático, layouts, páginas
- **React (`.tsx`):** Solo cuando requiere estado o interactividad
- Un archivo por componente

### Tailwind CSS v4
- **SÍ:** Usar `@theme` en `frontend/src/styles/global.css` para variables
- **SÍ:** Usar clases utilitarias de Tailwind
- **NO:** Usar `@apply` para estilos personalizados
- **SÍ:** Usar clases de componentes existentes: `glass`, `glass-card`, `btn-gold`, `btn-gold-glow`, `btn-ghost`, `light-card`

### File Naming
- Componentes: `camelCase` (Navbar.astro, MegaMenu.tsx)
- Páginas: `kebab-case` (nosotros/index.astro, oferta-academica.astro)
- Hooks: `useCamelCase.ts` (useMegaMenu.ts)

### Idioma
- Código: inglés (identificadores, nombres de variables/funciones)
- Contenido visible: español (textos, mensajes, etiquetas)

---

## 7. Naming Conventions

### Commits
Formato: [Conventional Commits](https://www.conventionalcommits.org/)

```
tipo(alcance): descripción
```

**Tipos permitidos:** `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `test`, `perf`, `ci`, `build`

**Alcance:** `frontend`, `backend`, o subdirectorio relevante

```bash
# Ejemplos
feat(frontend): add hero section to homepage
fix(backend): correct pagination default in article endpoint
refactor(frontend): extract shared hooks from navigation components
chore: update dependencies to latest patch versions
```

---

## 8. Important Restrictions

### NO Modificar
- `backend/types/generated/` — auto-generado por Strapi
- `frontend/.astro/` — auto-generado por Astro
- `backend/.strapi/` — estado interno de Strapi
- Archivos `*.lock` (package-lock.json)

### NO Commitear
- Archivos `.env` — usar `.env.example` como referencia
- `node_modules/`
- Carpetas auto-generadas
- Base de datos SQLite: `backend/.tmp/data.db`

### NO Hacer
- Instalar frameworks CSS adicionales (Tailwind v4 es el único)
- Usar `@apply` en Tailwind
- Mezclar React y Astro sin justificación
- Usar APIs deprecated de Astro:
  - `Astro.glob()` → usar `import.meta.glob()` o Content Collections
  - `<Markdown />` → removido
  - `@astrojs/image` → usar `astro:assets`

---

## 9. Design System

### Colores
- **Primario:** Verde bosque (`green-50` a `green-950`, base `#0b3123`)
- **Acento:** Oro cálido (`gold-50` a `gold-950`, base `#d4af37`)
- **Institucional:** Azul (`blue-*` para usos específicos)
- **Texto:** Blanco sobre fondos oscuros

### Clases de Componentes
```css
.glass          /* Panel glassmorphism */
.glass-card     /* Tarjeta con efecto vidrio */
.btn-gold       /* Botón metálico dorado */
.btn-gold-glow  /* Botón dorado con shimmer */
.btn-ghost      /* Botón fantasma (transparente) */
.light-card     /* Tarjeta para fondos claros */
```

### Iconos de Cards
```css
.card-standard  /* Variante estándar */
.card-featured  /* Variante destacada */
.card-icon--gold   /* Icono con bg dorado */
.card-icon--green  /* Icono con bg verde */
```

### Tipografía
- **Headings:** Playfair Display (`font-heading`)
- **Body/Nav:** Montserrat (`font-body`)

---

## 10. Accessibility & SEO

### Accesibilidad
- HTML semántico obligatorio (`<nav>`, `<main>`, `<section>`, etc.)
- Atributos ARIA cuando sea necesario: `aria-label`, `aria-expanded`, `aria-hidden`
- Navegación completa por teclado (focus visible, Escape para cerrar)
- Contraste mínimo WCAG AA

### SEO
- Meta tags vía Layout (`title`, `description`, `ogImage`)
- URLs canónicas
- Estructura semántica HTML
- Usar `astro:assets` para imágenes optimizadas (lazy loading automático)

---

## 11. API del Backend

- **Endpoint base:** `http://localhost:1337/api`
- **Paginación:** Default 25 items, máximo 100
- **Respuestas:** `withCount: true` habilitado
- **Content Types:** Definir en `backend/src/api/<nombre>/`

---

## 12. Performance

- Minimizar JavaScript del cliente (priorizar SSG)
- Usar directivas de hidratación: `client:idle` o `client:visible` sobre `client:load`
- Implementar lazy loading para componentes pesados
- Priorizar Core Web Vitals: LCP, INP, CLS
