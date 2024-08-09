"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {

  Box,

  LucideLightbulb,
  LucideMessageCircle,
  LucideNotebook,
  LucideSettings2,

} from "lucide-react";

import { ModeToggle } from "../dark-mode";
import { usePathname, useRouter } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";
import SidebarItem from "./sidebar-item";
import { SignedIn, useClerk, UserButton, useUser } from "@clerk/nextjs";
import ThemeSwitcher from "../theme-switcher";
import MainLogo from "@/lib/logo";
import { useLoadingState } from "@/app/(protected)/loadingState";

const tooltipDelay = 50;

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setLoading } = useLoadingState();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const clerk = useUser();

  useEffect(() => {
    if (clerk.user) {
      setLoading(false);
    }
  }, [clerk.user, setLoading]);

  const { openUserProfile } = useClerk();

  const userButtonRef = useRef<HTMLDivElement>(null);

  const handleParentButtonClick = () => {
    // Find the button element inside the UserButton and click it
    if (userButtonRef.current) {
      const userButton = userButtonRef.current.querySelector("button");
      if (userButton) {
        userButton.click();
      }
    }
  };

  return (
    <div className="hidden md:block lg:block py-6 pl-6">
      <aside className="inset-y w-80 rounded-3xl left-0 z-20 flex h-full flex-col  bg-background/50 shadow-[0_4px_22px_0_rgba(0,0,0,0.1)] ">
        <nav className="grid gap-1 p-2 w-full">
          <div className="w-full p-4 bg-white rounded-2xl mb-4 flex items-center justify-center">
            <MainLogo height={40} />
          </div>

          <SidebarItem
            href="/home"
            icon={<LucideNotebook size={20} />}
            label="Journal"
          />
          <SidebarItem
            href="/insights"
            icon={<LucideLightbulb size={20} />}
            label="Insights"
          />
          <SidebarItem
            href="/chat"
            icon={<LucideMessageCircle size={20} />}
            label="Chat"
            rightLabel="BETA"
          />
          <SidebarItem
            href="/integrations"
            icon={<Box size={20} />}
            label="Integrations"
          />

          <SidebarItem
            href="/settings"
            icon={<LucideSettings2 size={20} />}
            label="Settings"
          />
        </nav>
        <nav className="mt-auto grid gap-3 p-2">
          {/* <ModeToggle /> */}
          {/* <Button
            variant="ghost"
            className={`rounded-2xl h-16 text-slate-800 text-md  justify-start gap-3 border border-black/10 hover:bg-white/10`}
            aria-label="Playground"
          >
            <Plus height={24} className="text-primary" />
            New Block
          </Button> */}
          <SignedIn>
            <Button
              variant="ghost"
              className={`rounded-2xl bg-white/50 text-slate-800 h-16 justify-start gap-3 text-md select-none`}
              aria-label="Playground"
              onClick={handleParentButtonClick}

              // onClick={() => {
              //   openUserProfile();
              // }}
            >
              <div ref={userButtonRef} className="h-full items-center flex">
                <UserButton signInUrl="/" />
              </div>
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
