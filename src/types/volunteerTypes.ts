export type Volunteer = {
  _id: String;
  name: String;
  contact: Number;
  availability: String;
  skills: String[];
  roles: String[];
  interests: String[];
  actions?: React.ReactNode;
};
