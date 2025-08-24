"use client";

import { useEffect } from "react";
import { errorToast } from "@/helpers/projectHelpers";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.id) {
      errorToast({
        title: "Unauthorized",
        msg: "You are not logged in",
      });
      router.push("/");
    }
  }, [user, router]);

  if (!user || !user.id) {
    return null;
  }

  return <>{children}</>;
};

export default AuthChecker;
