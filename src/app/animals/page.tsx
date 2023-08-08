'use client'
import { AnimalRequest, createAnimal } from "@/api";
import { useAppDispatch, useAppSelector } from "@/globalRedux/hooks";
import { saveUserLogged } from "@/globalRedux/modules/userLoggedSlice";
import { getUserId } from "@/globalRedux/modules/userSlice";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../home/ResponsiveAppBar";
import { useRouter } from 'next/navigation';

export default function Animals(){
  const {user} = useAppSelector(state => state.user)
  const [name, setName] = useState<string>('');
  const [specie, setSpecie] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  useEffect(() => {
    const userLoggedSession = sessionStorage?.getItem('userLoggedId');
    const userLogged = userLoggedSession ? JSON.parse(userLoggedSession) : null;

    if (!userLogged) {
      window.location.href = '/signin';       
    }
    
    dispatch(saveUserLogged(userLogged))
    dispatch(getUserId(userLogged));
  
}, [dispatch]);


  useEffect(() => {
    if (name.length >= 4 && specie.length >= 4 ) {
        setValid(false);
    } else {   
     setValid(true);
    }
}, [ name, specie, valid])



  const handleChange = ()=>{
   const data = {
    idUser: user.id,
    authorization:user?.tokenLogin || '',
    animal:{
      name: name,
      specie: specie
    }
   }

   sendAnimal(data)
    
  }

  const sendAnimal = async (data:AnimalRequest) => {
    
    try {
      const res = await createAnimal(data)
      push('/schedules')
      
    } catch (error) {
      console.log(error);

    } 
  }



  return(
    <Grid container>
    <Grid item xs={12}>
        <ResponsiveAppBar />
    </Grid>

    <Grid item xs={12}>
        <Container sx={{ marginTop: '20px' }}>
        <Grid item xs={12}  marginY={10}>
        <Typography textAlign={'center'} variant="h5">Cadastre seu pet aqui</Typography>
        <Container  >
          <Grid item  display={'flex'} justifyContent={'center'}   sx={{ marginTop: '30px' }}>
          <TextField id="name" value={name} onChange={(e)=> setName(e.target.value)} label="Digite o nome" variant="outlined" />

          </Grid>
          <Grid item display={'flex'} justifyContent={'center'}  sx={{ marginTop: '30px' }}>
          <TextField id="specie" value={specie} onChange={(e)=> setSpecie(e.target.value)} label="Infome a espécie" variant="outlined" />
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'}  sx={{ marginTop: '30px' }}>
            <Button sx={{
              backgroundColor: '#e6d343',
              ':hover': {
                backgroundColor: '#e6d343'

              },
              color: 'black'
            }}
              onClick={handleChange}
              disabled={valid}
              variant="contained">
              Cadastrar
            </Button>
          </Grid>
        </Container>
      </Grid>
        </Container>
    </Grid>
</Grid>

  )
}