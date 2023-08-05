import { FilterDate, Schedule } from '@/types/Schedule';
import { User } from '@/types/User.';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { method } = req;
  
    // This will allow OPTIONS request
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
  };



const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export type TUserLogin = {
    email: string;
    password: string;
  }
  export type UserRequestGet = {
    idUser: string,
    authorization: string
  }

  export type ScheduleRequest = {
    idUser: string,
    authorization: string,
    schedule: Schedule
  }

export async function loginUser(data: TUserLogin){
    const res = await api.post('auth', data);
    return res.data;
}
export async function createUser(data: User) {
    const res = await api.post('users', data);
    return res.data;
}

export async function getUser({ idUser, authorization }: UserRequestGet) {
    const res = await api.get(`users/${idUser}`, { headers: { AuthToken: authorization } });
    return res.data;
}

export async function createSchedule({ idUser, authorization, schedule }: ScheduleRequest) {
  const res = await api.post(`schedules/${idUser}`, schedule ,{ headers: { AuthToken: authorization } });
  return res.data;
}

export async function filterScheduleDate(date : any) {
  const res = await api.get<FilterDate[]>(`schedules/filterDate?date=${date}` );
  return res.data;
}


export async function getService() {
  const res = await api.get(`services`);
  return res.data;
}



