export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  image?: string;
  role: "user" | "admin";
}
