'use client'

import { useAppDispatch, useAppSelector } from "@/globalRedux/hooks"
import { Service } from "@/types/Service";
import { Box, Button, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';

import CardService from "./CardService"
import ServiceGroupSelect from "./ServiceGroupSelect";
import { FilterDate } from "@/types/Schedule";
import { filterScheduleDate, ScheduleRequest } from "@/api";
import { scheduleCreate } from "@/globalRedux/modules/schedules";
import AnimalGroupSelect from "./AnimalGroupSelect";
const hoursAvailable = ["09","10","11","12","13","14","15","16","17","18"]

export default function CreateSchedule() {
  const [service, setService] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [day, setDay] = useState<Dayjs | null>(dayjs(new Date()));
  const [hourSchedulesByDay, setHourSchedulesByDay] = useState<FilterDate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hour, setHour] = useState('');
  const [valid, setValid] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hour && day?.date() && service && animal) {
        setValid(false);
    } else {   
     setValid(true);
    }
}, [ hour, day, service, animal])

  const getSchedulesByDay = async () => {
    setIsLoading(true)
    try {
      const res = await filterScheduleDate(day?.format('YYYY-MM-DDT00:00:00'))
      setHourSchedulesByDay(res)


    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)


    }
  }

  const getAvailableHours = () => {
    const hoursScheduled = hourSchedulesByDay.map(d => dayjs(d.dateHour).hour())
  
    const filterHoursAvailable = hoursAvailable.filter(h => !hoursScheduled.some(ho => parseInt(h) === ho))
  
    return filterHoursAvailable
  }

  useEffect(() => {
    
    if (day) {
      getSchedulesByDay()
    }


  }, [day])

  const handleChange = (value: string) => {
    setService(value)
  }

  const handleAnimal = (value: string) => {
    setAnimal(value)
  }
  const handleSchedule = ()=>{
 
   const dateHour = day?.hour(Number(hour)).format('YYYY-MM-DDTHH:00:00');

   const schedule: ScheduleRequest = {
    idUser: user.id,
    authorization: user.tokenLogin || '',
    schedule:{
      dateHour: dateHour,
      idAnimal: animal,
      idService: service
    }
   }

    dispatch(scheduleCreate(schedule))
    setDay(dayjs(new Date()))
    setHour('')
    window.location.href = '/home'; 
  }



  return (
    <Grid container marginY={1}>
       <Grid item xs={12} marginY={5}>
        <Typography textAlign={'center'} variant="h5">Selecione o Animal</Typography>
        <Container >
          <Grid  item display={'flex'} justifyContent={'center'}  sx={{ marginTop: '30px' }}>
            <AnimalGroupSelect value={animal} handleChange={(_event, value) => handleAnimal(value)}/>
          </Grid>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={'center'} variant="h5">Selecione um serviço</Typography>
        <Container >
          <Grid container display={'flex'} justifyContent={"center"}  sx={{ marginTop: '30px' }}>
            <ServiceGroupSelect value={service} handleChange={(_event, value) => handleChange(value)} />
          </Grid>
        </Container>
      </Grid>

      <Grid item xs={12}  marginY={10}>
        <Typography textAlign={'center'} variant="h5">Selecione a data e horário</Typography>
        <Container  >
          <Grid item  display={'flex'} justifyContent={'center'}   sx={{ marginTop: '30px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ alignItems: 'center' }} components={['DatePicker']}>
                <DatePicker disablePast format="DD/MM/YYYY" value={day as any} onChange={(value) => setDay(value)} sx={{ width: '300px' }} label="Selecione o dia" />
              </DemoContainer>
            </LocalizationProvider>

          </Grid>
          <Grid item display={'flex'} justifyContent={'center'}  sx={{ marginTop: '30px' }}>
            <FormControl sx={{ width: '300px' }} >
              <InputLabel id="demo-simple-select-label">Selecione o horário</InputLabel>
              <Select

                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hour}
                label="hour"
                onChange={(e) => setHour(e.target.value as String)}
              >
                {getAvailableHours().map(hour => <MenuItem key={hour} value={hour}>{`${hour}:00`}</MenuItem>)}

              </Select>
            </FormControl>
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'}  sx={{ marginTop: '30px' }}>
            <Button sx={{
              backgroundColor: '#e6d343',
              ':hover': {
                backgroundColor: '#e6d343'

              },
              color: 'black'
            }}
              onClick={handleSchedule}
              disabled={valid}
              variant="contained">
              Cadastrar
            </Button>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}