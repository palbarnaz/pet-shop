import { useAppSelector } from "@/globalRedux/hooks"
import { Service } from "@/types/Service";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';

import CardService from "./cardService"
import ServiceGroupSelect from "./ServiceGroupSelect";
import { FilterDate } from "@/types/Schedule";
import { filterScheduleDate } from "@/api";

export default function Schedules() {
  const [service, setService] = useState<string>('');
  const [day, setDay] = useState<Dayjs | null>(dayjs(new Date()));
  const [hourSchedulesByDay, setHourSchedulesByDay] = useState<FilterDate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


const getSchedulesByDay = async()=>{
     setIsLoading(true)
    try {
      const res =  await filterScheduleDate(day?.format('YYYY-MM-DDT00:00:00'))
      setHourSchedulesByDay(res)
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
}

 useEffect(()=>{
  console.log(day?.toDate());
  console.log(day?.toISOString());
  console.log(day?.toString());
  console.log(day?.toJSON());
  console.log(day?.format('YYYY-MM-DD'));
  
   if(day){
    getSchedulesByDay()
   }
  
 }, [day])

  const handleChange = (value: string) => {
    setService(value)
  }

 

  return (
    <Grid container marginBottom={10} marginTop={10}>
      <Grid item xs={12}>
        <Typography textAlign={'center'} variant="h5">Selecione um serviço</Typography>
        <Container >
          <Grid container spacing={4} sx={{ marginTop: '30px' }}>
            <ServiceGroupSelect value={service} handleChange={(_event, value) => handleChange(value)} />
          </Grid>
        </Container>
      </Grid>

      <Grid item xs={12} marginTop={10}>
        <Typography textAlign={'center'} variant="h5">Selecione a data e horário</Typography>
        <Container >

          <Grid container spacing={1} sx={{ marginTop: '30px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker format="DD/MM/YYYY" value={day as any} onChange={(value)=> setDay(value)} sx={{ width: '300px' }} label="Selecione o dia" />
              </DemoContainer>
            </LocalizationProvider>
           
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}