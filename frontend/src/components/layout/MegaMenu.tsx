import { useState, useRef, useCallback } from "react";
import { navItems } from "../../lib/navigation";
import { useEscapeKey } from "../../lib/hooks/useEscapeKey";
import { useClickOutside } from "../../lib/hooks/useClickOutside";
import NavItemButton from "./NavItemButton";

export default function MegaMenu({ currentPath = "/" }: { currentPath?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const open = useCallback((index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveIndex(null), 150);
  }, []);

  const clearActive = useCallback(() => setActiveIndex(null), []);
  useEscapeKey(clearActive);
  useClickOutside(navRef, clearActive);

  return (
    <nav ref={navRef} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navItems.map((item, index) => (
          <NavItemButton
            key={item.label}
            item={item}
            index={index}
            isActive={activeIndex === index}
            isCurrent={currentPath.startsWith(item.href) && item.href !== "/"}
            onOpen={open}
            onClose={close}
          />
        ))}
      </ul>
    </nav>
  );
}
