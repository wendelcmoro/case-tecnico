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
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

import { useTheme, useMediaQuery } from '@mui/material';

import { useFormik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import DashboardMenu from '../../components/dashboard-menu/DashboardMenu';

import { background, dataStyle, modalStyle } from './styles';

interface ErrorValues {
  name: string;
  id: number;
}

interface ErrorValuesRoom {
  room: string;
}

interface User {
  username: string;
  id: number;
}

interface Student {
  name: string;
  id: number;
}

interface Students {
  students: Student[];
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
  // Modal Cadastro aluno
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setStudentName('');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Modal vinculo aluno à sala
  const [openModalRoom, setOpenModalRoom] = React.useState(false);
  const handleOpenModalRoom = () => {
    setStudentName('');
    setOpenModalRoom(true);
  };
  const handleModalRoomClose = () => setOpenModalRoom(false);

  // Modal listagem de salas do aluno
  const [openModalRoomStudent, setOpenModalRoomStudent] = React.useState(false);
  const handleOpenModalRoomStudent = () => {
    setOpenModalRoomStudent(true);
  };
  const handleModalRoomStudentClose = () => setOpenModalRoomStudent(false);

  // Loading Spinner
  const [loading, setLoading] = useState(false);

  // Expansão do menu de Dashboard
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [expand, setExpand] = useState(isMdUp ? true : false);

  // Dados
  const [username, setUsername] = useState('');

  // Alunos
  const [students, setStudents] = useState<Student[]>([]);

  // Dados para formulário de cadastro
  const [studentId, setStudentId] = useState(0);
  const [studentName, setStudentName] = useState('');

  // Salas
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room, setRoom] = useState('');

  // Salas Vinculadas
  const [studentRooms, setStudentRooms] = useState<Rooms[]>([]);

  // Validação
  const formik = useFormik<ErrorValues>({
    initialValues: {
      name: '',
      id: 0,
    },
    validate: (values) => {
      const errors = {} as Partial<ErrorValues>;
      if (studentName == '') {
        errors.name = 'Nome é obrigatório';
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }: FormikHelpers<ErrorValues>) => {
      setLoading(true);
      try {
        const response = await fetch('/api/students/postStudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: studentName, id: studentId }),
        });

        if (response.status == 200 || response.status == 201) {
          const data: Student = await response.json();
          setStudents((prev) => {
            const exists = prev.find((student) => student.id === data.id);

            if (exists) {
              return prev.map((student) =>
                student.id === data.id ? { ...student, ...data } : student,
              );
            } else {
              return [...prev, data];
            }
          });

          setOpen(false);

          toast.success(
            studentId == 0 ? 'Aluno cadastrado com sucesso' : 'Cadastro de aluno atualizado',
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
            studentId == 0 ? 'Erro ao cadastrar aluno' : 'Erro ao atualizar cadastro de aluno',
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

  const deleteStudent = async (studentId: number) => {
    const response = await fetch('/api/students/deleteStudent/' + studentId, {
      method: 'DELETE',
    });
    if (response.status == 200 || response.status == 201) {
      setStudents((prev) => prev.filter((student) => student.id !== studentId));
    }
  };

  // vínculo de aluno à sala
  const formikRoom = useFormik<ErrorValuesRoom>({
    initialValues: {
      room: '',
    },
    validate: (values) => {
      const errors = {} as Partial<ErrorValuesRoom>;
      if (room == '') {
        errors.room = 'Sala é obrigatório';
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }: FormikHelpers<ErrorValuesRoom>) => {
      setLoading(true);
      try {
        const response = await fetch('/api/students/attachRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId: studentId, environmentId: room }),
        });

        if (response.status == 200 || response.status == 201) {
          setOpenModalRoom(false);

          toast.success(
            studentId == 0 ? 'Aluno cadastrado com sucesso' : 'Cadastro de aluno atualizado',
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
            studentId == 0 ? 'Erro ao cadastrar aluno' : 'Erro ao atualizar cadastro de aluno',
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

  const getStudentsRooms = async (studentId: number) => {
    const response = await fetch('/api/students/' + studentId + '/getRooms');
    if (response.status == 200 || response.status == 201) {
      const data: Rooms[] = await response.json();
      setStudentRooms(data);
    }
  };

  const detachStudentsRoom = async (studentId: number, roomId: number) => {
    const id = await studentId;
    const response = await fetch('/api/students/' + studentId + '/detachRoom/' + roomId, {
      method: 'DELETE',
    });
    if (response.status == 200 || response.status == 201) {
      const data = await response.json();
      setStudentRooms(data.teachingEnvironments);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/getUser');
        const data: User = await response.json();
        setUsername(data?.username);

        const studentsResponse = await fetch('/api/students/getStudent');
        const dataStudents: Students = await studentsResponse.json();
        setStudents(dataStudents?.students);

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
        {/* Modal de cadastro do aluno */}
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
                  value={studentName}
                  id="name"
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    formik.handleChange(e);
                  }}
                  label="Nome"
                  variant="outlined"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
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

        {/* Modal de registro de entrada do aluno na sala */}
        <Modal
          open={openModalRoom}
          onClose={handleModalRoomClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Registrar entrada de aluno na sala
            </Typography>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formikRoom.touched.room && Boolean(formikRoom.errors.room)}
                >
                  <InputLabel id="type-label">Sala</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    value={room}
                    label="Tipo"
                    onChange={(e) => {
                      setRoom(e.target.value);
                      formikRoom.handleChange(e);
                    }}
                  >
                    {rooms.map((room) => (
                      <MenuItem value={room.id}>
                        {room.name} |{' '}
                        {room.type == 'CLASSROOM'
                          ? 'Sala de aula'
                          : room.type == 'LABORATORY'
                            ? 'Laboratório'
                            : 'Sala de estudos'}
                      </MenuItem>
                    ))}
                  </Select>

                  {formikRoom.touched.room && Boolean(formikRoom.errors.room) && (
                    <FormHelperText sx={{ color: 'red', marginLeft: '16px !important' }}>
                      {formikRoom.errors.room}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => {
                    formikRoom.handleSubmit();
                  }}
                >
                  Vincular
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>

        {/* Modal salas vinladas ao aluno */}
        <Modal
          open={openModalRoomStudent}
          onClose={handleModalRoomStudentClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Salas do aluno
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {studentRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          detachStudentsRoom(studentId, room.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}

                {rooms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Aluno não participa de nenhuma sala
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
                      setStudentId(0);
                      handleOpen();
                    }}
                  >
                    Cadastrar Aluno
                  </Button>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ p: 2 }}>
                    Lista de Alunos
                  </Typography>

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <MeetingRoomIcon
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setStudentId(student.id);
                                getStudentsRooms(student.id);
                                setOpenModalRoomStudent(true);
                              }}
                            />
                            <ImportContactsIcon
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setRoom('');
                                setStudentId(student.id);
                                setOpenModalRoom(true);
                              }}
                            />
                            <EditIcon
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setStudentName(student.name);
                                setStudentId(student.id);
                                setOpen(true);
                              }}
                            />
                            <DeleteIcon
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                deleteStudent(student.id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}

                      {students.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            Nenhum aluno cadastrado
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
