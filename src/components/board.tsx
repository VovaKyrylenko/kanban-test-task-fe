import { CircularProgress, Grid } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "./column";
import { IColumn } from "@/types/index";
import { useColumnsByBoard } from "@/hooks/column/useColumns";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";
import { toast } from "react-toastify";
import { useBoardContext } from "@/providers/board-provider";

export const Board = () => {
  const { boardId } = useBoardContext();
  const { data: columns, isLoading } = useColumnsByBoard(boardId);
  const { mutate: updateTask } = useUpdateTask();

  const handleUpdateTaskStatus = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    try {
      if (destination.droppableId !== source.droppableId) {
        updateTask({
          taskId: draggableId,
          body: {
            column: destination.droppableId,
            position: destination.index,
          },
        });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status. Please try again later.");
    }
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleUpdateTaskStatus}>
          <Grid container spacing={3}>
            {columns.map((column: IColumn) => (
              <Grid item key={column._id} xs={4}>
                <Column column={column} />
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      )}
    </>
  );
};
