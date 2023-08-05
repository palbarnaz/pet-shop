import { Animal } from "./Animal";
import { Service } from "./Service";
import { User } from "./User.";

export type Schedule = {
  id: string;
  dateHour: string;
  user: User;
  animal: Animal;
  service: Service;

}

export type FilterDate = {
  dateHour: string;
}