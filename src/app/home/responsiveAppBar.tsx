'use client'
import { useAppDispatch, useAppSelector } from '@/globalRedux/hooks';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/globalRedux/modules/userLoggedSlice';



const pages = [{ label: '+ Agendamento', url: '/schedules' }, { label: '+ Animal', url: '/animals' }]

const settings = ['Sair'];

export default function ResponsiveAppBar() {
    const {push} = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
     

        sessionStorage.removeItem('authToken');
        dispatch(logoutUser());
        push('/signin');
        // dispatch(clearUser());
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ color: 'black', backgroundColor: '#e6d343' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        LinkComponent={Link}
                        href={"/home"}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit'
                        }}
                    >
                        <PetsIcon fontSize='large' />
                    </Button>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/home"
                            sx={{
                                mr: 2,

                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <PetsIcon />
                        </Typography>

                    </Box>



                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                LinkComponent={Link}
                                href={page.url}
                                sx={{ my: 2, color: 'black', display: 'block', fontWeight: 'bold' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>
                    <Typography
                        variant="body1"
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <LogoutIcon fontSize='large' sx={{ color: 'black' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleClose}

                        >
                            {pages.map((page) => (
                                <MenuItem sx={{

                                    display: { xs: 'flex', md: 'none' }, color: 'black'

                                }} key={page.label}  >
                                    <Typography sx={{ color: 'inherit' }} textAlign="center">{page.label}</Typography>
                                </MenuItem>

                            ))}
                            {settings.map((setting) => (
                                <MenuItem key={setting}>
                                    <Typography onClick={handleCloseUserMenu} textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};


