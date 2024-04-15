import { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useTaskById } from "@/hooks/task/useTaskById";
import { useModalContext } from "@/providers/modal-provider";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";

export const EditTaskModal = () => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  const { isEditTaskModalOpen, taskIdToEdit, handleCloseEditTaskModal } =
    useModalContext();

  const { data: taskToEdit, isLoading } = useTaskById(taskIdToEdit ?? "");
  const { mutate: editTask } = useUpdateTask();

  // Function to handle changes in the title input field
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  // Function to handle changes in the description input field
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDescription(event.target.value);
  };

  // Function to save the edited task
  const handleSaveTask = () => {
    if (!taskToEdit) return;
    if (!newTitle.trim() || !newDescription.trim()) {
      toast.error("Please provide both title and description.");
      return;
    }
    editTask({
      taskId: taskToEdit._id,
      body: {
        title: newTitle,
        description: newDescription,
      },
    });
    handleCloseEditTaskModal();
  };

  // Function to update state according to current task
  useEffect(() => {
    if (taskToEdit) {
      setNewTitle(taskToEdit.title);
      setNewDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  return (
    <Modal open={isEditTaskModalOpen} onClose={handleCloseEditTaskModal}>
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
          Edit Task
        </Typography>
        <IconButton
          onClick={handleCloseEditTaskModal}
          size="small"
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <Close />
        </IconButton>
        {isLoading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", mb: 2 }} />
        ) : (
          <>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={newTitle}
              required
              onChange={handleTitleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={newDescription}
              required
              onChange={handleDescriptionChange}
              sx={{ mb: 2 }}
            />
          </>
        )}
        <Button
          variant="contained"
          onClick={handleSaveTask}
          size="large"
          sx={{ width: "100%" }}
          disabled={isLoading} // Disable Save button while loading
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
};
