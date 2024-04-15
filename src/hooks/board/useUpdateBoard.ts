import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "@/utils";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateBoard"],
    mutationFn: ({ boardId, name }: { boardId: string; name: string }) =>
      updateBoard(boardId, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["board"] }),
  });
};
