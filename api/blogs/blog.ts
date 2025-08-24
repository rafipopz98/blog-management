import api, { ResponseData } from "@/helpers/axiosHelper";
import { API } from "@/helpers/constants/apiConstants";
import { useMutation, useQuery } from "@tanstack/react-query";

export type BlogFormDataType = {
  title: string;
  desc: string;
  category: string;
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
};
