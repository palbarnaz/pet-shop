
import { filterScheduleDate } from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';



export const filterSchedules = createAsyncThunk('schedules/filterSchedules', async (date:any) => {
    try {
        const response = await filterScheduleDate(date);

        return response;
    } catch (error: any) {
        throw new Error("erro ao buscar agendamento");
    }
});



const schedules = createSlice({
    name: 'schedules',
    initialState: {schedules: []},
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(filterSchedules.fulfilled, (state, action) => {
            state.schedules = action.payload;
        });
        
    
    },
});

export const servicesReducer = services.reducer;
