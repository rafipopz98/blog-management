"use client";
import { getLocal, getUserData } from "@/helpers/projectHelpers";
import { useUser } from "@/hooks/use-user";
import React from "react";

const App = () => {
  const user = useUser();
  console.log("user in app page", user);
  return <div>App</div>;
};

export default App;
