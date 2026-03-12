import OrdersComponent from '@/components/pages/OrdersComponent.vue'
import SignInComponent from '@/components/pages/SignInComponent.vue'
import NewOrderComponent from '@/components/pages/NewOrderComponent.vue';
import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router'
import NewCarrierComponent from '@/components/pages/NewCarrierComponent.vue';
import CarriersComponent from '@/components/pages/CarriersComponent.vue';
import ClientsPage from '@/components/pages/ClientsPage.vue';
import NewClientPage from '@/components/pages/NewClientPage.vue';
import WelcomePage from '@/components/pages/WelcomePage.vue';
import InvoicesPage from '@/components/pages/InvoicesPage.vue';
import SettingPage from '@/components/pages/SettingPage.vue';

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
    },
    {
      path: '/newOrder/:state?',
      name: 'NewOrder',
      component: NewOrderComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newCarrier/:state?',
      name: 'NewCarrier',
      component: NewCarrierComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/carriers',
      name: 'Carriers',
      component: CarriersComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/clients',
      name: 'Clients',
      component: ClientsPage,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/newClient/:state?',
      name: 'NewClient',
      component: NewClientPage,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/welcomePage',
      name: 'WelcomePage',
      component: WelcomePage,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/invoices',
      name: 'InvoicesPage',
      component: InvoicesPage,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingPage,
      meta:{
        requiresAuth: true
      }
    },
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
