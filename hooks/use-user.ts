"use client";
import { getUserData } from "@/helpers/projectHelpers";
import { useEffect, useState } from "react";

export type UserType = {
  role: "admin" | "user";
  username: string;
  email: string;
  id: string;
  img_url?: string;
};

export const useUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = () => {
    try {
      const userData = getUserData() as UserType;
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateUser();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user_data" || e.key === "token") {
        // Replace with your actual localStorage keys
        updateUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event listener for same-tab updates
    const handleUserChange = () => {
      updateUser();
    };

    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  return { user, isLoading, updateUser };
};
