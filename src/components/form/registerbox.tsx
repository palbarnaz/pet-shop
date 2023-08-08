'use client'

import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import HeaderForm from './HeaderForm';
import Form from './Form';


interface RegisterBoxProps {
    titleHeader: string;
    titleButton: string;
    mode: 'signin' | 'signup';
    icon: React.ReactNode;

   
}

export default function RegisterBox ({ titleHeader, mode, titleButton, icon }: RegisterBoxProps){
    return (
        <Container  maxWidth="xs" sx={{height: '100vh', width:'100vw', display: 'flex', alignItems: 'center'  }}>
            <Paper elevation={16}>
             
                <Box component="section" marginY={4} marginX={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <HeaderForm title={titleHeader} color="#e6d343" icon={icon} />
                    <Form textButton={titleButton} mode={mode} />
                </Box>
            </Paper>
        </Container>
    );
};

