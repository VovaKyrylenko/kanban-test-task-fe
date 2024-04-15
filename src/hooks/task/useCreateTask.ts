import { createTask } from "@/api/task";
import { ICreateTask } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: ({ columnId, body }: { columnId: string; body: ICreateTask }) =>
      createTask(columnId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
