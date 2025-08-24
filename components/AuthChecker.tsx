"use client";

import { useEffect } from "react";
import { errorToast } from "@/helpers/projectHelpers";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !user.id)) {
      errorToast({
        title: "Unauthorized",
        msg: "You are not logged in",
      });
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user || !user.id) {
    return null;
  }

  return <>{children}</>;
};

export default AuthChecker;
