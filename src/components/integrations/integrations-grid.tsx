"use client";
import { motion } from "framer-motion";
import IntegrationsCard from "./integrations-card";
import {
  GoogleCalendarIcon,
  SpotifyIcon,
  UberIcon,
  LinearIcon,
} from "@/icons/custom-icons";
import CalendarIntegrationButton from "@/integrations/google-calendar/integration";
import { useQuery } from "@tanstack/react-query";
import { getAllIntegrations } from "@/actions/integrations";
import HomeSkeletonLoader from "@/app/(protected)/home/skeleton";

const IntegrationsGrid = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["integrations"],
    queryFn: () => getAllIntegrations(),
  });

  if (isLoading) {
    return (

      <HomeSkeletonLoader />
    );
  }

  const integrations = [
    {
      title: "Google Calendar",
      description: "Sync your Google Calendar events  ",
      icon: <GoogleCalendarIcon />,
      hasButton: true,
      button: (
        <CalendarIntegrationButton
          isLinked={isGoogleCalendarLinked(data!)}
          integration={data.find(
            (integration: any) => integration.type === "google-calendar"
          )}
        />
      ),
    },
    {
      title: "Spotify",
      description: "Sync your listening history  ",
      icon: <SpotifyIcon />,
      hasButton: false,
    },
    {
      title: "Uber",
      description: "Sync your Uber rides  ",
      icon: <UberIcon />,
      hasButton: false,
    },
    {
      title: "Linear",
      description: "Sync your Linear issues",
      icon: <LinearIcon />,
      hasButton: false,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {integrations.map((integration) => (
        <IntegrationsCard key={integration.title} {...integration} />
      ))}
    </motion.div>
  );
};

export default IntegrationsGrid;

const isGoogleCalendarLinked = (data: any[]) => {
  return (
    data?.find((integration) => integration.type === "google-calendar") !==
    undefined
  );
};
