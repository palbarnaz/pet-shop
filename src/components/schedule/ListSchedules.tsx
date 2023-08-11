'use client'

import { useAppDispatch, useAppSelector } from "@/globalRedux/hooks";
import { getSchedules } from "@/globalRedux/modules/schedules";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import CardSchedule from "./CardSchedule";


export default function ListSchedules (){
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);  
  const { data } = useAppSelector((state) => state.userLogged);

  const {schedules} = useAppSelector((state)=> state.schedule)
   useEffect(()=>{
    if(user){
      dispatch(getSchedules())
      
    }

   },[dispatch, user])



  return(
    <Grid container marginBottom={10}>
    <Grid item xs={12}>
        <Container sx={{ marginTop: '20px' }}>
            <Grid container  spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4">Agendamentos</Typography>
                    <Divider />
                </Grid>
                {schedules.map(s =>  <CardSchedule animal={s.animal} key={s.id} dataHour={s.dateHour} service={s.service}/> )}
               
        
            </Grid>
        </Container>
    </Grid>
</Grid>
  )
}