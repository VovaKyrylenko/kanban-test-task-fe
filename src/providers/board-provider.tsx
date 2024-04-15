import { createContext, useContext } from "react";

interface IBoardContext {
  boardId: string;
  setBoardId: (boardId: string) => void;
}
const BoardContext = createContext<IBoardContext>({
  boardId: "",
  setBoardId: () => {},
});

export const useBoardContext = () => useContext(BoardContext);

interface IBoardProviderProps {
  children?: React.ReactNode;
  value: IBoardContext;
}

export const BoardProvider: React.FC<IBoardProviderProps> = ({
  children,
  value,
}) => {
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
