export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: 'Institucional' | 'Académica' | 'Investigación' | 'Cultura';
}

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'Nueva Convocatoria de Becas de Excelencia 2026',
    excerpt: 'El Centro Regional Universitario de Veraguas anuncia la apertura del proceso de selección para becas académicas.',
    content: 'Se informa a toda la comunidad estudiantil que a partir del próximo lunes se abrirá el portal para la recepción de documentos...',
    date: '2026-02-25',
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    category: 'Académica',
  },
  {
    id: '2',
    title: 'Inauguración del Nuevo Laboratorio de Ciencias Básicas',
    excerpt: 'Contamos con equipos de última generación para fortalecer la investigación en nuestra región.',
    content: 'Con la presencia de autoridades universitarias, se dio por inaugurado el nuevo complejo de laboratorios que beneficiará a cientos de estudiantes...',
    date: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800&auto=format&fit=crop',
    category: 'Investigación',
  },
  {
    id: '3',
    title: 'Exitoso Festival de Cultura y Tradiciones Veragüenses',
    excerpt: 'Estudiantes y docentes celebraron la identidad regional con una muestra de folclore y gastronomía.',
    content: 'El patio central se llenó de colorido y alegría durante la jornada cultural que destacó las raíces de nuestra provincia...',
    date: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
    category: 'Cultura',
  },
  {
    id: '4',
    title: 'Convenio de Cooperación Internacional con Universidades Europeas',
    excerpt: 'La UP-CRUV fortalece sus lazos globales para programas de intercambio estudiantil y docente.',
    content: 'Este nuevo acuerdo permitirá que estudiantes de último año realicen pasantías de investigación en instituciones de prestigio internacional...',
    date: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop',
    category: 'Institucional',
  },
];
