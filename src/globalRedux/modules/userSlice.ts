import { User } from '@/types/User.';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {  createUser, getUser, loginUser, TUserLogin, UserRequestGet } from '../../api';



export const getUserId = createAsyncThunk('users/getUser', async () => {
    try {
        const response = await getUser();

        return response;
    } catch (error: any) {
        throw new Error("erro ao buscar user");
    }
});

export const saveUser = createAsyncThunk('users/saveUsers', async (data: User) => {
    try {
        const response = await createUser(data);

        return response.data;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

export const loginUserThunk = createAsyncThunk('users/loginUserThunk', async (data: TUserLogin) => {
    try {
        const response = await loginUser(data);
        return response;
    } catch (error: any) {
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
});

const user = createSlice({
    name: 'user',
    initialState: {user: {} as User,
token: ''},
    reducers: {
        clearUser: (state) => {
        state.user = {} as User
        state.token = ''
    }
  },
    extraReducers(builder) {
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.token = action.payload.tokenJwt
            // sessionStorage.setItem("authorization", action.payload.tokenJwt)
            state.user = action.payload.user;  
        });
        
        builder.addCase(getUserId.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        
        builder.addCase(saveUser.fulfilled, (state, action) => {
            window.location.href = '/signin';
        });
    },
});

export const { clearError, clearUser } = user.actions;
export const userReducer = user.reducer;
