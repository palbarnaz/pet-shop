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


const getAuthorization = ()=>{
  const authToken = sessionStorage?.getItem('authToken');  
  return authToken
}


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export type TUserLogin = {
    email: string;
    password: string;
  }
  export type UserRequestGet = {
    authorization: string
  }


  export type ScheduleRequest = {
      dateHour: any,
      idAnimal: string,
      idService: string,
    
  }

  export type AnimalRequest = {
      name: string,
      specie: string,
    }

export async function loginUser(data: TUserLogin){
 
  
    const res = await api.post('login', data);
    
    return res.data;
    
    
}
export async function createUser(data: User) {
    const res = await api.post('users', data);
    return res.data;
}

export async function getUser() {
    const res = await api.get(`users/getUser`, { headers: { Authorization:`'Bearer' ${getAuthorization()} `} });
    return res.data;
}


export async function  getScheduleByUser() {
  const res = await api.get(`schedules/schedulesByUser`, { headers: { Authorization: `'Bearer' ${getAuthorization()} ` } });
  return res.data;
}

export async function createSchedule(item: ScheduleRequest) {
  const res = await api.post(`schedules`, item, { headers: { Authorization: `'Bearer' ${getAuthorization()} `} });
  return res.data;
}

export async function filterScheduleDate(date : any) {
  const res = await api.get<FilterDate[]>(`schedules/filterDate?date=${date}`, { headers: { Authorization: `'Bearer' ${getAuthorization()} ` } } );
  return res.data;
}


export async function getService() {
  const res = await api.get(`services`, {headers: {Authorization: `'Bearer' ${getAuthorization()} `}});
  return res.data;
}



export async function createAnimal(item: AnimalRequest) {
  const res = await api.post(`animals`, item, { headers: { Authorization: `'Bearer' ${getAuthorization()} `} });
  return res.data;
}
