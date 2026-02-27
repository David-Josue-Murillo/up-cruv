export interface Banner {
  id: string;
  image: string;
  title: string;
  description?: string;
  link?: string;
}

export interface CarouselProps {
  banners: Banner[];
  autoInterval?: number;
}