import { UserRequestGet } from '@/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    authorization : ''
};

const userLogged = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        saveUserLogged: (state, action: PayloadAction<string>) => {
             state.authorization = action.payload
             
            },
        logoutUser: (state) => {
            state.authorization = '';
         }
    },
});
export const { saveUserLogged, logoutUser } = userLogged.actions;
export const userLoggedReducer = userLogged.reducer;
