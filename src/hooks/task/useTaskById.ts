import { fetchTask } from "@/api/task";
import { useQuery } from "@tanstack/react-query";

export const useTaskById = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask(taskId),
    enabled: !!taskId,
  });
};
