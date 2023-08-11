"use client"


import { UserRequestGet } from "@/api";

import ListSchedules from "@/components/schedule/ListSchedules";

import { useAppDispatch, useAppSelector } from "@/globalRedux/hooks";
import { getServices } from "@/globalRedux/modules/servicesSlice";
import { saveUserLogged, userLoggedReducer } from "@/globalRedux/modules/userLoggedSlice";
import { getUserId } from "@/globalRedux/modules/userSlice";
import { User } from "@/types/User.";
import { Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";



export default function Home (){
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { push } = useRouter();


  useEffect(() => {
    const authToken = sessionStorage?.getItem('authToken');

    if (!authToken) {
      push("/signin")

    }
    
    dispatch(saveUserLogged(authToken || ''))
    dispatch(getUserId());
    dispatch(getServices())

}, [dispatch, push]);



  
  return (
   
    <>
    <Grid container>
            <Grid item xs={12}>
                <ResponsiveAppBar />
            </Grid>

            <Grid item xs={12}>
                <Container sx={{ marginTop: '20px' }}>
                { user?.profile === "CLIENT" && (<ListSchedules/>) }
                </Container>
            </Grid>
        </Grid>
      
    </> 
  )
}