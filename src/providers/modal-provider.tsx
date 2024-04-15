import { createContext, useContext, useState } from "react";

interface ModalContextValue {
  // Modal open/close states
  isCreateTaskModalOpen: boolean;
  isEditTaskModalOpen: boolean;
  isDetailsTaskModalOpen: boolean;
  isCreateBoardModalOpen: boolean;
  isEditBoardModalOpen: boolean;

  // Additional data for specific modals
  columnIdToCreateTask: string | null;
  taskIdToEdit: string | null;
  taskIdToShowDeatils: string | null;

  // Functions to open modals
  handleOpenCreateTaskModal: (columnId: string) => void;
  handleOpenEditTaskModal: (taskId: string) => void;
  handleOpenDetailsTaskModal: (taskId: string) => void;
  handleOpenEditBoardModal: () => void;
  handleOpenCreateBoardModal: () => void;

  // Functions to close modals
  handleCloseCreateTaskModal: () => void;
  handleCloseEditTaskModal: () => void;
  handleCloseDetailsTaskModal: () => void;
  handleCloseEditBoardModalOpen: () => void;
  handleCloseCreateBoardModal: () => void;
}
const ModalContext = createContext<ModalContextValue>({
  isCreateTaskModalOpen: false,
  isEditTaskModalOpen: false,
  isDetailsTaskModalOpen: false,
  isCreateBoardModalOpen: false,
  isEditBoardModalOpen: false,
  columnIdToCreateTask: "",
  taskIdToEdit: "",
  taskIdToShowDeatils: "",
  handleOpenCreateTaskModal: () => {},
  handleOpenEditTaskModal: () => {},
  handleOpenDetailsTaskModal: () => {},
  handleOpenEditBoardModal: () => {},
  handleOpenCreateBoardModal: () => {},
  handleCloseCreateTaskModal: () => {},
  handleCloseEditTaskModal: () => {},
  handleCloseDetailsTaskModal: () => {},
  handleCloseEditBoardModalOpen: () => {},
  handleCloseCreateBoardModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

interface ModalProviderProps {
  children?: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] =
    useState<boolean>(false);
  const [columnIdToCreateTask, setTaskColumnIdToCreateTask] =
    useState<string>("");
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
    useState<boolean>(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState<string>("");
  const [isDetailsTaskModalOpen, setIsDetailsTaskModalOpen] =
    useState<boolean>(false);
  const [taskIdToShowDeatils, setTaskIdToShowDeatils] = useState<string>("");
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] =
    useState<boolean>(false);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] =
    useState<boolean>(false);

  const handleOpenCreateTaskModal = (columnId: string) => {
    setTaskColumnIdToCreateTask(columnId);
    setIsCreateTaskModalOpen(true);
  };
  const handleOpenEditTaskModal = (taskId: string) => {
    setTaskIdToEdit(taskId);
    setIsEditTaskModalOpen(true);
  };
  const handleOpenDetailsTaskModal = (taskId: string) => {
    setIsDetailsTaskModalOpen(true);
    setTaskIdToShowDeatils(taskId);
  };
  const handleOpenEditBoardModal = () => {
    setIsEditBoardModalOpen(true);
  };
  const handleOpenCreateBoardModal = () => {
    setIsCreateBoardModalOpen(true);
  };
  const handleCloseCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };
  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };
  const handleCloseDetailsTaskModal = () => {
    setIsDetailsTaskModalOpen(false);
  };
  const handleCloseEditBoardModalOpen = () => {
    setIsEditBoardModalOpen(false);
  };
  const handleCloseCreateBoardModal = () => {
    setIsCreateBoardModalOpen(false);
  };

  const modalContextValue: ModalContextValue = {
    isCreateTaskModalOpen,
    isEditTaskModalOpen,
    isDetailsTaskModalOpen,
    isEditBoardModalOpen,
    isCreateBoardModalOpen,
    columnIdToCreateTask,
    taskIdToEdit,
    taskIdToShowDeatils,
    handleOpenCreateTaskModal,
    handleOpenEditTaskModal,
    handleOpenDetailsTaskModal,
    handleOpenEditBoardModal,
    handleOpenCreateBoardModal,
    handleCloseCreateTaskModal,
    handleCloseEditTaskModal,
    handleCloseDetailsTaskModal,
    handleCloseEditBoardModalOpen,
    handleCloseCreateBoardModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
