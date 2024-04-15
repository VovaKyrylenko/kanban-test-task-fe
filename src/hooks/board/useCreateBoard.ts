import { createBoard } from "@/api/board";
import { useMutation } from "@tanstack/react-query";

export const useCreateBoard = () => {
  return useMutation({
    mutationKey: ["createBoard"],
    mutationFn: (name: string) => createBoard(name),
  });
};
