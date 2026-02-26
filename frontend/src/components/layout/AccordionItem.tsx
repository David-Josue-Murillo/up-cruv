import { useState } from "react";
import type { NavItem } from "../../lib/navigation";
import ChevronDown from "../icons/ChevronDown";
import ArrowRight from "../icons/ArrowRight";

export default function AccordionItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.columns.length > 0 && item.columns.some((c) => c.links.length > 0);

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        onClick={onNavigate}
        className="flex items-center py-3.5 text-[0.9375rem] font-medium text-white/80 transition-colors hover:text-gold-400"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-3.5 text-[0.9375rem] font-medium text-white/80 transition-colors hover:text-gold-400"
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown
          className="h-4 w-4 text-white/50 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
        />
      </button>

      {/* Collapsible content */}
      <div
        className="grid transition-all duration-250 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          paddingBottom: isOpen ? "0.75rem" : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          {item.columns.map((col, colIdx) => (
            <div key={colIdx} className="mb-2 last:mb-0">
              {col.heading && (
                <p className="mb-1.5 pl-3 text-[0.625rem] font-semibold uppercase tracking-widest text-white/50">
                  {col.heading}
                </p>
              )}
              {col.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-gold-400"
                >
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {/* "Ver todo" link */}
          <a
            href={item.href}
            onClick={onNavigate}
            className="mt-1 flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-gold-500 transition-colors hover:bg-gold-500/10 hover:text-gold-400"
          >
            Ver todo sobre {item.label}
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
