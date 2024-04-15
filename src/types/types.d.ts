export interface ITask {
  _id: string;
  column: string;
  title: string;
  description: string;
  position: number;
}

export interface ICreateTask {
  title: string;
  description: string;
  position: number;
}

export interface IUpdateTask {
  column?: string;
  title?: string;
  description?: string;
  position?: number;
}

export interface IColumn {
  _id: string;
  board: string;
  name: TaskStatus;
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
