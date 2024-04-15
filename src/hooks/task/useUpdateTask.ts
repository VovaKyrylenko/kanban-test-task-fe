import { updateTask } from "@/api/task";
import { IUpdateTask } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: ({ taskId, body }: { taskId: string; body: IUpdateTask }) =>
      updateTask(taskId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
