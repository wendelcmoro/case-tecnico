import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

interface Props {}

const LoadingSpinner: React.FC<Props> = () => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
