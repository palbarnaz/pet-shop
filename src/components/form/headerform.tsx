'use client'

import React from 'react';
import { Avatar, Typography } from '@mui/material';

interface HeaderFormProps {
    title: string;
    icon: React.ReactNode;
    color: string;
}



export default function HeaderForm ({ title, icon, color }: HeaderFormProps) {
    const apiUrl = process.env.API_URL;
    return (
        <>
            <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
           <Typography>  {apiUrl}
</Typography>
            <Typography variant="h4">{title}</Typography>
        </>
    );
};
