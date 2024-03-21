import React from "react";
import { Modal, Paper, Typography, IconButton } from "@mui/material";
import { ITask } from "@/types";
import { Close } from "@mui/icons-material";

interface DetailsTaskModalProps {
  open: boolean;
  task: ITask | null;
  onCloseModal: () => void;
}

export const DetailsTaskModal: React.FC<DetailsTaskModalProps> = ({
  open,
  task,
  onCloseModal,
}) => {
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
        <IconButton
          onClick={onCloseModal}
          size="small"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" textAlign="center" mb={2} fontWeight="bold">
          Task Details
        </Typography>
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
      </Paper>
    </Modal>
  );
};
