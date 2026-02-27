import { useState, useRef, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";

interface Props {
  transparent?: boolean;
}

export default function SearchOverlay({ transparent }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex items-center">
      {/* Search Input Container */}
      <div
        className={`absolute right-full mr-2 flex items-center transition-all duration-300 ease-out ${isOpen
            ? "w-[240px] opacity-100 pointer-events-auto"
            : "w-0 opacity-0 pointer-events-none"
          }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className={`w-full rounded-full border border-white/20 bg-green-950/40 px-4 py-1.5 text-sm text-white backdrop-blur-md outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/30 transition-all ${transparent ? "bg-black/20" : "bg-green-950/40"
            }`}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
            if (e.key === "Enter") {
              // Handle search search
              console.log("Searching for:", query);
              window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
            }
          }}
        />
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggle}
        type="button"
        aria-label={isOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${isOpen
            ? "bg-gold-500 text-green-950 rotate-90"
            : "text-white/60 hover:bg-white/10 hover:text-gold-400"
          }`}
      >
        {isOpen ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <SearchIcon className="h-[18px] w-[18px]" />
        )}
      </button>

      {/* Backdrop to close when clicking outside (optional, but good for UX) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
