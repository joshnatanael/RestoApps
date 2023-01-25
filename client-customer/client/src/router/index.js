import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(), //import.meta.env.BASE_URL
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: ()=> import ('../views/Home.vue')
    },
    {
      path: '/food/:id',
      name: 'Food',
      component: ()=> import ('../views/Food.vue')
    },
    {
      path: '/favourites',
      name: 'Favourites',
      component: ()=> import ('../views/Favourite.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.access_token;
  if (to.name === 'Favourites' && !isAuthenticated) next({ name: 'Login' })
  if ((to.name === 'Register' || to.name === 'Login') && isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
