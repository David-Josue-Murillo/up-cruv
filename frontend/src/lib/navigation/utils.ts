import type { NavLink } from "./types";
import { pageLabels, navItems } from "./data";

/** Get breadcrumb items from a URL path */
export function getBreadcrumbs(pathname: string): NavLink[] {
  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  const crumbs: NavLink[] = [{ label: "Inicio", href: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = pageLabels[currentPath] || segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href: currentPath });
  }

  return crumbs;
}

/** Get all sidebar links for a section (flattened from nav columns) */
export function getSectionLinks(sectionSlug: string): NavLink[] {
  const item = navItems.find(
    (n) => n.href === `/${sectionSlug}`
  );
  if (!item) return [];

  return item.columns.flatMap((col) => col.links);
}
