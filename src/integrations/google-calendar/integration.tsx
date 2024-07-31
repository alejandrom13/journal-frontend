// pages/integrations.tsx
import { useState, useEffect } from "react";
import { google } from "googleapis";
import { Button } from "@/components/ui/button";
import { handleLinkCalendar } from "./handleLink";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIntegration } from "@/actions/integrations";
import queryKey from "@/lib/queryKeys";
const apiUrl = process.env.API_URL;

const CalendarIntegrationButton = ({
  isLinked,
  integration,
}: {
  isLinked: boolean;
  integration: any;
}) => {
  const [isLinkedState, setIsLinked] = useState(isLinked);

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLinked(isLinked);
  }, [isLinked]);

  const {mutate, isError, isSuccess, isPending} = useMutation({
    mutationKey: [queryKey.DELETE_INTEGRAION],
    mutationFn: () => deleteIntegration(integration.id),
    onSuccess: () => {
      setIsLinked(false);
      queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
    },
    onError: (error: any) => {
      console.error("Error", error);
    },
  });

  return (
    <>
      {isLinkedState ? (
        <Button
          variant="ghost"
          size={"lg"}
          className="w-full rounded-full bg-white hover:bg-white/80 text-primary"
          disabled={isPending}
          onClick={() => {
            mutate();
          }}
        >
          {
            isPending ? "Unlinking..." : "Unlink calendar"
          }
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
