"use client";
import { getUserData } from "@/helpers/projectHelpers";

export type UserType = {
  role: "admin" | "user";
  username: string;
  email: string;
  id: string;
  img_url?: string;
};
export const useUser = () => {
  return getUserData() as UserType;
};
