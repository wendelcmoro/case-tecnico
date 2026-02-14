'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useRouter } from 'next/navigation';

import { useFormik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { storeToken } from './api/storeToken';

import LoadingSpinner from './components/loading-spinner/LoadingSpinner';

import { login } from './api/authApi';

import { formColor, defaultInput, buttonForm, buttonLogin } from './styles';

interface ErrorValues {
  username: string;
  password: string;
}

interface Props {}

const Login: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  // Dados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Validação
  const formik = useFormik<ErrorValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors = {} as Partial<ErrorValues>;
      if (!values.username) {
        errors.username = 'Usuário é obrigatório';
      }

      if (!values.password) {
        errors.password = 'Senha é obrigatório';
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }: FormikHelpers<ErrorValues>) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await login(formData);
        if (response.status == 200 || response.status == 201) {
          await storeToken(response.data);
          setTimeout(() => {
            push('/dashboard/alunos');
            setLoading(false);
          }, 1000);

          toast.success(response?.data?.message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(response?.data?.message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={10} sm={8} lg={6} xl={4}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={formColor}
              >
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="username"
                      label="Usuário"
                      variant="outlined"
                      value={username}
                      sx={defaultInput}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        formik.handleChange(e);
                      }}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </Grid>

                  <TextField
                    fullWidth
                    type="password"
                    id="password"
                    label="Senha"
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      formik.handleChange(e);
                    }}
                    sx={defaultInput}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={2} sx={buttonForm} justifyContent="end">
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={buttonLogin}
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    Prosseguir
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;
