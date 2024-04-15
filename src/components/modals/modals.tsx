import { CreateBoardModal } from "./board/create-board-modal";
import { EditBoardModal } from "./board/edit-board-modal";
import { AddTaskModal } from "./tasks/create-task-modal";
import { DetailsTaskModal } from "./tasks/details-task-modal";
import { EditTaskModal } from "./tasks/edit-task-modal";

export const Modals = () => {
  return (
    <>
      <AddTaskModal />
      <EditTaskModal />
      <CreateBoardModal />
      <DetailsTaskModal />
      <EditBoardModal />
    </>
  );
};
