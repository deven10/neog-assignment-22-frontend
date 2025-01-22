export type Role = {
  role: string;
  volunteersRequired: string | number;
};

export type Event = {
  _id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  roles: Role[];
  volunteersRequired: number;
  actions?: React.ReactNode;
};
