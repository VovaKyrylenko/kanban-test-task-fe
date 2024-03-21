import React, { useEffect, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import {
  Board,
  AddTaskModal,
  EditTaskModal,
  DetailsTaskModal,
  BoardModal,
  BoardCardInfo,
  SearchBar,
} from "@/components/";
import {
  getBoard,
  createTask,
  groupTasks,
  updateTask,
  deleteTask,
  getTask,
  updateBoard,
  deleteBoard,
  createBoard,
} from "@/utils/";
import { toast } from "react-toastify";
import { DropResult } from "react-beautiful-dnd";
import { GroupedTasks, IBoard, ITask, TaskStatus } from "@/types/";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
  // Search query state
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem("boardId") || ""
  );
  // Grouped tasks state
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({
    TODO: [],
    "IN PROGRESS": [],
    DONE: [],
  });

  // State for the Add Task modal
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [taskStatusToCreate, setTaskStatusToCreate] =
    useState<TaskStatus | null>(null);

  // State for the Edit Task modal
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // State for the Details Task modal
  const [isDetailsTaskModalOpen, setIsDetailsTaskModalOpen] =
    useState<boolean>(false);
  const [taskToShowDeatils, setTaskToShowDeatils] = useState<ITask | null>(
    null
  );

  // State for the Board modal
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] =
    useState<boolean>(false);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] =
    useState<boolean>(false);

  // Fetching board from local storage
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardId = localStorage.getItem("boardId");
        if (boardId) {
          const fetchedBoard = await getBoard(boardId);
          setCurrentBoard(fetchedBoard);
          setGroupedTasks(groupTasks(fetchedBoard));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching board:", error);
        toast.error("Error fetching board. Please try again later.");
      }
    };

    fetchBoard();
  }, []);

  /* TASK HANDLERS */

  // Add a new task
  const handleAddTask = async (title: string, description: string) => {
    if (typeof currentBoard?._id === "string") {
      try {
        await createTask(
          currentBoard?._id,
          title,
          description,
          taskStatusToCreate as TaskStatus
        );
        const updatedBoard = await getBoard(currentBoard?._id);
        setGroupedTasks(groupTasks(updatedBoard));

        setIsAddTaskModalOpen(false);
      } catch (error) {
        console.error("Error creating new task:", error);
        toast.error("Error creating new task. Please try again later.");
      }
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskToDeleteId: string) => {
    try {
      await deleteTask(taskToDeleteId);

      if (typeof currentBoard?._id === "string") {
        const updatedBoard = await getBoard(currentBoard?._id);
        setGroupedTasks(groupTasks(updatedBoard));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task. Please try again later.");
    }
  };

  // Update task data
  const handleUpdateTaskData = async (
    taskToUpdateId: string,
    body: { title: string; description: string }
  ) => {
    try {
      await updateTask(taskToUpdateId, body);

      if (typeof currentBoard?._id === "string") {
        const updatedBoard = await getBoard(currentBoard?._id);
        setGroupedTasks(groupTasks(updatedBoard));
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task. Please try again later.");
    }
  };

  // Update task status
  const handleUpdateTaskStatus = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    try {
      if (destination.droppableId !== source.droppableId) {
        updateTask(draggableId, { status: destination.droppableId });
      }

      if (typeof currentBoard?._id === "string") {
        setGroupedTasks((prevGroupedTasks) => {
          const updatedGroupedTasks = { ...prevGroupedTasks };
          const [removedTask] = updatedGroupedTasks[
            source.droppableId as TaskStatus
          ].splice(source.index, 1);
          updatedGroupedTasks[destination.droppableId as TaskStatus].splice(
            destination.index,
            0,
            removedTask
          );
          return updatedGroupedTasks;
        });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status. Please try again later.");
    }
  };

  /* BOARD HANDLERS */

  const handleUpdateBoardData = async (body: { name: string }) => {
    try {
      if (currentBoard) await updateBoard(currentBoard?._id, body);
      if (typeof currentBoard?._id === "string") {
        const updatedBoard = await getBoard(currentBoard?._id);
        setCurrentBoard(updatedBoard);
      }
    } catch (error) {
      console.error("Error updating board:", error);
      toast.error("Error updating board. Please try again later.");
    }
  };

  const handleCreateBoard = async (body: { name: string }) => {
    try {
      const newBoard = await createBoard(body.name);
      setCurrentBoard(newBoard);
      setGroupedTasks(groupTasks(newBoard));
      setSearchQuery(newBoard._id);
      localStorage.setItem("boardId", newBoard._id);
    } catch (error) {
      console.error("Error creating board:", error);
      toast.error("Error creating board. Please try again later.");
    }
  };

  const handleDeleteBoard = async () => {
    if (typeof currentBoard?._id === "string") {
      try {
        await deleteBoard(currentBoard?._id);
        setCurrentBoard(null);
        setSearchQuery("");
        localStorage.setItem("boardId", "");
      } catch (error) {
        console.error("Error creating board:", error);
        toast.error("Error creating board. Please try again later.");
      }
    }
  };

  /* MODAL HANDLERS */

  // Open Add Task modal
  const handleOpenAddTaskModal = (status: TaskStatus) => {
    setIsAddTaskModalOpen(true);
    setTaskStatusToCreate(status);
  };

  // Close Add Task modal
  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  // Open Edit Task modal
  const handleOpenEditTaskModal = (task: ITask) => {
    setTaskToUpdate(task);
    setIsEditModalOpen(true);
  };

  // Close Edit Task modal
  const handleCloseEditingModal = () => {
    setIsEditModalOpen(false);
  };

  // Open Details Task modal
  const handleOpenDetailsTaskModal = async (taskId: string) => {
    setIsDetailsTaskModalOpen(true);
    try {
      const taskDetails = await getTask(taskId);
      setTaskToShowDeatils(taskDetails);
    } catch (error) {
      console.error("Error getting task:", error);
      toast.error("Error getting task. Please try again later.");
    }
  };

  // Close Details Task modal
  const handleCloseDetailsTaskModal = () => {
    setIsDetailsTaskModalOpen(false);
  };

  // Open Details Board modal
  const handleOpenEditBoardModal = () => {
    setIsEditBoardModalOpen(true);
  };

  // Close Details Board modal
  const handleCloseEditBoardModal = () => {
    setIsEditBoardModalOpen(false);
  };

  // Open Details Board modal
  const handleOpenCreateBoardModal = () => {
    setIsCreateBoardModalOpen(true);
  };

  // Close Details Board modal
  const handleCloseCreateBoardModal = () => {
    setIsCreateBoardModalOpen(false);
  };

  /* HANDLING SEARCH */

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const fetchedBoard = await getBoard(searchQuery);
      setGroupedTasks(groupTasks(fetchedBoard));
      setCurrentBoard(fetchedBoard);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching board:", error);
      toast.error("Error fetching board. Please try again later.");
      setLoading(false);
    }
    localStorage.setItem("boardId", searchQuery);
  };
  return (
    <>
      <Container sx={{ my: "45px" }}>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
          mb={"50px"}
          alignItems={"stretch"}
          sx={{ height: "fit-content" }}
        >
          <SearchBar
            currentBoard={currentBoard}
            searchQuery={searchQuery}
            handleOpenCreateBoardModal={handleOpenCreateBoardModal}
            handleSearch={handleSearch}
            handleSearchChange={handleSearchChange}
          />
          {currentBoard && (
            <BoardCardInfo
              currentBoard={currentBoard}
              handleDeleteBoard={handleDeleteBoard}
              handleOpenEditBoardModal={handleOpenEditBoardModal}
            />
          )}
        </Stack>
        {currentBoard ? (
          <Board
            loading={loading}
            groupedTasks={groupedTasks}
            handleOpenAddTaskModal={handleOpenAddTaskModal}
            handleDeleteTask={handleDeleteTask}
            handleOpenEditTaskModal={handleOpenEditTaskModal}
            handleUpdateTaskStatus={handleUpdateTaskStatus}
            handleOpenDetailsTaskModal={handleOpenDetailsTaskModal}
          />
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign={"center"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Search board or create a new one
          </Typography>
        )}
      </Container>
      {/* Add Task Modal */}
      <AddTaskModal
        open={isAddTaskModalOpen}
        handleAddTask={handleAddTask}
        onCloseModal={handleCloseAddTaskModal}
      />
      {/* Edit Task Modal */}
      <EditTaskModal
        open={isEditModalOpen}
        taskToUpdate={taskToUpdate}
        handleUpdateTaskData={handleUpdateTaskData}
        onCloseModal={handleCloseEditingModal}
      />
      {/* Details Task Modal */}
      <DetailsTaskModal
        open={isDetailsTaskModalOpen}
        task={taskToShowDeatils}
        onCloseModal={handleCloseDetailsTaskModal}
      />
      {/* Edit Board Modal */}
      <BoardModal
        open={isEditBoardModalOpen}
        title={"Edit Task"}
        currentBoard={currentBoard}
        onSubmit={handleUpdateBoardData}
        onCloseModal={handleCloseEditBoardModal}
      />
      {/* Create Board Modal */}
      <BoardModal
        open={isCreateBoardModalOpen}
        title={"Create Task"}
        onSubmit={handleCreateBoard}
        onCloseModal={handleCloseCreateBoardModal}
      />
    </>
  );
};

export default HomePage;
