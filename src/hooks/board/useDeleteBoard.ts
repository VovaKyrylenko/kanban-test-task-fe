import { deleteBoard } from "@/api/board";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBoard = () => {
  return useMutation({
    mutationKey: ["deleteBoard"],
    mutationFn: (id: string) => deleteBoard(id),
  });
};
