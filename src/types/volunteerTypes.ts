import { MultiValue } from "react-select";
import { Event } from "./eventTypes";

type SelectBoxType = {
  label: string;
  value: string;
};

export type Volunteer = {
  _id?: any;
  name: string;
  contact: number | string;
  availability: string;
  skills: string[];
  roles: string[];
  interests: string[];
  events?: Event[] | string[];
  actions?: React.ReactNode;
};
