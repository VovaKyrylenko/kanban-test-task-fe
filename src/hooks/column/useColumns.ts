import { fetchColumns } from "@/api/column";
import { useQuery } from "@tanstack/react-query";

export const useColumnsByBoard = (boardId: string) => {
  return useQuery({
    queryKey: ["columsBoard", boardId],
    queryFn: () => fetchColumns(boardId),
    enabled: !!boardId,
  });
};
