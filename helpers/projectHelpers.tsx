"use client";
import { toast } from "sonner";
import { DEFAULT_TOKEN, USER_DATA } from "./constants/projectConstants";
import { ROUTE } from "./routes";

export const storeLocal = (data: any = "", tokenName = DEFAULT_TOKEN) => {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  window.localStorage.setItem(tokenName, data);
};
export const getLocal = (tokenName = DEFAULT_TOKEN) => {
  const localData =
    typeof window != "undefined" ? window.localStorage.getItem(tokenName) : "";
  let res;
  try {
    res = JSON.parse(localData as string);
  } catch (err) {
    res = localData;
  }
  return res;
};
export const getUserData = (userData = USER_DATA) => {
  const localData =
    typeof window != "undefined" ? window.localStorage.getItem(userData) : "";
  let res: any = {};
  console.log("localData", localData);
  try {
    res = JSON.parse(localData as string);
  } catch (err) {
    res = localData;
  }
  return res ?? {};
};

export const successToast = ({
  title = "Success",
  msg,
}: {
  title?: string;
  msg?: string;
}) => {
  toast.success(title, {
    description: msg,
  });
};

export const errorToast = ({
  title,
  msg,
}: {
  title?: string;
  msg?: string;
}) => {
  toast.error(title, {
    description: msg,
  });
};

export const removeLocal = (tokenName = DEFAULT_TOKEN) => {
  window.localStorage.removeItem(tokenName);
};

export const logout = () => {
  const user = getUserData();
  removeLocal(USER_DATA);
  removeLocal(DEFAULT_TOKEN);

  if (user?.role === "admin") {
    window.location.href = ROUTE.HOME;
    return;
  }
  window.location.href = "/";
};
