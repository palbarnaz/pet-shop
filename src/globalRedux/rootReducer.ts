import { combineReducers } from '@reduxjs/toolkit';
import { servicesReducer } from './modules/servicesSlice';
import { userLoggedReducer } from './modules/userLoggedSlice';
import { userReducer } from './modules/userSlice';


export const rootReducer = combineReducers({
  user: userReducer,
  userLogged: userLoggedReducer,
  service: servicesReducer

});

export type RootState = ReturnType<typeof rootReducer>;
