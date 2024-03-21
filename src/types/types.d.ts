export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface IBoard {
  _id: string;
  name: string;
  tasks: ITask[];
}

export type TaskStatus = "TODO" | "IN PROGRESS" | "DONE";

type GroupedTasks = {
  [status in TaskStatus]: ITask[];
};
