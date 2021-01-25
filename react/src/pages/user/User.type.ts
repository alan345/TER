export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin?: Date;
  role: "ADMIN" | "USER";
}

export const userClass: User = {
  id: "",
  name: "",
  role: "USER",
  email: "",
};
