import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import { toast } from "sonner";
import { BASE_URL } from "./constants/projectConstants";
import { errorToast, getLocal } from "./projectHelpers";

export type ResponseData<T = any> = {
  data: T | null;
  message?: string | null;
  error?: string | null;
};

export class ApiError extends Error {
  payload: ResponseData;
  status?: number;

  constructor(message: string, payload: ResponseData, status?: number) {
    super(message);
    this.name = "ApiError";
    this.payload = payload;
    this.status = status;
  }
}

function normalizeResponse(raw: any): ResponseData {
  if (typeof raw?.success !== "undefined") {
    return {
      data: raw.data ?? null,
      error: raw.error ?? null,
      message: raw.message ?? null,
    };
  }

  if (raw?.message && raw?.data == null) {
    return {
      data: null,
      error: raw.message,
      message: raw.message,
    };
  }

  return {
    data: raw ?? null,
    error: null,
    message: null,
  };
}

type Api = AxiosInstance & {
  upload: (
    url: string,
    data: any,
    onProgress?: (percentage: number) => void
  ) => Promise<AxiosResponse<ResponseData>>;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
}) as Api;

api.interceptors.request.use(
  (config) => {
    const token = getLocal("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    errorToast({
      title: "Request error",
      msg: error.message || "Unknown error",
    });
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return { ...response, data: normalizeResponse(response.data) };
  },
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const normalized = normalizeResponse(error.response?.data);

    errorToast({
      title: `Failed`.trim(),
      msg: normalized.error || normalized.message || "Something went wrong",
    });

    return Promise.reject(
      new ApiError(
        normalized.error || normalized.message || "Unknown error",
        normalized,
        status
      )
    );
  }
);

api.upload = (url, data, onProgress) => {
  return api.post(url, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        toast.loading(`Uploading... ${percent}%`, {
          id: "upload",
          duration: 1000 * 60 * 20,
        });
        if (percent === 100) toast.dismiss("upload");
        onProgress?.(percent);
      }
    },
  });
};

export default api;
