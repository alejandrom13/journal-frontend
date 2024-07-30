"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  Book,
  BotMessageSquare,
  Box,
  Code2,
  ExternalLinkIcon,
  HomeIcon,
  ImageIcon,
  LifeBuoy,
  LucideCircleDot,
  Pen,
  Plus,
  Settings2,
  SquareMenu,
  SquareUser,
  TerminalIcon,
  TerminalSquareIcon,
  Triangle,
} from "lucide-react";

import { ModeToggle } from "../dark-mode";
import { usePathname, useRouter } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";
import SidebarItem from "./sidebar-item";
import { SignedIn, useClerk, UserButton, useUser } from "@clerk/nextjs";

const tooltipDelay = 50;

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const clerk = useUser();
  const { openUserProfile } = useClerk();

  return (
    <div className="py-6 pl-6">
      <aside className="inset-y w-80 rounded-3xl left-0 z-20 flex h-full flex-col  bg-background/50 shadow-[0_4px_22px_0_rgba(0,0,0,0.1)] ">
        <nav className="grid gap-1 p-2 w-full">
          <SidebarItem
            href="/home"
            icon={<HomeIcon size={20} />}
            label="Home"
          />
          <SidebarItem
            href="/blocks"
            icon={<SquareMenu size={20} />}
            label="All Blocks"
          />
          <SidebarItem
            href="/chat"
            icon={<BotMessageSquare size={20} />}
            label="Chat"
          />
          <SidebarItem
            href="/integrations"
            icon={<Box size={20} />}
            label="Integrations"
          />
        </nav>
        <nav className="mt-auto grid gap-3 p-2">
          {/* <ModeToggle /> */}
          <Button
            variant="ghost"
            className={`rounded-2xl h-16 text-slate-800 text-md  justify-start gap-3 border border-black/10 hover:bg-white/10`}
            aria-label="Playground"
          >
            <Plus height={24} className="text-[#3379E3]" />
            New Block
          </Button>
          <SignedIn>
            <Button
              variant="ghost"
              className={`rounded-2xl bg-white/50 text-slate-800 h-16 justify-start gap-3 text-md`}
              aria-label="Playground"
              onClick={() => {
                openUserProfile();
              }}
            >
              <UserButton />
              {clerk?.user?.firstName} {clerk?.user?.lastName?.at(0) + "."}
              {/* <LucideCircleDot height={18} className="ml-auto" /> */}
            </Button>
          </SignedIn>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
