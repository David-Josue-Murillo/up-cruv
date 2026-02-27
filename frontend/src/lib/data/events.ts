export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  type: 'Conferencia' | 'Taller' | 'Deportes' | 'Admisión';
}

export const events: EventItem[] = [
  {
    id: '1',
    title: 'Congreso Internacional de Innovación Educativa',
    description: 'Tres días de ponencias magistrales sobre el futuro de la educación superior en la era digital.',
    date: '2026-03-15',
    time: '09:00 AM',
    location: 'Auditorio Central UP-CRUV',
    image: 'https://images.unsplash.com/photo-1475721027187-4024733923f9?q=80&w=800&auto=format&fit=crop',
    type: 'Conferencia',
  },
  {
    id: '2',
    title: 'Taller Práctico de Inteligencia Artificial para Docentes',
    description: 'Aprende a integrar herramientas de IA en el proceso de enseñanza-aprendizaje de manera ética.',
    date: '2026-03-10',
    time: '02:00 PM',
    location: 'Centro de Informática - Sala B',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    type: 'Taller',
  },
  {
    id: '3',
    title: 'Gran Maratón Universitaria "Corriendo por la Salud"',
    description: 'Únete a la carrera de 5km por las calles de Santiago. Inscripciones abiertas en bienestar estudiantil.',
    date: '2026-03-22',
    time: '06:30 AM',
    location: 'Plaza Principal (Salida)',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop',
    type: 'Deportes',
  },
  {
    id: '4',
    title: 'Jornada de Orientación Vocacional para Graduandos',
    description: 'Descubre tu futuro profesional y conoce los beneficios de estudiar en el Centro Regional de Veraguas.',
    date: '2026-03-05',
    time: '08:30 AM',
    location: 'Gimnasio Universitario',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?q=80&w=800&auto=format&fit=crop',
    type: 'Admisión',
  },
];
