
import { getService } from '@/api';
import { Service } from '@/types/Service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';



export const getServices = createAsyncThunk('services/getServices', async () => {
    try {
        const response = await getService();

        return response;
    } catch (error: any) {
        throw new Error("erro ao buscar serviço");
    }
});



const services = createSlice({
    name: 'services',
    initialState: {services: [] as Service[]},
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getServices.fulfilled, (state, action) => {
            state.services = action.payload;
        });
        
    
    },
});

export const servicesReducer = services.reducer;
