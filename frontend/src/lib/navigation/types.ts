export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  heading?: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  columns: NavColumn[];
}

export interface SectionMeta {
  title: string;
  description: string;
}
