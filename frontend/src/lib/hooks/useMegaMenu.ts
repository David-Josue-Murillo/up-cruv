import { useCallback, useRef, useState } from 'react'
import { useEscapeKey } from './useEscapeKey';
import { useClickOutside } from './useClickOutside';

export const useMegaMenu = () => {
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

  return {
    // Properties
    activeIndex,
    navRef,

    // Methods or Actions
    open,
    close
  }
}
