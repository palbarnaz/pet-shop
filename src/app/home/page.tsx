"use client"


import { UserRequestGet } from "@/api";
import Schedules from "@/components/client/schedules";
import { useAppDispatch, useAppSelector } from "@/globalRedux/hooks";
import { getServices } from "@/globalRedux/modules/servicesSlice";
import { saveUserLogged, userLoggedReducer } from "@/globalRedux/modules/userLoggedSlice";
import { getUserId } from "@/globalRedux/modules/userSlice";
import { User } from "@/types/User.";
import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import ResponsiveAppBar from "./responsiveAppBar";


export default function Home (){
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  

  useEffect(() => {
    const userLoggedSession = sessionStorage?.getItem('userLoggedId');
  const userLogged = userLoggedSession ? JSON.parse(userLoggedSession) : null;

    if (!userLogged) {
      window.location.href = '/signin';       

    }
    
    dispatch(saveUserLogged(userLogged))
    dispatch(getUserId(userLogged));
    dispatch(getServices())

}, [dispatch]);



  
  return (
   
    <>
    <Grid container>
            <Grid item xs={12}>
                <ResponsiveAppBar />
            </Grid>

            <Grid item xs={12}>
                <Container sx={{ marginTop: '20px' }}>
                { user?.profile === "CLIENT" ? (<Schedules/>) : (<Typography> </Typography>)}
                </Container>
            </Grid>
        </Grid>
      
    </> 
  )
}