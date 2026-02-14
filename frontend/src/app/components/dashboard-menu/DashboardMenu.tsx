'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import Grid from '@mui/material/Grid';

import ListItemIcon from '@mui/material/ListItemIcon';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import BadgeIcon from '@mui/icons-material/Badge';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

import { useTheme, useMediaQuery } from '@mui/material';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { iconColor, logoutButton, iconLogout } from './styles';

import LoadingSpinner from '../loading-spinner/LoadingSpinner';

interface Props {
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardMenu: React.FC<Props> = ({ setExpand }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(isMdUp ? true : false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen((prev) => !prev);
    setExpand(!open);
  };

  const { push } = useRouter();
  const drawerWidth = isXlUp || isMdDown ? 350 : 240;

  const logout = () => {
    setLoading(true);
    const response = fetch('/api/postLogout');

    setTimeout(() => {
      push('/');
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={1}>
          <Tooltip title="Menu">
            <Button onClick={toggleDrawer(true)}>
              <KeyboardArrowRightIcon sx={{ color: '#52367a', marginLeft: 3, marginTop: -6 }} />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={6}></Grid>
        {isMdUp && (
          <>
            <Grid item xs={4}>
              <Grid container direction="row">
                <Grid item lg={12}>
                  <Box sx={logoutButton}>
                    <Tooltip title="Sair">
                      <Button
                        onClick={() => {
                          logout();
                        }}
                      >
                        <LogoutIcon sx={iconLogout} />
                      </Button>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
          </>
        )}
        {!isMdUp && (
          <>
            <Grid item xs={4}>
              <Box sx={logoutButton}>
                <Tooltip title="Sair">
                  <Button
                    onClick={() => {
                      logout();
                    }}
                  >
                    <LogoutIcon sx={{ color: '#52367a', marginTop: '-10px' }} />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        sx={{
          width: open ? drawerWidth : 72,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 72,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ backgroundColor: '#white', height: '120vh' }} role="presentation">
          <List>
            <ListItem key={'alunos'} disablePadding>
              <ListItemButton
                onClick={() => {
                  push('/dashboard/alunos');
                }}
                sx={{
                  color: '#52367a',
                }}
              >
                <ListItemIcon>
                  <BadgeIcon sx={iconColor} />
                </ListItemIcon>
                {open && <ListItemText primary={'Alunos'} />}
              </ListItemButton>
            </ListItem>
            <ListItem key={'ambientes_estudo'} disablePadding>
              <ListItemButton
                onClick={() => {
                  push('/dashboard/ambientes_estudo');
                }}
                sx={{
                  color: '#52367a',
                }}
              >
                <ListItemIcon>
                  <ImportContactsIcon sx={iconColor} />
                </ListItemIcon>
                {open && <ListItemText primary={'Ambientes de estudo'} />}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{ backgroundColor: 'white', opacity: 0.3 }} />
        </Box>
      </Drawer>
    </div>
  );
};

export default DashboardMenu;
