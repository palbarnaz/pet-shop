import { combineReducers } from '@reduxjs/toolkit';
import { schedulesReducer } from './modules/schedules';
import { servicesReducer } from './modules/servicesSlice';
import { userLoggedReducer } from './modules/userLoggedSlice';
import { userReducer } from './modules/userSlice';


export const rootReducer = combineReducers({
  user: userReducer,
  userLogged: userLoggedReducer,
  service: servicesReducer,
  schedule: schedulesReducer

});

export type RootState = ReturnType<typeof rootReducer>;
