import HomeLayout from '@/layouts/HomeLayout';
import HowItWorks from '@/layouts/HowItWorks';
import AboutUs from '@/layouts/AboutUs';

import app from './app';
const webRoutes = [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/how-it-works',
    name: 'HowItWorks',
    component: HowItWorks,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs,
    meta: {
      requiresAuth: false
    }
  }
];
const configRoutes = routes => {
  return routes.concat(webRoutes);
};
export { app, configRoutes };
