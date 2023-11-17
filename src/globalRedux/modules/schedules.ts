
import { createSchedule, filterScheduleDate, getScheduleByUser, ScheduleRequest, UserRequestGet } from '@/api';
import { Schedule } from '@/types/Schedule';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';



export const getSchedules = createAsyncThunk('schedules/get', async () => {
    try {
        const response = await getScheduleByUser();
        console.log('teste')
        return response;

    } catch (error: any) {
        throw new Error("erro ao buscar agendamentos");
    }
});



export const scheduleCreate = createAsyncThunk('schedules/create', async ( item: ScheduleRequest) => {
    try {
        const response = await createSchedule(item);
        return response;

    } catch (error: any) {
        throw new Error("erro ao criar agendamento");
    }
});


const schedules = createSlice({
    name: 'schedules',
    initialState: {schedules: [] as Schedule[]},
    reducers: {

    },
    extraReducers(builder) {

        builder.addCase(getSchedules.fulfilled, (state, action) => {
            state.schedules = action.payload;
        });
        
        builder.addCase(scheduleCreate.fulfilled, (state, action) => {
            console.log("Agendamento Cadastrado!");
         
            
        });
        
    
    },
});

export const schedulesReducer = schedules.reducer;
