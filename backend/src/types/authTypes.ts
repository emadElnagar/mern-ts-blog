import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    image?: string;
  };
}
