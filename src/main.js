// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import VeeValidate from 'vee-validate'
import Alert from './components/shared/alert.vue'
import addContribuyenteDialog from './components/empresa/addContribuyentesDialog.vue'
import addVentaDialog from './components/empresa/addNuevaVenta.vue'
import editContribuyenteDialog from './components/empresa/editContribuyente.vue'
import edVentaDialog from './components/empresa/editVenta.vue'
import editVentaFacturaDialog from './components/empresa/editVentaFactura.vue'
import addVentaFacturaDialog from './components/empresa/addNuevaVentaFactura.vue'
import addCompraDialog from './components/empresa/addNuevaCompra.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, { theme: {
  primary: '#3498db',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(VeeValidate)
Vue.component('app-alert', Alert)
Vue.component('addcontribuyenteDialog', addContribuyenteDialog)
Vue.component('editcontribuyenteDialog', editContribuyenteDialog)
Vue.component('addVentaDialog', addVentaDialog)
Vue.component('editVentaDialog', edVentaDialog)
Vue.component('addVentaFacturaDialog', addVentaFacturaDialog)
Vue.component('editVentaFacturaDialog', editVentaFacturaDialog)
Vue.component('addNuevaCompraDialog', addCompraDialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    let token = localStorage.getItem('s3pymses')
    if (token) {
      const userData = JSON.parse(token)
      const userStored = {
        uId: userData.uId,
        userType: userData.userType,
        token: userData.token,
        registered: userData.registered
      }
      this.$store.dispatch('autoSignIn', userStored)
    }
  }
})
