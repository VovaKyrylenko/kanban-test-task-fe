import { IBoard } from "@/types";
import Search from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";

interface SearchBarProps {
  currentBoard: IBoard | null;
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  handleOpenCreateBoardModal: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentBoard,
  searchQuery,
  handleSearchChange,
  handleSearch,
  handleOpenCreateBoardModal,
}) => {
  return (
    <Stack
      width={currentBoard ? "60%" : "100%"}
      justifyContent={"space-between"}
      gap={currentBoard ? 0 : "10px"}
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
