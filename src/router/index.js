import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Bug from '@/components/Bug';
import Mail from '@/components/Mail';
import Change from '@/components/Change'
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/bug',
      name: 'bug',
      component: Bug,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/change-log',
      name: 'change',
      component: Change,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mail',
      name: 'mail',
      component: Mail,
      meta: {
        requiresAuth: true
      }
    },
  ],
});


router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});


export default router;