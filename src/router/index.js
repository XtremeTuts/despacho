import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/login.vue'
import homeEmpresa from '@/components/empresa/home.vue'
import Contribuyentes from '@/components/empresa/contribuyentes.vue'
import libroVentas from '@/components/empresa/libroVentas.vue'
import libroVentasFac from '@/components/empresa/libro_ventas_factura.vue'
import libroCompras from '@/components/empresa/libro_compras.vue'
import signUp from '@/components/user/signup.vue'
import Guard from './guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/signup',
      name: 'SignUp',
      component: signUp,
      beforeEnter: Guard
    },
    {
      path: '/empresa/home',
      name: 'homeEmpresa',
      component: homeEmpresa,
      beforeEnter: Guard
    },
    {
      path: '/empresa/contribuyentes',
      name: 'Controbuyentes',
      component: Contribuyentes,
      beforeEnter: Guard
    },
    {
      path: '/empresa/ventas',
      name: 'LibroVentas',
      component: libroVentas,
      beforeEnter: Guard
    },
    {
      path: '/empresa/ventasFactura',
      name: 'libroVentasFac',
      component: libroVentasFac,
      beforeEnter: Guard
    },
    {
      path: '/empresa/libro_compras',
      name: 'libroCompras',
      component: libroCompras,
      beforeEnter: Guard
    }
  ],
  mode: 'history'
})
