import { memo } from "react";
import type { NavItem } from "../../lib/navigation";
import ChevronDown from "../icons/ChevronDown";
import ArrowRight from "../icons/ArrowRight";
import { styles } from "../const/styles";

/* ---- Hoisted static styles (avoids re-creating objects on every render) ---- */

const { dropdownPanelStyle, goldStripeStyle, activeIndicatorBase } = styles();

interface Props {
  item: NavItem;
  index: number;
  isActive: boolean;
  isCurrent: boolean;
  onOpen: (i: number) => void;
  onClose: () => void;
}

const NavItemButton = memo(function NavItemButton({ item, index, isActive, isCurrent, onOpen, onClose }: Props) {
  const hasDropdown = item.columns.length > 0;

  return (
    <li className='relative' onMouseEnter={() => hasDropdown && onOpen(index)} onMouseLeave={onClose}>
      <a
        href={item.href}
        aria-current={isCurrent ? "page" : undefined}
        className='group flex items-center gap-1 px-4 py-3 text-[0.8125rem] font-medium tracking-wide transition-colors duration-200 text-white/80 hover:text-white'
        style={{
          color: isActive || isCurrent ? "var(--color-gold-400)" : undefined,
        }}
        onFocus={() => hasDropdown && onOpen(index)}
        onClick={(e) => {
          if (hasDropdown) {
            e.preventDefault();
            onOpen(index);
          }
        }}
      >
        {item.label}
        {hasDropdown ? (
          <ChevronDown
            className='h-3.5 w-3.5 transition-transform duration-200 text-white/50 group-hover:text-white/70'
            style={{
              transform: isActive ? "rotate(180deg)" : undefined,
              color: isActive ? "var(--color-gold-400)" : undefined,
            }}
          />
        ) : null}
      </a>

      {/* Active indicator — gold underline */}
      <div
        className='absolute bottom-0 left-4 right-4 h-[2px] transition-all duration-300 ease-out origin-center'
        style={{
          ...activeIndicatorBase,
          transform: `scaleX(${isActive || isCurrent ? 1 : 0})`,
          opacity: isActive || isCurrent ? 1 : 0,
          boxShadow: isActive || isCurrent ? "0 0 8px rgba(212,175,55,0.4)" : "none",
        }}
      />

      {/* Mega dropdown — dark glass panel */}
      {hasDropdown ? (
        <div
          className='absolute left-1/2 top-full z-50 pt-2 -translate-x-1/2 transition-all duration-200 ease-out'
          style={{
            opacity: isActive ? 1 : 0,
            pointerEvents: isActive ? "auto" : "none",
            transform: `translateX(-50%) translateY(${isActive ? "0" : "-4px"})`,
          }}
        >
          <div className='relative min-w-md overflow-hidden rounded-xl' style={dropdownPanelStyle}>
            {/* Top gold accent stripe */}
            <div className='h-[2px]' style={goldStripeStyle} />

            <div className='p-6'>
              {/* Section title */}
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-lg font-bold text-gold-400' style={{ fontFamily: "var(--font-heading)" }}>
                  {item.label}
                </h3>
                <a
                  href={item.href}
                  className='flex items-center gap-1 text-xs font-medium text-gold-500/70 transition-colors hover:text-gold-400'
                >
                  Ver todo
                  <ArrowRight className='h-3 w-3' />
                </a>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                {item.columns.map((col, colIdx) => (
                  <div key={colIdx}>
                    {col.heading && (
                      <p className='mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/50'>{col.heading}</p>
                    )}
                    <ul className='space-y-0.5'>
                      {col.links.map((link, linkIdx) => (
                        <li
                          key={link.href}
                          style={{
                            animationDelay: isActive ? `${colIdx * 60 + linkIdx * 30}ms` : "0ms",
                          }}
                          className={isActive ? "animate-[fadeSlideIn_0.25s_ease-out_both]" : ""}
                        >
                          <a
                            href={link.href}
                            className='group/link flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-all duration-150 hover:bg-white/5 hover:text-gold-400'
                          >
                            <span className='h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-200 group-hover/link:bg-gold-500 group-hover/link:shadow-[0_0_6px_rgba(212,175,55,0.5)]' />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
});

export default NavItemButton;
