import { useState, useCallback } from "react";
import { navItems, audienceLinks } from "../../lib/navigation";
import { useEscapeKey } from "../../lib/hooks/useEscapeKey";
import { useBodyScrollLock } from "../../lib/hooks/useBodyScrollLock";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import SearchIcon from "../icons/SearchIcon";
import AccordionItem from "./AccordionItem";
import { styles } from "../const/styles";

const { drawerStyle } = styles();

export function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useBodyScrollLock(isOpen);
  useEscapeKey(closeMenu);

  return (
    <>
      <button
        onClick={toggle}
        className='relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden'
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        {isOpen ? <CloseIcon className='h-5 w-5' /> : <MenuIcon className='h-5 w-5' />}
      </button>

      {/* Backdrop */}
      <div
        className='fixed inset-0 z-40 bg-green-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden'
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer — dark glass theme */}
      <div
        className='fixed right-0 top-0 z-40 flex h-full w-full max-w-sm flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden'
        style={{
          ...drawerStyle,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Drawer header */}
        <div className='flex items-center justify-between border-b border-white/10 px-5 py-4'>
          <span className='text-lg font-bold text-gold-400' style={{ fontFamily: "var(--font-heading)" }}>
            Menú
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className='flex h-9 w-9 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white'
            aria-label='Cerrar menú'
          >
            <CloseIcon className='h-5 w-5' />
          </button>
        </div>

        {/* Scrollable content */}
        <div className='flex-1 overflow-y-auto overscroll-contain'>
          {/* Audience buttons */}
          <div className='border-b border-white/10 px-5 py-4'>
            <p className='mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/50'>Soy...</p>
            <div className='flex gap-2'>
              {audienceLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='flex-1 rounded-lg border border-white/10 py-2.5 text-center text-xs font-medium text-white/70 transition-all hover:border-gold-500/30 hover:bg-gold-500/10 hover:text-gold-400'
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className='border-b border-white/10 px-5 py-4'>
            <div className='flex items-center gap-3 rounded-lg bg-white/5 px-4 py-2.5 border border-white/10'>
              <SearchIcon className='h-4 w-4 text-white/50' />
              <input
                type='text'
                placeholder='Buscar en CRUV...'
                className='w-full bg-transparent text-sm text-white placeholder:text-white/50 outline-none'
              />
            </div>
          </div>

          {/* Nav accordion */}
          <nav className='px-5 py-3'>
            {navItems.map((item) => (
              <AccordionItem key={item.label} item={item} onNavigate={() => setIsOpen(false)} />
            ))}
          </nav>
        </div>

        {/* Drawer footer */}
        <div className='border-t border-white/10 bg-green-950/50 px-5 py-4'>
          <a href='/contacto' className='btn-gold block rounded-full py-3 text-center text-sm'>
            Contacto
          </a>
        </div>
      </div>
    </>
  );
}
