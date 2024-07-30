import IntegrationsCard from "@/components/integrations/integrations-card";
import IntegrationsGrid from "@/components/integrations/integrations-grid";
import { Button } from "@/components/ui/button";
import {
  GoogleCalendarIcon,
  LinearIcon,
  SpotifyIcon,
  UberIcon,
} from "@/icons/custom-icons";
import { DashboardIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { BedIcon, BoxIcon, LayoutDashboardIcon } from "lucide-react";
import React from "react";



const IntegrationsPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 ">
        <h1 className=" text-3xl font-medium">Integrations</h1>
        <p className="text-black/80">
          Connect Janna AI with your existing tools
        </p>
      </div>

      <IntegrationsGrid />
    </div>
  );
};

export default IntegrationsPage;



