import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-sugar.css'


import VueRouter from 'vue-router'
import VueToast from 'vue-toast-notification'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueToast)
Vue.use(Vuelidate)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')