import Vue from 'vue'
import VueRouter from 'vue-router'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'
import Profil from '../views/Profil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function(to, from, next){
    const publicPages = ["/connexion", "/inscription"];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && !localStorage.getItem("currentUser")){
      next ('/connexion');
    } else if (!authRequired && localStorage.getItem("currentUser")) {
      next('/profil');
    } else {
      next();
    }
})

export default router