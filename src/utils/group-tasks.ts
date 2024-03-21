import { IBoard, ITask, TaskStatus } from "@/types";

export const groupTasks = (board: IBoard) => {
  const groupedTasks: { [key in TaskStatus]: ITask[] } = {
    TODO: [],
    "IN PROGRESS": [],
    DONE: [],
  };

  board.tasks.forEach((task: ITask) => {
    const status = task.status.toUpperCase() as TaskStatus;
    if (groupedTasks.hasOwnProperty(status)) {
      groupedTasks[status].push(task);
    }
  });

  return groupedTasks;
};
