import { useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";
import { useCreateTask } from "@/hooks/task/useCreateTask";
import { useModalContext } from "@/providers/modal-provider";
import { useTasks } from "@/hooks/task/useTasks";

export const AddTaskModal = () => {
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");

  const {
    isCreateTaskModalOpen,
    handleCloseCreateTaskModal,
    columnIdToCreateTask,
  } = useModalContext();

  const { mutate: createTask } = useCreateTask();
  const { data: columnTasks } = useTasks(columnIdToCreateTask ?? "");

  // Event handler for title input change
  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitleInput(event.target.value);
  };

  // Event handler for description input change
  const handleDescriptionInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionInput(event.target.value);
  };

  // Add task button click
  const onButtonClick = async () => {
    if (!titleInput.trim() || !descriptionInput.trim()) {
      toast.error("Please provide both title and description.");
      return;
    }
    if (!columnIdToCreateTask) {
      toast.error("Please try again.");
      return;
    }
    createTask({
      columnId: columnIdToCreateTask,
      body: {
        title: titleInput,
        description: descriptionInput,
        position: columnTasks.length + 1,
      },
    });
    handleCloseCreateTaskModal();
  };

  return (
    <Modal open={isCreateTaskModalOpen} onClose={handleCloseCreateTaskModal}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" textAlign="center" mb={2} fontWeight="bold">
          Add Task
        </Typography>
        <IconButton
          onClick={handleCloseCreateTaskModal}
          size="small"
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <Close />
        </IconButton>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={titleInput}
          onChange={handleTitleInputChange}
          sx={{ mb: 2 }}
          required
        />
        {/* Task description input */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={descriptionInput}
          onChange={handleDescriptionInputChange}
          sx={{ mb: 2 }}
          multiline
          rows={10}
          required
        />
        <Button
          variant="contained"
          onClick={onButtonClick}
          size="large"
          sx={{ width: "100%" }}
        >
          Add Task
        </Button>
      </Paper>
    </Modal>
  );
};
