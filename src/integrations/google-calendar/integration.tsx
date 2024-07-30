// pages/integrations.tsx
import { useState, useEffect } from "react";
import { google } from "googleapis";
import { Button } from "@/components/ui/button";
import { handleLinkCalendar } from "./handleLink";
import { useRouter } from "next/navigation";

const CalendarIntegrationButton = ({ isLinked }: { isLinked: boolean }) => {
  const [isLinkedState, setIsLinked] = useState(isLinked);

  const router = useRouter();

  useEffect(() => {
    setIsLinked(isLinked);
  }, [isLinked]);

  const handleUnlink = async () => {
    await fetch("/api/unlink-calendar", { method: "POST" });

  };

  return (
    <>
      {isLinkedState ? (
        <Button
          variant="ghost"
          size={"lg"}
          className="w-full rounded-full bg-white hover:bg-white/80 text-primary"
          onClick={handleUnlink}
        >
          Unlink calendar
        </Button>
      ) : (
        <Button
          variant="ghost"
          size={"lg"}
          className="w-full rounded-full bg-white hover:bg-white/80 text-primary"
          onClick={async () => {
            const url = await handleLinkCalendar();
            router.push(url);
          }}
        >
          Connect
        </Button>
      )}
    </>
  );
};

export default CalendarIntegrationButton;
