import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Updpwd from '../pages/Updpwd.vue'
import NewPage from '../pages/NewPage.vue'
import UserInfo from '../pages/UserInfo.vue'
import Exhibition1 from '../pages/event1.vue'
import Exhibition2 from '../pages/event3.vue'
import Exhibition3 from '../pages/event2.vue'
import Exhibition4 from '../pages/event4.vue'

import UpdInfo from '../pages/UpdInfo.vue'
import PhotoShowDetail from "../components/PhotoShowDetail.vue";
import ServicePage from "../components/ServicePage.vue";
import MyConcern from "../components/MyConcern.vue";
import ServiceRegister from "../components/ServiceRegister.vue";
import PersonalInfo from "../components/PersonalInfo.vue";
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Register',
      component: Register
    },
    {
      path: '/Updpwd',
      component: Updpwd
    },
    {
      path: '/NewPage',
      component: NewPage,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/UserInfo',
      component: UserInfo,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/UpdInfo',
      component: UpdInfo,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/my-concern',
      component: MyConcern,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/service/register',
      component: ServiceRegister,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/Exhibition1',
      component: Exhibition1,
    },
    {
      path: '/Exhibition2',
      component: Exhibition2,
    },
    {
      path: '/Exhibition3',
      component: Exhibition3,
    },
    {
      path: '/Exhibition4',
      component: Exhibition4,
    },
    {
      path: '/PhotoShowDetail',
      component: PhotoShowDetail,
    },
    {
      path: '/ServicePage',
      component: ServicePage,
    },
    {
      path: '/personal-info/:email',
      component: PersonalInfo,
      meta: {
        needLogin: true
      }
    }
  ]
})
