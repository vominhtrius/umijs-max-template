import { defineConfig } from '@umijs/max';

export default defineConfig({
  deadCode: {},
  antd: {
    theme: {
      token: {
        colorPrimary: '#00B96B',
        borderRadius: 6,
      },
    },
  },
  styles: [
    `body {
    width: 100%;
    height: 100%;
    margin: 0px;
  }`,
  ],
  access: {},
  model: {},
  initialState: {},
  request: {},
  locale: {
    default: 'vi-VN',
    baseSeparator: '-',
    antd: true,
  },
  layout: {
    title: '@umijs/max',
    locale: true,
  },
  routes: [
    {
      path: '/login',
      layout: false,
      name: 'login',
      component: './login',
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'yarn',
});
