import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "./column";
import { GroupedTasks, ITask, TaskStatus } from "@/types";
interface BoardProps {
  handleOpenAddTaskModal: (status: TaskStatus) => void;
  loading: boolean;
  groupedTasks: GroupedTasks;
  handleUpdateTaskStatus: (result: DropResult) => Promise<void>;
  handleDeleteTask: (taskToDeleteId: string) => void;
  handleOpenEditTaskModal: (task: ITask) => void;
  handleOpenDetailsTaskModal: (task: string) => void;
}
export const Board: React.FC<BoardProps> = ({
  handleOpenAddTaskModal,
  loading,
  groupedTasks,
  handleUpdateTaskStatus,
  handleDeleteTask,
  handleOpenEditTaskModal,
  handleOpenDetailsTaskModal,
}) => {
  return (
    <div aria-busy={loading} aria-live="polite">
      {loading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleUpdateTaskStatus}>
          <Grid container spacing={3}>
            {Object.entries(groupedTasks).map(([status, tasks]) => (
              <Grid item key={status} xs={4}>
                {tasks && (
                  <Column
                    title={status as TaskStatus}
                    tasks={tasks}
                    handleOpenAddTaskModal={handleOpenAddTaskModal}
                    handleDeleteTask={handleDeleteTask}
                    handleOpenEditTaskModal={handleOpenEditTaskModal}
                    handleOpenDetailsTaskModal={handleOpenDetailsTaskModal}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      )}
    </div>
  );
};
