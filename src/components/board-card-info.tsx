import { IBoard } from "@/types";
import { Delete, Edit } from "@mui/icons-material";
import { Card, Typography, IconButton, Stack } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface BoardCardInfoProps {
  currentBoard: IBoard;
  handleDeleteBoard: () => void;
  handleOpenEditBoardModal: () => void;
}

export const BoardCardInfo: React.FC<BoardCardInfoProps> = ({
  currentBoard,
  handleDeleteBoard,
  handleOpenEditBoardModal,
}) => {
  return (
    <Card
      sx={{
        p: 2,
        bgcolor: "#FFF",
        width: "35%",
        position: "relative",
      }}
    >
      <Typography
        variant="h5"
        mb={1}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          mb: 1,
          maxWidth: "80%",
        }}
      >
        {currentBoard.name}
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={1}>
        Board ID: {currentBoard._id}{" "}
        <CopyToClipboard
          text={currentBoard._id}
          onCopy={() => {
            toast.success("Succefully copied to clipboard");
          }}
        >
          <IconButton aria-label="Copy" size="small">
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
        </CopyToClipboard>
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        position={"absolute"}
        top={"5px"}
        right={"5px"}
      >
        <IconButton
          onClick={handleDeleteBoard}
          aria-label="delete"
          size="small"
        >
          <Delete fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="edit"
          onClick={handleOpenEditBoardModal}
          size="small"
        >
          <Edit fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
};
