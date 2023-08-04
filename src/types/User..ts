import { Animal } from "./Animal";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  profile: "ADMIN" | "CLIENT" ;
  tokenLogin?: String;
  animals?: Array<Animal>;


}