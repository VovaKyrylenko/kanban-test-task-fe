import {
  Modal,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useModalContext } from "@/providers/modal-provider";
import { useTaskById } from "@/hooks/task/useTaskById";

export const DetailsTaskModal = () => {
  const {
    handleCloseDetailsTaskModal,
    isDetailsTaskModalOpen,
    taskIdToShowDeatils,
  } = useModalContext();
  const { data: task, isLoading } = useTaskById(taskIdToShowDeatils || "");

  return (
    <Modal open={isDetailsTaskModalOpen} onClose={handleCloseDetailsTaskModal}>
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
        <IconButton
          onClick={handleCloseDetailsTaskModal}
          size="small"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" textAlign="center" mb={2} fontWeight="bold">
          Task Details
        </Typography>
        {isLoading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", mb: 2 }} />
        ) : (
          // Conditionally render content based on isLoading
          <>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Title:
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {task?.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Description:
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {task?.description}
            </Typography>
          </>
        )}
      </Paper>
    </Modal>
  );
};
