import { createSchedule, filterScheduleDate, ScheduleRequest } from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';




// export const scheduleCreate = createAsyncThunk('schedules/create', async ( item: ScheduleRequest) => {
//     try {
//         const response = await createSchedule(item);
//         return response;

//     } catch (error: any) {
//         throw new Error("erro ao criar agendamento");
//     }
// });


const animals = createSlice({
    name: 'animals',
    initialState: {animals: []},
    reducers: {

    },
    extraReducers(builder) {
        
        // builder.addCase(scheduleCreate.fulfilled, (state, action) => {
        //     state.schedules = action.payload;
        // });
        
    
    },
});

export const animalsReducer = animals.reducer;
