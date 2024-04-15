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
import { useUpdateBoard } from "@/hooks/board/useUpdateBoard";
import { useBoard } from "@/hooks/board/useBoard";
import { useBoardContext } from "@/providers/board-provider";
import { useModalContext } from "@/providers/modal-provider";

export const EditBoardModal = () => {
  const { isEditBoardModalOpen, handleCloseEditBoardModalOpen } =
    useModalContext();
  const { boardId } = useBoardContext();
  const { data: board } = useBoard(boardId);

  const [newName, setNewName] = useState<string>(board?.name || "");
  const { mutate: editBoard } = useUpdateBoard();

  // Function to handle changes in the title input field
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  // Function to create/update task
  const handleSubmit = () => {
    if (!newName.trim()) {
      toast.error("Please provide name.");
      return;
    }
    if (board?._id) {
      editBoard({ boardId: board._id, name: newName });
      handleCloseEditBoardModalOpen();
    } else {
      console.error("Board ID is undefined.");
    }
  };

  useEffect(() => {
    if (board) {
      setNewName(board.name);
    }
  }, [board]);

  return (
    <Modal open={isEditBoardModalOpen} onClose={handleCloseEditBoardModalOpen}>
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
          Edit Board
        </Typography>
        <IconButton
          onClick={handleCloseEditBoardModalOpen}
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
          Save
        </Button>
      </Paper>
    </Modal>
  );
};
