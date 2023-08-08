'use client'

import RegisterBox from '@/components/Form/Registerbox';
import PetsIcon from '@mui/icons-material/Pets';




export default function SignIn(){
  

  return(
    <RegisterBox icon={<PetsIcon fontSize="large" />} mode="signin" titleButton="Entrar" titleHeader="Entrar no sistema" /> 


  )
}