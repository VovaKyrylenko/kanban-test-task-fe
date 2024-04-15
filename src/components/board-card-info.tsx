import { Card, Typography, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import { useDeleteBoard } from "@/hooks/board/useDeleteBoard";
import { useModalContext } from "../providers/modal-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useBoard } from "@/hooks/board/useBoard";
import { useBoardContext } from "../providers/board-provider";

export const BoardCardInfo = () => {
  const queryClient = useQueryClient();
  const { boardId, setBoardId } = useBoardContext();
  const { handleOpenEditBoardModal } = useModalContext();

  const { data: board } = useBoard(boardId);
  const { mutate: deleteBoard } = useDeleteBoard();

  const handleDeleteBoard = () => {
    deleteBoard(boardId);
    setBoardId("");
    queryClient.invalidateQueries({ queryKey: ["board"] });
  };

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
        {board?.name}
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={1}>
        Board ID: {boardId}
        <CopyToClipboard
          text={boardId}
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
