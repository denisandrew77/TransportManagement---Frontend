import OrdersComponent from '@/components/pages/OrdersComponent.vue'
import SignInComponent from '@/components/pages/SignInComponent.vue'
import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignInComponent,
      meta:{
        requiresAuth: false
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: OrdersComponent,
      meta: {
        requiresAuth: true
      }
    }
    ],
});

router.beforeEach((to,from,next)=>{
  const user = useUserStore();
  if(to.meta.requiresAuth===true && user.loggedIn===false){
    next({name: "SignIn"});
  }
  else{
    next();
  }
})

export default router
