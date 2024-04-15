import { fetchTasks } from "@/api/task";
import { useQuery } from "@tanstack/react-query";

export const useTasks = (columnId: string) => {
  return useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => fetchTasks(columnId),
    enabled: !!columnId,
  });
};
