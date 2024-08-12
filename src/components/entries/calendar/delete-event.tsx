import { deleteEvent } from "@/actions/calendar";
import { deleteEntry } from "@/actions/entries";
import queryKey from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LucideLoader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteEventButton = ({ eventId }: { eventId: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      toast.success("Entry deleted");
      queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
    },
  });

  const handleDelete = () => {
    mutate(eventId);
  };

  return (
    <div
      className="ml-auto p-1 "
      onClick={(e) => {
        e.stopPropagation(); // This prevents the click event from bubbling up to the parent

        handleDelete();
      }}
    >
      {isPending ? (
        <>
          <LucideLoader2
            size={18}
            className="text-black/50 animate-spin opacity-100"
          />
        </>
      ) : isSuccess ? (
        <>
          <LucideLoader2
            size={18}
            className="text-black/50 animate-spin opacity-100"
          />
        </>
      ) : (
        <Trash2
          size={18}
          className="text-black/50 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition cursor-pointer"
        />
      )}
    </div>
  );
};

export default DeleteEventButton;
