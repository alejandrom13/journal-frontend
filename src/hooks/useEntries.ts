import { getAllEntries, updateEntry } from "@/actions/entries";
import { useDateStore } from "@/app/states/calendarState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Define types for your data
type Entry = {
  id: string;
  type: string;
  content: any;
  updatedAt: string;
};

type UpdateEntryVariables = {
  id: string;
  type: string;
  content: any;
  updatedAt: string;
};



const queryKey = {
  ALL_ENTRIES: "allEntries",
};

const useEntries = (selectedDate: Date) => {

  const queryClient = useQueryClient();

  // Mutation for updating an entry
  const {
    mutate,
    isError: isMutationError,
    isPending: isPending,
    isSuccess: isMutationSuccess,
    data: mutationData,
  } = useMutation({
    mutationFn: ({ id, type, content, updatedAt }: UpdateEntryVariables) =>
      updateEntry({
        id,
        type,
        content,
        updatedAt,
      }),
    onSuccess: () => {
      toast.success("Note updated");
      queryClient.refetchQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
      console.log("Passed invalidation");
    },
    onError: (error: any) => {
      console.error("Error", error);
    },
  });

  // Query for fetching all entries
  const { isLoading, isError, data, isSuccess } = useQuery<Entry[]>({
    queryKey: [queryKey.ALL_ENTRIES, selectedDate],
    queryFn: () => getAllEntries(selectedDate),
    enabled: !!selectedDate,
    retry: 1,
  });

  return {
    // Mutation
    mutate,
    isMutationError,
    isPending,
    isMutationSuccess,
    mutationData,

    // Query
    isLoading,
    isError,
    data,
    isSuccess,
  };
};

export default useEntries;
