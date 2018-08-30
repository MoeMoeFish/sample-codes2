import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const SummerNote = () => import('@/components/SummerNote')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/summ',
      name: 'SummerNote',
      component: SummerNote
    }
  ],
  mode: 'history'
})
