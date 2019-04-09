import Vue from 'vue';
import Router from 'vue-router';

import TfcDetails from './views/Details.vue';
import TfcEdit from './views/Edit.vue';
import TfcHome from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'The Final Countdown',
      component: TfcHome,
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/details/:id',
      name: 'Countdown details',
      component: TfcDetails,
    },
    {
      path: '/new',
      name: 'New countdown',
      component: TfcEdit,
    },
    {
      path: '/edit/:id',
      name: 'Edit countdown',
      component: TfcEdit,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
