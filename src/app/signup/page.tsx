'use client'
import { useState } from "react";
import { Box, TextField } from "../../../node_modules/@mui/material/index";
import PetsIcon from '@mui/icons-material/Pets';
import RegisterBox from "@/components/form/registerbox";




export default function SignUp(){
  

   return <RegisterBox icon={<PetsIcon fontSize="large" />} mode="signup" titleButton="Criar Conta" titleHeader="Cadastrar" />;

}