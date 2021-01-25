export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin?: Date;
}

export const userClass: User = {
  id: "",
  name: "",
  email: "",
};
