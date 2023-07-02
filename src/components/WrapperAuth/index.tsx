import { PropsWithChildren } from 'react';

import { stringify } from 'querystring';
import { Navigate } from 'umi';
import { useModel } from '@umijs/max';

const WrapperAuth: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const { loading, initialState } = useModel('@@initialState');
  if (loading && initialState?.isLoggedIn) {
  }

  if (!initialState?.isLoggedIn && window.location.pathname !== '/login') {
    const queryString = stringify({
      redirect: window.location.href,
    });
    return <Navigate to={`/login?${queryString}`} />;
  }

  return <>{children}</>;
};

export default WrapperAuth;
