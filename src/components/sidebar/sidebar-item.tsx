import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  shortcut?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  label,
  onClick,
  shortcut,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      className={`rounded-2xl group text-slate-800 py-3 h-16 justify-start gap-3 text-md w-full transition-all duration-200 hover:bg-white 
        ${isActive ? "hover:text-[#3379E3]" : ""}
        ${isActive ? "bg-white border-2 border-primary/20 text-[#3379E3]" : ""}`}
      aria-label={label}
      onClick={onClick}
      asChild
    >
      <Link href={href}>
        {icon}
        {label}
              <span className="ml-auto text-sm text-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">{shortcut}</span>

      </Link>

    </Button>
  );
};

export default SidebarItem;
