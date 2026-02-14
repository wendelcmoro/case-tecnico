'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useTheme, useMediaQuery } from '@mui/material';

import { useFormik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import DashboardMenu from '../../components/dashboard-menu/DashboardMenu';

import { background, dataStyle, modalStyle } from './styles';

interface ErrorValues {
  name: string;
  id: number;
  type: string;
}

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
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setRoomName('');
    setRoomType('');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Loading Spinner
  const [loading, setLoading] = useState(false);

  // Expansão do menu de Dashboard
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [expand, setExpand] = useState(isMdUp ? true : false);

  // Dados
  const [username, setUsername] = useState('');

  // Salas
  const [rooms, setRooms] = useState<Room[]>([]);

  // Dados para formulário de cadastro
  const [roomId, setRoomId] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('');

  // Validação
  const formik = useFormik<ErrorValues>({
    initialValues: {
      type: '',
      name: '',
      id: 0,
    },
    validate: (values) => {
      const errors = {} as Partial<ErrorValues>;
      if (roomName == '') {
        errors.name = 'Nome é obrigatório';
      }

      if (roomType == '') {
        errors.type = 'Tipo é obrigatório';
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }: FormikHelpers<ErrorValues>) => {
      setLoading(true);
      try {
        const response = await fetch('/api/rooms/postRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: roomName, type: roomType }),
        });

        if (response.status == 200 || response.status == 201) {
          const data: Room = await response.json();
          setRooms((prev) => {
            const exists = prev.find((room) => room.id === data.id);

            if (exists) {
              return prev.map((room) => (room.id === data.id ? { ...room, ...data } : room));
            } else {
              return [...prev, data];
            }
          });

          setOpen(false);

          toast.success(
            roomId == 0 ? 'Ambiente cadastrado com sucesso' : 'Cadastro de ambiente atualizado',
            {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          );
        } else {
          toast.error(
            roomId == 0 ? 'Erro ao cadastrar ambiente' : 'Erro ao atualizar cadastro de ambiente',
            {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          );
        }
      } catch (err: any) {
        toast.error('Erro ao processar requisição.', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/getUser');
        const data: User = await response.json();
        setUsername(data?.username);

        const roomsResponse = await fetch('/api/rooms/getRooms');
        const dataRoom: Rooms = await roomsResponse.json();
        setRooms(dataRoom?.teaching_environments);
      } catch (err: any) {
        console.log('error');
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastrar Aluno
            </Typography>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={roomName}
                  id="name"
                  onChange={(e) => {
                    setRoomName(e.target.value);
                    formik.handleChange(e);
                  }}
                  label="Nome"
                  variant="outlined"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
                  <InputLabel id="type-label">Tipo</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    value={roomType}
                    label="Tipo"
                    onChange={(e) => {
                      setRoomType(e.target.value);
                      formik.handleChange(e);
                    }}
                  >
                    <MenuItem value={'CLASSROOM'}>Sala de aula</MenuItem>
                    <MenuItem value={'LABORATORY'}>Laboratório</MenuItem>
                    <MenuItem value={'STUDY_ROOM'}>Sala de estudos</MenuItem>
                  </Select>

                  {formik.touched.type && Boolean(formik.errors.type) && (
                    <FormHelperText sx={{ color: 'red', marginLeft: '16px !important' }}>
                      {formik.errors.type}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>

        <Box
          sx={{
            ...background,
            marginLeft: { xs: 0, md: expand ? 26 : 5, xl: expand ? 42 : 5 },
            transition: (theme) =>
              theme.transitions.create('margin-left', {
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
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setRoomId(0);
                      handleOpen();
                    }}
                  >
                    Cadastrar Ambiente
                  </Button>
                </Grid>

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
                            {room.type == 'CLASSROOM'
                              ? 'Sala de aula'
                              : room.type == 'LABORATORY'
                                ? 'Laboratório'
                                : 'Sala de estudos'}
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
