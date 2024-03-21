import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Task } from "./task";
import { Droppable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import { ITask, TaskStatus } from "@/types";

interface ColumnProps {
  title: TaskStatus;
  tasks: ITask[];
  handleDeleteTask: (taskToDeleteId: string) => void;
  handleOpenAddTaskModal: (status: TaskStatus) => void;
  handleOpenEditTaskModal: (task: ITask) => void;
  handleOpenDetailsTaskModal: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  handleDeleteTask,
  handleOpenAddTaskModal,
  handleOpenEditTaskModal,
  handleOpenDetailsTaskModal,
}) => {
  return (
    <Paper
      sx={{
        border: "1px solid #DCE3E5",
        p: "20px",
        boxShadow: "none",
        maxHeight: "70vh",
      }}
    >
      <Typography
        variant="body1"
        fontSize={"20px"}
        color={"#111"}
        fontWeight={"700"}
        mb={"28px"}
      >
        {title}
      </Typography>
      <Stack sx={{ height: "calc(60vh - 100px)", overflow: "auto" }}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: "100%", position: "relative" }}
            >
              {tasks.length === 0 ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign={"center"}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translate(0, -50%)",
                    width: "100%",
                  }}
                >
                  Nothing here
                </Typography>
              ) : (
                tasks.map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    index={index}
                    handleDeleteTask={handleDeleteTask}
                    handleOpenEditModal={handleOpenEditTaskModal}
                    handleOpenDetailsTaskModal={handleOpenDetailsTaskModal}
                  />
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Stack>
      <Button
        variant="outlined"
        sx={{ p: "14px", width: "100%" }}
        startIcon={<AddIcon />}
        onClick={() => handleOpenAddTaskModal(title)}
      >
        Add task
      </Button>
    </Paper>
  );
};
