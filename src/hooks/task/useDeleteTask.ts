import { deleteTask } from "@/api/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
