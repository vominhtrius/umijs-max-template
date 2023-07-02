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
  initialState: {
    loading: '@/loading.tsx',
  },
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
      name: 'home',
      path: '/home',
      component: './Home',
    },
    {
      name: 'access',
      path: '/access',
      component: './Access',
    },
    {
      name: 'table',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'yarn',
});
