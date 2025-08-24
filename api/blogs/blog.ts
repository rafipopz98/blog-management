import api, { ResponseData } from "@/helpers/axiosHelper";
import { API } from "@/helpers/constants/apiConstants";
import { useMutation, useQuery } from "@tanstack/react-query";

export type BlogFormDataType = {
  title: string;
  desc: string;
  category: string;
};
export type UpdateUsernameType = {
  username: string;
};

export type ResetPasswordType = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateBlogType = {
  id: string;
  title?: string;
  desc?: string;
  category?: string;
};

const createBlog = async (data: BlogFormDataType): Promise<ResponseData> => {
  const response = await api.post<ResponseData>(API.CREATE_BLOG, data);
  return response.data;
};

const getFeatured = async (): Promise<ResponseData> => {
  const response = await api.get<ResponseData>(API.FEATURED_BLOGS);
  return response.data;
};

const getAllBlogs = async (params: any): Promise<ResponseData> => {
  const response = await api.get<ResponseData>(API.GET_ALL_BLOGS, { params });
  return response.data;
};

const getSingleBlog = async (id: any): Promise<ResponseData> => {
  const response = await api.get<ResponseData>(`${API.GET_SINGLE_BLOG}/${id}`);
  return response.data;
};

const getProfile = async (): Promise<ResponseData> => {
  const response = await api.get<ResponseData>(API.GET_USER_PROFILE);
  return response.data;
};

const getUserBlogs = async (): Promise<ResponseData> => {
  const response = await api.get<ResponseData>(API.GET_USER_BLOGS);
  return response.data;
};

const updateUserName = async (
  data: UpdateUsernameType
): Promise<ResponseData> => {
  const response = await api.post<ResponseData>(API.UPDATE_USERNAME, data);
  return response.data;
};

const resetPassword = async (
  data: ResetPasswordType
): Promise<ResponseData> => {
  const response = await api.post<ResponseData>(API.RESET_PASSWORD, data);
  return response.data;
};

const toggleFeatured = async (id: string): Promise<ResponseData> => {
  const response = await api.patch<ResponseData>(API.TOGGLE_FEATURED, { id });
  return response.data;
};

const DeleteBlog = async (id: string): Promise<ResponseData> => {
  const response = await api.delete<ResponseData>(`${API.DELETE_BLOG}/${id}`);
  return response.data;
};

const updateBlog = async (data: UpdateBlogType): Promise<ResponseData> => {
  const response = await api.patch<ResponseData>(API.UPDATE_BLOG, data);
  return response.data;
};

export const blog = {
  getAllBlogs,
  useCreateBlog: () =>
    useMutation<ResponseData, ResponseData, BlogFormDataType>({
      mutationFn: createBlog,
    }),

  useGetFeaturedBlogs: () =>
    useQuery<ResponseData, Error>({
      queryKey: ["featured-blogs"],
      queryFn: getFeatured,
    }),

  useGetAllBlogs: (params: any) =>
    useQuery<ResponseData, Error>({
      queryKey: ["all-blogs", params],
      queryFn: () => getAllBlogs(params),
    }),

  useGetSingleBlog: (id: string) =>
    useQuery<ResponseData, Error>({
      queryKey: ["all-blogs", id],
      queryFn: () => getSingleBlog(id),
    }),

  useGetUserProfile: () =>
    useQuery<ResponseData, Error>({
      queryKey: ["user-profile"],
      queryFn: getProfile,
    }),

  useGetUserBlogs: () =>
    useQuery<ResponseData, Error>({
      queryKey: ["user-blogs"],
      queryFn: getUserBlogs,
    }),

  useUpdateUserName: () =>
    useMutation<ResponseData, ResponseData, UpdateUsernameType>({
      mutationFn: updateUserName,
    }),

  useResetPassword: () =>
    useMutation<ResponseData, ResponseData, ResetPasswordType>({
      mutationFn: resetPassword,
    }),

  useToggleFeatured: (id: string) =>
    useMutation<ResponseData, ResponseData, string>({
      mutationFn: () => toggleFeatured(id),
    }),

  useDeleteBlog: (id: string) =>
    useMutation<ResponseData, ResponseData, string>({
      mutationFn: () => DeleteBlog(id),
    }),

  useUpdateBlog: (data: UpdateBlogType) =>
    useMutation<ResponseData, ResponseData, UpdateBlogType>({
      mutationFn: () => updateBlog(data),
    }),
};
