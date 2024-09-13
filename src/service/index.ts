import { message as Message } from 'antd';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { EResult } from '@/enum';
interface UsualResult<T = any> {
  status: number;
  message: string;
  data?: T;
}
type Result = UsualResult | ArrayBuffer | Blob;

const service = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    timeout: import.meta.env.VITE_APP_TIMEOUT,
  });

  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = 'Bearer Token';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 响应拦截
  instance.interceptors.response.use(
    (res: AxiosResponse<Result>) => {
      if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        return res.data;
      }
      if (!res.data) throw new Error('返回数据为空');

      const { status, data, message } = res.data as UsualResult;
      // 成功
      if (status === EResult.SUCCESS) {
        return data;
      }
      // 错误
      Message.error(message || '业务请求错误');
    },
    (error: AxiosError<UsualResult>) => {
      const { response, message } = error || {};
      Message.error(response?.data?.message || message);
      return Promise.reject(error);
    },
  );

  // 请求方法
  return <T = any>(config: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      instance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  };
};
export default service();
