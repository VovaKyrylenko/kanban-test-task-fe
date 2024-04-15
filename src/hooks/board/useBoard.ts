import { fetchBoard } from "@/api/board";
import { useQuery } from "@tanstack/react-query";

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: () => fetchBoard(boardId),
    enabled: !!boardId,
  });
};
