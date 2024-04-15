import Search from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useModalContext } from "../providers/modal-provider";
import { useBoardContext } from "@/providers/board-provider";

interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
  handleSearch,
}) => {
  const { boardId } = useBoardContext();

  const { handleOpenCreateBoardModal } = useModalContext();
  return (
    <Stack
      width={boardId ? "60%" : "100%"}
      justifyContent={"space-between"}
      gap={boardId ? 0 : "10px"}
    >
      <TextField
        label="Search Boards"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ width: "100%", bgcolor: "#fff" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} size="large">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{ width: "100%" }}
        startIcon={<AddIcon />}
        onClick={handleOpenCreateBoardModal}
      >
        Create new board
      </Button>
    </Stack>
  );
};
