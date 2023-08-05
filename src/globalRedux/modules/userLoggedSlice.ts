import { UserRequestGet } from '@/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    data: {} as UserRequestGet,
};

const userLogged = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        saveUserLogged: (state, action: PayloadAction<UserRequestGet>) => {
             state.data = action.payload
             
            },
        logoutUser: (state) => {
            state.data = {} as UserRequestGet
         }
    },
});
export const { saveUserLogged, logoutUser } = userLogged.actions;
export const userLoggedReducer = userLogged.reducer;
