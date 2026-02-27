export interface Career {
  id: string;
  name: string;
  level: "Licenciatura" | "Postgrado" | "Técnico";
  faculty: string;
  duration: string;
  graduateProfile: string;
  image?: string;
}

export const faculties = [
  "Informática, Electrónica y Comunicación",
  "Ciencias de la Educación",
  "Humanidades",
  "Administración de Empresas y Contabilidad",
  "Derecho y Ciencias Políticas",
  "Ciencias Naturales, Exactas y Tecnología",
  "Arquitectura y Diseño",
];

export const levels = ["Licenciatura", "Postgrado", "Técnico"];

export const careers: Career[] = [
  {
    id: "1",
    name: "Licenciatura en Ingeniería en Informática",
    level: "Licenciatura",
    faculty: "Informática, Electrónica y Comunicación",
    duration: "4 años",
    graduateProfile: "Profesional capaz de diseñar, desarrollar y gestionar sistemas de software y soluciones tecnológicas robustas.",
  },
  {
    id: "2",
    name: "Licenciatura en Educación Primaria",
    level: "Licenciatura",
    faculty: "Ciencias de la Educación",
    duration: "4 años",
    graduateProfile: "Docente con vocación y capacidad técnica para la formación integral de niños en el primer nivel de enseñanza.",
  },
  {
    id: "3",
    name: "Maestría en Docencia Superior",
    level: "Postgrado",
    faculty: "Ciencias de la Educación",
    duration: "2 años",
    graduateProfile: "Especialista en procesos de enseñanza-aprendizaje a nivel universitario con sólidos fundamentos pedagógicos.",
  },
  {
    id: "4",
    name: "Técnico en Programación y Análisis de Sistemas",
    level: "Técnico",
    faculty: "Informática, Electrónica y Comunicación",
    duration: "2.5 años",
    graduateProfile: "Técnico especializado en el desarrollo de aplicaciones y mantenimiento de bases de datos.",
  },
  {
    id: "5",
    name: "Licenciatura en Contabilidad",
    level: "Licenciatura",
    faculty: "Administración de Empresas y Contabilidad",
    duration: "4 años",
    graduateProfile: "Auditor y gestor financiero con capacidad para interpretar y aplicar normativas contables internacionales.",
  },
  {
    id: "6",
    name: "Licenciatura en Historia",
    level: "Licenciatura",
    faculty: "Humanidades",
    duration: "4 años",
    graduateProfile: "Investigador y analista del devenir social y cultural, con capacidad crítica para la interpretación histórica.",
  },
  {
    id: "7",
    name: "Postgrado en Gestión Tecnológica",
    level: "Postgrado",
    faculty: "Informática, Electrónica y Comunicación",
    duration: "1.5 años",
    graduateProfile: "Líder en la implementación y dirección de proyectos de innovación tecnológica en organizaciones.",
  },
  {
    id: "8",
    name: "Técnico en Inglés",
    level: "Técnico",
    faculty: "Humanidades",
    duration: "2 años",
    graduateProfile: "Hablante competente del idioma inglés con capacidad de comunicación en diversos entornos laborales.",
  },
];
