import React from "react";
import { Card, Typography, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ITask } from "@/types/";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

interface TaskProps {
  task: ITask;
  index: number;
  handleDeleteTask: (taskId: string) => void;
  handleOpenEditModal: (task: ITask) => void;
  handleOpenDetailsTaskModal: (taskId: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  task,
  index,
  handleDeleteTask,
  handleOpenEditModal,
  handleOpenDetailsTaskModal,
}) => {
  const onEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleOpenEditModal(task);
  };
  const onDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleDeleteTask(task._id);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided: DraggableProvided) => (
        <Card
          key={task._id}
          sx={{
            boxShadow: "none",
            border: "1px solid #DCE3E5",
            p: "14px",
            bgcolor: "#F7F6F9",
            mb: "18px",
            position: "relative",
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => handleOpenDetailsTaskModal(task._id)}
        >
          <Typography
            variant="subtitle1"
            fontWeight={500}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mb: 1,
            }}
          >
            {task.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mb: 1,
            }}
          >
            {task.description}
          </Typography>
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <IconButton
              onClick={onDeleteClick}
              aria-label="delete"
              size="small"
            >
              <Delete fontSize="small" />
            </IconButton>
            <IconButton onClick={onEditClick} aria-label="edit" size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Stack>
        </Card>
      )}
    </Draggable>
  );
};
