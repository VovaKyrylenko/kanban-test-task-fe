import { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useCreateBoard } from "@/hooks/board/useCreateBoard";
import { useQueryClient } from "@tanstack/react-query";
import { useBoardContext } from "@/providers/board-provider";
import { useModalContext } from "@/providers/modal-provider";

export const CreateBoardModal = () => {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState<string>("");

  const { setBoardId } = useBoardContext();
  const { isCreateBoardModalOpen, handleCloseCreateBoardModal } =
    useModalContext();

  const { mutateAsync: createBoard, data, status } = useCreateBoard();

  // Function to handle changes in the title input field
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  // Function to create task
  const handleSubmit = () => {
    if (!newName.trim()) {
      toast.error("Please provide name.");
      return;
    }
    createBoard(newName);
    handleCloseCreateBoardModal();
  };

  // Update global board id
  useEffect(() => {
    if (status === "success") {
      setBoardId(data._id);
      queryClient.invalidateQueries({ queryKey: ["board", data._id] });
    }
  }, [status]);

  return (
    <Modal open={isCreateBoardModalOpen} onClose={handleCloseCreateBoardModal}>
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
          Create
        </Typography>
        <IconButton
          onClick={handleCloseCreateBoardModal}
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
          onClick={handleSubmit}
          size="large"
          sx={{ width: "100%" }}
        >
          Create
        </Button>
      </Paper>
    </Modal>
  );
};
