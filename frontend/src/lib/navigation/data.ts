import type { NavLink, NavItem, SectionMeta } from "./types";

export const audienceLinks: NavLink[] = [
  { label: "Estudiantes", href: "/estudiantes" },
  { label: "Docentes", href: "/docentes" },
  { label: "Graduados", href: "/graduados" },
];

export const navItems: NavItem[] = [
  {
    label: "Nosotros",
    href: "/nosotros",
    columns: [
      {
        links: [
          { label: "Historia", href: "/nosotros/historia" },
          { label: "Autoridades", href: "/nosotros/autoridades" },
          { label: "Organigrama", href: "/nosotros/organigrama" },
        ],
      },
      {
        links: [
          { label: "Unidades", href: "/nosotros/unidades" },
          { label: "Infraestructura", href: "/nosotros/infraestructura" },
          { label: "Transparencia", href: "/nosotros/transparencia" },
        ],
      },
    ],
  },
  {
    label: "Oferta Académica",
    href: "/oferta-academica",
    columns: [
      {
        heading: "Programas",
        links: [
          { label: "Pregrado", href: "/oferta-academica/pregrado" },
          { label: "Postgrado", href: "/oferta-academica/postgrado" },
          { label: "Técnico", href: "/oferta-academica/tecnico" },
        ],
      },
      {
        heading: "Más opciones",
        links: [
          { label: "Educación Continua", href: "/oferta-academica/educacion-continua" },
          { label: "Facultades", href: "/oferta-academica/facultades" },
        ],
      },
    ],
  },
  {
    label: "Admisión",
    href: "/admision",
    columns: [
      {
        links: [
          { label: "Requisitos", href: "/admision/requisitos" },
          { label: "Proceso de Admisión", href: "/admision/proceso" },
        ],
      },
      {
        links: [
          { label: "Fechas Importantes", href: "/admision/fechas-importantes" },
          { label: "Preguntas Frecuentes", href: "/admision/preguntas-frecuentes" },
        ],
      },
    ],
  },
  {
    label: "Investigación",
    href: "/investigacion",
    columns: [
      {
        links: [
          { label: "Líneas de Investigación", href: "/investigacion/lineas" },
          { label: "Proyectos", href: "/investigacion/proyectos" },
        ],
      },
      {
        links: [
          { label: "Grupos", href: "/investigacion/grupos" },
          { label: "Publicaciones", href: "/publicaciones" },
          { label: "Convocatorias", href: "/investigacion/convocatorias" },
        ],
      },
    ],
  },
  {
    label: "Extensión",
    href: "/extension",
    columns: [
      {
        links: [
          { label: "Programas", href: "/extension/programas" },
          { label: "Voluntariado", href: "/extension/voluntariado" },
        ],
      },
    ],
  },
  {
    label: "Noticias",
    href: "/noticias",
    columns: [
      {
        heading: "Noticias recientes",
        links: [
          { label: "Ver todas las noticias", href: "/noticias" },
        ],
      },
      {
        heading: "Próximos eventos",
        links: [
          { label: "Ver todos los eventos", href: "/eventos" },
        ],
      },
    ],
  },
];

/** Metadata for section landing pages */
export const sectionMeta: Record<string, SectionMeta> = {
  nosotros: {
    title: "Nosotros",
    description: "Conoce la historia, autoridades y estructura organizacional del Centro Regional Universitario de Veraguas.",
  },
  "oferta-academica": {
    title: "Oferta Académica",
    description: "Explora nuestros programas de pregrado, postgrado, técnicos y educación continua.",
  },
  admision: {
    title: "Admisión",
    description: "Todo lo que necesitas saber para ingresar al CRUV: requisitos, proceso y fechas importantes.",
  },
  investigacion: {
    title: "Investigación",
    description: "Líneas de investigación, proyectos activos, grupos y publicaciones del CRUV.",
  },
  extension: {
    title: "Extensión",
    description: "Programas de extensión universitaria y voluntariado al servicio de la comunidad veragüense.",
  },
  noticias: {
    title: "Noticias",
    description: "Últimas noticias y comunicados del Centro Regional Universitario de Veraguas.",
  },
  estudiantes: {
    title: "Estudiantes",
    description: "Horarios, trámites, calendario académico, becas y recursos para estudiantes activos.",
  },
  docentes: {
    title: "Docentes",
    description: "Directorio, convocatorias y recursos para el cuerpo docente del CRUV.",
  },
  graduados: {
    title: "Graduados",
    description: "Educación continua, verificación de títulos y la asociación de egresados del CRUV.",
  },
};

/** Label map for all known paths — used by breadcrumbs */
export const pageLabels: Record<string, string> = {
  "/": "Inicio",
  // Build from navItems
  ...Object.fromEntries(
    navItems.flatMap((item) => [
      [item.href, item.label],
      ...item.columns.flatMap((col) =>
        col.links.map((link) => [link.href, link.label])
      ),
    ])
  ),
  // Audience pages
  ...Object.fromEntries(audienceLinks.map((l) => [l.href, l.label])),
  // Extra pages not in nav
  "/eventos": "Eventos",
  "/contacto": "Contacto",
  "/mediateca": "Mediateca",
  "/buscar": "Buscar",
  "/politica-privacidad": "Política de Privacidad",
  "/estudiantes/horarios": "Horarios",
  "/estudiantes/tramites": "Trámites",
  "/estudiantes/calendario-academico": "Calendario Académico",
  "/estudiantes/examenes": "Exámenes",
  "/estudiantes/bienestar": "Bienestar Estudiantil",
  "/estudiantes/becas": "Becas",
  "/estudiantes/recursos": "Recursos",
  "/docentes/directorio": "Directorio",
  "/docentes/tramites": "Trámites",
  "/docentes/convocatorias": "Convocatorias",
  "/docentes/recursos": "Recursos",
  "/graduados/asociacion": "Asociación de Egresados",
  "/graduados/educacion-continua": "Educación Continua",
  "/graduados/verificacion-titulo": "Verificación de Título",
  "/graduados/bolsa-empleo": "Bolsa de Empleo",
  "/mediateca/galeria": "Galería",
  "/mediateca/videos": "Videos",
};
