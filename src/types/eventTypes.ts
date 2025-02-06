export type Role = {
  _id?: string;
  role: string;
  // volunteersRequired?: string | number;
  volunteersRequired?: any;
};

export type Event = {
  _id?: any;
  name: string;
  date: string;
  location: string;
  description: string;
  roles: Role[];
  volunteersRequired?: any;
  actions?: React.ReactNode;
};
