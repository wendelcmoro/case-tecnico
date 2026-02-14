"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { useTheme, useMediaQuery } from "@mui/material";

import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import DashboardMenu from "../../components/dashboard-menu/DashboardMenu";

import { background, dataStyle } from "./styles";

interface User {
  username: string;
  id: number;
}

interface Room {
  name: string;
  type: string;
  id: number;
}

interface Rooms {
  teaching_environments: Room[];
}

const Home: React.FC = () => {
  // Loading Spinner
  const [loading, setLoading] = useState(false);

  // Expansão do menu de Dashboard
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [expand, setExpand] = useState(isMdUp ? true : false);

  // Dados
  const [username, setUsername] = useState("");

  // Salas
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/getUser");
        const data: User = await response.json();
        setUsername(data?.username);

        const roomsResponse = await fetch("/api/getRooms");
        const dataRoom: Rooms = await roomsResponse.json();
        setRooms(dataRoom?.teaching_environments);
      } catch (err: any) {
        console.log("error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Box
          sx={{
            ...background,
            marginLeft: { xs: 0, md: expand ? 26 : 5, xl: expand ? 42 : 5 },
            transition: (theme) =>
              theme.transitions.create("margin-left", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
          <DashboardMenu setExpand={setExpand} />
          {loading && <LoadingSpinner />}
          {!loading && (
            <>
              <Grid container direction="row" spacing={2} sx={dataStyle}>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ p: 2 }}>
                    Lista de Salas
                  </Typography>

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tipo</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {rooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell>{room.name}</TableCell>
                          <TableCell>
                            {room.type == "CLASSROOM"
                              ? "Sala de aula"
                              : room.type == "LABORATORY"
                                ? "Laboratório"
                                : "Sala de estudos"}
                          </TableCell>
                        </TableRow>
                      ))}

                      {rooms.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            Nenhuma sala cadastrada
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          )}
        </Box>
      </div>
    </>
  );
};

export default Home;
