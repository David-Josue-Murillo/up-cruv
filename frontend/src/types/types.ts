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

export type QuickLinkIcon = 'calendar' | 'credit-card' | 'document' | 'computer';

export interface QuickLink {
  id: string;
  icon: QuickLinkIcon;
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface QuickLinksProps {
  links: QuickLink[];
}