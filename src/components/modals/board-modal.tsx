import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { IBoard } from "@/types/";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";

interface EditBoardModalProps {
  open: boolean;
  title: string;
  currentBoard?: IBoard | null;
  onSubmit: (body: { name: string }) => Promise<void>;
  onCloseModal: () => void;
}

export const BoardModal: React.FC<EditBoardModalProps> = ({
  open,
  title,
  currentBoard,
  onSubmit,
  onCloseModal,
}) => {
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    if (currentBoard) {
      setNewName(currentBoard.name);
    }
  }, [currentBoard]);

  // Function to handle changes in the title input field
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  // Function to save the edited task
  const handleSaveTask = () => {
    if (!newName.trim()) {
      toast.error("Please provide name.");
      return;
    }
    onSubmit({
      name: newName,
    });
    onCloseModal();
  };

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
          {title}
        </Typography>
        <IconButton
          onClick={onCloseModal}
          size="small"
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <Close />
        </IconButton>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={newName}
          required
          onChange={handleNameChange}
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
