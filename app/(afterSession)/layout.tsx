import AuthChecker from "@/components/AuthChecker";
import React from "react";

const AfterSessionLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthChecker>{children}</AuthChecker>;
};

export default AfterSessionLayout;
