import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export const background: SxProps<Theme> = {
  backgroundColor: 'white',
  minHeight: '100vh',
  flexGrow: 1,
  marginLeft: {
    xs: 0,
  },
  paddingTop: 2,
};

export const dataStyle: SxProps = {
  marginTop: 1,
  paddingLeft: 12,
  paddingRight: 2,
};

export const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};
