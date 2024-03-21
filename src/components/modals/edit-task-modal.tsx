import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { ITask } from "@/types/";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";

interface EditTaskModalProps {
  open: boolean;
  taskToUpdate: ITask | null;
  handleUpdateTaskData: (
    taskToUpdateId: string,
    body: {
      title: string;
      description: string;
    }
  ) => Promise<void>;
  onCloseModal: () => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  taskToUpdate,
  handleUpdateTaskData,
  onCloseModal,
}) => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

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
    if (!taskToUpdate) return;
    if (!newTitle.trim() || !newDescription.trim()) {
      toast.error("Please provide both title and description.");
      return;
    }
    handleUpdateTaskData(taskToUpdate._id, {
      title: newTitle,
      description: newDescription,
    });
    onCloseModal();
  };

  // Update newTitle and newDescription when taskToUpdate changes
  useEffect(() => {
    if (taskToUpdate) {
      setNewTitle(taskToUpdate.title);
      setNewDescription(taskToUpdate.description);
    }
  }, [taskToUpdate]);

  return (
    <Modal open={open} onClose={onCloseModal}>
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
          onClick={onCloseModal}
          size="small"
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <Close />
        </IconButton>
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
        <Button
          variant="contained"
          onClick={handleSaveTask}
          size="large"
          sx={{ width: "100%" }}
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
};
