import { message } from 'antd';
import { parse } from 'querystring';
import {
  AxiosRequestConfig,
  RequestConfig,
  RunTimeLayoutConfig,
  history,
} from 'umi';

import RightContent from './components/ProLayout/RightContent';
import { LOGIN_URI } from './constants';
import { getAuthToken, removeAuthToken } from './services/auth';
import { UserDetail, UserInfo, getCurrentUserDetail } from './services/users';

export type InitStateProps = {
  user?: UserInfo;
  fetchCurrentUserDetail: () => Promise<UserDetail | undefined>;
};

export async function getInitialState(): Promise<InitStateProps> {
  const fetchCurrentUserDetail = async () => {
    try {
      return await getCurrentUserDetail({ skipErrorHandler: true });
    } catch (error) {
      console.log('fetch current user failed', error);
      removeAuthToken();
      history.push(LOGIN_URI);
    }
  };

  const userDetail = await fetchCurrentUserDetail();

  if (userDetail && history.location.pathname === LOGIN_URI) {
    const query = parse(history.location.search);
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }

  return {
    user: userDetail?.user,
    fetchCurrentUserDetail,
  };
}

export const layout: RunTimeLayoutConfig = (initData) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    rightContentRender: (headerProps, dom, opts) => <RightContent {...opts} />,
    // childrenRender: (children) => {
    //   return <CubeProvider cubejsApi={cubejsApi}>{children}</CubeProvider>;
    // },
    navTheme: 'light',
    loading: initData.loading,
    layout: 'mix',
    menu: {
      locale: true,
    },
    logout: () => {
      removeAuthToken();
      message.success('Đăng xuất thành công!');
      history.push(LOGIN_URI);
    },
  };
};

export const request: RequestConfig = {
  // baseURL: 'http://localhost:9060',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorConfig: {
    errorHandler: (error: any, opts) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'BizError') {
      } else if (error.response) {
        if (error.response?.data?.message) {
          message.error(error.response?.data?.message);
        } else {
          message.error(`Response status:${error.response.status}`);
        }
      } else if (error.request) {
        console.log('None response', error);
        message.error('None response! Please retry.');
      } else {
        console.log('None response', error);
        message.error('Request error, please retry.');
      }
    },
  },
  requestInterceptors: [
    (config: AxiosRequestConfig) => {
      if (config.headers) {
        const authToken = getAuthToken();
        if (authToken) {
          config.headers['Authorization'] = `Bearer ${authToken}`;
        }
      }
      return config;
    },
  ],
};
