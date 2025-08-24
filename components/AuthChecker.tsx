"use client";

import { errorToast } from "@/helpers/projectHelpers";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const navigate = useRouter();
  if (!user) {
    errorToast({
      title: "Unauthorized",
      msg: "You are not logged in",
    });
    navigate.push("/");
  }

  return <div>{children}</div>;
};

export default AuthChecker;
