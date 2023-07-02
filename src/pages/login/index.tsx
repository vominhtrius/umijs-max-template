import { App } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel, useNavigate } from '@umijs/max';

import { login, setAuthToken } from '@/services/auth';
import { LoginBody } from '@/services/auth/auth';
import { ExLoginForm } from './components/ExLoginForm/ExLoginForm';
import { getPageQuery } from '@/utils';

export default () => {
  const intl = useIntl();
  const { refresh } = useModel('@@initialState');
  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleLogin = async (values: LoginBody) => {
    try {
      const response = await login(values);
      setAuthToken(response.token);
      await refresh();
      message.success('Đăng nhập thành công!');
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params as { redirect: string };

      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substring(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substring(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }

      navigate(redirect || '/', { replace: true });
      return true;
    } catch (err) {
      console.log('login error: ', err);
      return false;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',
        background: '#f0f2f5',
        backgroundImage:
          "url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 110px',
        backgroundSize: '100%',
      }}
    >
      <ExLoginForm<LoginBody>
        logo="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        title={'Payment Management System'}
        subTitle={'v1.0.0'}
        onFinish={handleLogin}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={intl.formatMessage({
            id: 'login.username.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="login.username.required" />,
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={intl.formatMessage({
            id: 'login.password.placeholder',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="login.password.required" />,
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          {/* <ProFormCheckbox noStyle name="autoLogin">
            Auto login
          </ProFormCheckbox> */}
        </div>
      </ExLoginForm>
    </div>
  );
};
