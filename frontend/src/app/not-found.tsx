import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

export default function Custom404() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item>
          <Box
            style={{
              width: '600px',
              backgroundColor: 'white',
              padding: 50,
              color: 'red',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 40,
            }}
          >
            <Image src="/images/logo.png" width={300} height={100} alt="Energié Logo" />
            <br />
            <br />
            Ocorreu um Erro! <br /> Página não encontrada!
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
