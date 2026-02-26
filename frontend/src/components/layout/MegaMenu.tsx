import NavItemButton from "./NavItemButton";
import { navItems } from "../../lib/navigation";
import { useMegaMenu } from "@/lib/hooks/useMegaMenu";

interface Props {
  currentPath?: string;
}

export default function MegaMenu({ currentPath = "/" }: Props) {
  const { activeIndex, navRef, open, close } = useMegaMenu();

  return (
    <nav ref={navRef} className='hidden lg:block'>
      <ul className='flex items-center gap-1'>
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
