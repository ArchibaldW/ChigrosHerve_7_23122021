import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// On importe fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// Importation des icones solides que l'on va utiliser (edit & trashAlt) et ajout à la librairie des icones
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit)
library.add(faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
