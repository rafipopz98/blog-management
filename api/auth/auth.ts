import api, { ResponseData } from "@/helpers/axiosHelper";
import { API } from "@/helpers/constants/apiConstants";
import { DEFAULT_TOKEN, USER_DATA } from "@/helpers/constants/projectConstants";
import { storeLocal } from "@/helpers/projectHelpers";
import type { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

type ResetPasswordType = { password: string; id: string };
export type RegisterFormDataType = {
  username: string;
  email: string;
  password: string;
};
export type LoginFormDataType = { email: string; password: string };

type AuthPayload = {
  token: string;
  role: string;
};

const dispatchUserChange = () => {
  window.dispatchEvent(new CustomEvent("userChanged"));
};

const loginStore = (response: AxiosResponse<ResponseData<AuthPayload>>) => {
  const responseData: any = response?.data?.data ?? {};
  storeLocal(responseData.token, DEFAULT_TOKEN);
  storeLocal(responseData, USER_DATA);
  dispatchUserChange();
};

const register = async (data: LoginFormDataType): Promise<ResponseData> => {
  const response = await api.post<ResponseData>(API.REGISTER, data);
  loginStore(response);
  return response.data;
};

const login = async (data: LoginFormDataType): Promise<ResponseData> => {
  const response = await api.post<ResponseData>(API.LOGIN, data);
  loginStore(response);
  return response.data;
};

const resetPassword = async (
  data: ResetPasswordType
): Promise<ResponseData> => {
  const response = await api.post<ResponseData>(API.RESET_PASSWORD, data);
  loginStore(response);
  return response.data;
};

//useQuery
export const auth = {
  useUserLogin: () =>
    useMutation<ResponseData, ResponseData, LoginFormDataType>({
      mutationFn: login,
    }),
  useUserRegister: () =>
    useMutation<ResponseData, ResponseData, RegisterFormDataType>({
      mutationFn: register,
    }),
  useResetPassword: () =>
    useMutation<ResponseData, ResponseData, ResetPasswordType>({
      mutationFn: resetPassword,
    }),
};
