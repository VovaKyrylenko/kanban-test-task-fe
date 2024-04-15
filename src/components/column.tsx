import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Task } from "./task";
import { Droppable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import { IColumn, ITask } from "@/types";
import { useTasks } from "@/hooks/task/useTasks";
import { useModalContext } from "../providers/modal-provider";

interface ColumnProps {
  column: IColumn;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  const { handleOpenCreateTaskModal } = useModalContext();
  const { data: tasks, isLoading } = useTasks(column._id || "");
  if (isLoading) {
    return <CircularProgress />;
  }
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
        {column.name}
      </Typography>
      <Stack sx={{ height: "calc(60vh - 100px)", overflow: "auto" }}>
        <Droppable droppableId={column._id}>
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
                tasks.map((task: ITask) => <Task key={task._id} task={task} />)
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
        onClick={() => {
          handleOpenCreateTaskModal(column._id);
        }}
      >
        Add task
      </Button>
    </Paper>
  );
};
