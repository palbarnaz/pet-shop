'use client'

import { useAppDispatch, useAppSelector } from "@/globalRedux/hooks";
import { getSchedules } from "@/globalRedux/modules/schedules";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import CardSchedule from "./CardSchedule";


export default function ListSchedules (){
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {schedules} = useAppSelector((state)=> state.schedule)
   useEffect(()=>{
    if(user){
      dispatch(getSchedules({idUser: user.id, authorization: user.tokenLogin}))
    }

   },[dispatch])


   useEffect(()=>{
  console.log(schedules);
  

   },[schedules])

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
               
                {/* {tasks.length ? (
                    tasks.map((item: any) => {
                        return (
                            <CardTask
                                key={item.id}
                                mode="tasks"
                                description={item.description}
                                detail={item.detail}
                                favorite={item.favorite}
                                actionFavorite={() => executeAction(item, actionFavorite)}
                                actionEdit={() => executeAction(item, actionEdit)}
                                actionDelete={() => executeAction(item, actionDelete)}
                            />
                        );
                    })
                ) : (
                    <Box margin={5}>
                        <Typography variant="h6">Nenhum recado existente!</Typography>
                    </Box>
                )} */}
            </Grid>
        </Container>
    </Grid>
</Grid>
  )
}