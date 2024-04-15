import { useState, useEffect } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { Board, BoardCardInfo, SearchBar } from "@/components/";
import { useQueryClient } from "@tanstack/react-query";
import { ModalProvider } from "@/providers/modal-provider";
import { BoardProvider } from "@/providers/board-provider";
import { Modals } from "@/components/modals/modals";

const HomePage: React.FC = () => {
  const queryClient = useQueryClient();

  // Serach query from input
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem("boardId") || ""
  );
  // Current board id(saved in localStorage) and used for queries
  const [boardId, setBoardId] = useState<string>(searchQuery);

  // Handling boardId change
  useEffect(() => {
    setSearchQuery(boardId);
  }, [boardId]);

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle search
  const handleSearch = async () => {
    queryClient.invalidateQueries({ queryKey: ["board", searchQuery] });
    setBoardId(searchQuery);
    localStorage.setItem("boardId", searchQuery);
  };

  return (
    <>
      <BoardProvider value={{ boardId, setBoardId }}>
        <ModalProvider>
          <Container sx={{ my: "45px" }}>
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
              mb={"50px"}
              alignItems={"stretch"}
              sx={{ height: "fit-content" }}
            >
              <SearchBar
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                handleSearchChange={handleSearchChange}
              />
              {boardId && <BoardCardInfo />}
            </Stack>
            {boardId ? (
              <Board />
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                textAlign={"center"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                Search board or create a new one
              </Typography>
            )}
          </Container>
          <Modals />
        </ModalProvider>
      </BoardProvider>
    </>
  );
};

export default HomePage;
